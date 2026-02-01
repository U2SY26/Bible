import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/constants/app_colors.dart';
import '../../data/models/artwork.dart';

class ArtworkFullscreenViewer extends StatefulWidget {
  final Artwork artwork;
  final String lang;

  const ArtworkFullscreenViewer({
    super.key,
    required this.artwork,
    required this.lang,
  });

  static Future<void> show(BuildContext context, Artwork artwork, String lang) {
    return Navigator.of(context).push(
      PageRouteBuilder(
        opaque: false,
        barrierColor: Colors.black87,
        pageBuilder: (context, animation, secondaryAnimation) {
          return ArtworkFullscreenViewer(artwork: artwork, lang: lang);
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
  }

  @override
  State<ArtworkFullscreenViewer> createState() => _ArtworkFullscreenViewerState();
}

class _ArtworkFullscreenViewerState extends State<ArtworkFullscreenViewer> {
  bool _showInfo = false;
  final TransformationController _transformationController = TransformationController();

  @override
  void initState() {
    super.initState();
    // Enable immersive mode
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  }

  @override
  void dispose() {
    _transformationController.dispose();
    // Restore system UI
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    super.dispose();
  }

  void _toggleInfo() {
    setState(() {
      _showInfo = !_showInfo;
    });
  }

  void _resetZoom() {
    _transformationController.value = Matrix4.identity();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: GestureDetector(
        onTap: _toggleInfo,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Zoomable image
            InteractiveViewer(
              transformationController: _transformationController,
              minScale: 0.5,
              maxScale: 4.0,
              child: Center(
                child: Hero(
                  tag: 'artwork_${widget.artwork.url}',
                  child: Image.network(
                    widget.artwork.url,
                    fit: BoxFit.contain,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        color: AppColors.surface,
                        child: const Center(
                          child: Icon(
                            Icons.image_not_supported,
                            color: AppColors.textMuted,
                            size: 64,
                          ),
                        ),
                      );
                    },
                    loadingBuilder: (context, child, loadingProgress) {
                      if (loadingProgress == null) return child;
                      return Center(
                        child: CircularProgressIndicator(
                          value: loadingProgress.expectedTotalBytes != null
                              ? loadingProgress.cumulativeBytesLoaded /
                                  loadingProgress.expectedTotalBytes!
                              : null,
                          color: AppColors.primary,
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),

            // Close button
            Positioned(
              top: MediaQuery.of(context).padding.top + 16,
              right: 16,
              child: _buildIconButton(
                icon: Icons.close,
                onPressed: () => Navigator.of(context).pop(),
                tooltip: widget.lang == 'ko' ? '닫기' : 'Close',
              ),
            ),

            // Reset zoom button
            Positioned(
              top: MediaQuery.of(context).padding.top + 16,
              right: 64,
              child: _buildIconButton(
                icon: Icons.fit_screen,
                onPressed: _resetZoom,
                tooltip: widget.lang == 'ko' ? '원래 크기' : 'Reset zoom',
              ),
            ),

            // Info card
            AnimatedPositioned(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
              left: 16,
              right: 16,
              bottom: _showInfo ? 16 + MediaQuery.of(context).padding.bottom : -200,
              child: _buildInfoCard(),
            ),

            // Hint text
            if (!_showInfo)
              Positioned(
                left: 0,
                right: 0,
                bottom: 16 + MediaQuery.of(context).padding.bottom,
                child: Center(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.black45,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      widget.lang == 'ko' ? '탭하여 정보 보기' : 'Tap to see info',
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildIconButton({
    required IconData icon,
    required VoidCallback onPressed,
    required String tooltip,
  }) {
    return Material(
      color: Colors.black45,
      borderRadius: BorderRadius.circular(24),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(24),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Icon(
            icon,
            color: Colors.white,
            size: 24,
          ),
        ),
      ),
    );
  }

  Widget _buildInfoCard() {
    final artwork = widget.artwork;
    final lang = widget.lang;
    final displayTitle = artwork.getTitle(lang);
    final displayArtist = artwork.getArtist(lang);

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface.withValues(alpha: 0.95),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.3),
            blurRadius: 20,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Title
          Text(
            displayTitle,
            style: const TextStyle(
              color: AppColors.textPrimary,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),

          // Artist and year
          if (displayArtist.isNotEmpty && displayArtist != 'Unknown') ...[
            Row(
              children: [
                const Icon(Icons.brush, size: 16, color: AppColors.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    displayArtist,
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 14,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
          ],

          if (artwork.year.isNotEmpty) ...[
            Row(
              children: [
                const Icon(Icons.calendar_today, size: 16, color: AppColors.accent),
                const SizedBox(width: 8),
                Text(
                  artwork.year,
                  style: const TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
          ],

          // Source
          if (artwork.source.isNotEmpty) ...[
            const SizedBox(height: 8),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.source, size: 16, color: AppColors.textMuted),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    artwork.source,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 12,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ],

          // License
          if (artwork.license.isNotEmpty) ...[
            const SizedBox(height: 4),
            Row(
              children: [
                const Icon(Icons.copyright, size: 14, color: AppColors.textMuted),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    artwork.license,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 11,
                    ),
                  ),
                ),
              ],
            ),
          ],

          const SizedBox(height: 12),

          // Zoom hint
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.surfaceLight,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.pinch, size: 16, color: AppColors.primary),
                const SizedBox(width: 8),
                Text(
                  lang == 'ko' ? '핀치로 확대/축소' : 'Pinch to zoom',
                  style: const TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:video_player/video_player.dart';
import '../../../core/constants/app_colors.dart';
import '../home/home_screen.dart';
import '../onboarding/onboarding_screen.dart';

class IntroVideoScreen extends StatefulWidget {
  final bool showOnboardingAfter;

  const IntroVideoScreen({
    super.key,
    this.showOnboardingAfter = true,
  });

  @override
  State<IntroVideoScreen> createState() => _IntroVideoScreenState();
}

class _IntroVideoScreenState extends State<IntroVideoScreen> {
  late VideoPlayerController _controller;
  bool _isInitialized = false;
  bool _hasError = false;

  @override
  void initState() {
    super.initState();
    // Hide system UI for immersive experience
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    _initializeVideo();
  }

  Future<void> _initializeVideo() async {
    try {
      _controller = VideoPlayerController.asset('assets/video/intro.mp4');
      await _controller.initialize();

      if (mounted) {
        setState(() {
          _isInitialized = true;
        });

        // Auto-play the video
        _controller.play();

        // Listen for video end
        _controller.addListener(_onVideoProgress);
      }
    } catch (e) {
      debugPrint('Error initializing video: $e');
      if (mounted) {
        setState(() {
          _hasError = true;
        });
        // Skip to next screen on error
        _navigateToNextScreen();
      }
    }
  }

  void _onVideoProgress() {
    if (_controller.value.position >= _controller.value.duration &&
        _controller.value.duration > Duration.zero) {
      _navigateToNextScreen();
    }
  }

  Future<void> _navigateToNextScreen() async {
    // Mark intro video as watched
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('intro_video_watched', true);

    // Restore system UI
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);

    if (!mounted) return;

    // Navigate to next screen
    Navigator.of(context).pushReplacement(
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return widget.showOnboardingAfter
              ? const OnboardingScreen()
              : const HomeScreen();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
        transitionDuration: const Duration(milliseconds: 500),
      ),
    );
  }

  @override
  void dispose() {
    _controller.removeListener(_onVideoProgress);
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_hasError) {
      return const Scaffold(
        backgroundColor: AppColors.background,
        body: Center(
          child: CircularProgressIndicator(color: AppColors.primary),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      body: GestureDetector(
        onTap: _navigateToNextScreen,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Video player
            if (_isInitialized)
              Center(
                child: AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  child: VideoPlayer(_controller),
                ),
              )
            else
              const Center(
                child: CircularProgressIndicator(color: AppColors.primary),
              ),

            // Skip button
            Positioned(
              top: MediaQuery.of(context).padding.top + 16,
              right: 16,
              child: TextButton(
                onPressed: _navigateToNextScreen,
                style: TextButton.styleFrom(
                  backgroundColor: Colors.black45,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: const Text(
                  'Skip',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 14,
                  ),
                ),
              ),
            ),

            // Progress indicator
            if (_isInitialized)
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: VideoProgressIndicator(
                  _controller,
                  allowScrubbing: false,
                  colors: const VideoProgressColors(
                    playedColor: AppColors.primary,
                    backgroundColor: Colors.white24,
                    bufferedColor: Colors.white38,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

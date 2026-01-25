import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/constants/app_colors.dart';
import '../home/home_screen.dart';

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardingPage> _pages = [
    OnboardingPage(
      icon: Icons.hub,
      title: '성경 인물 그래프',
      titleEn: 'Bible Character Graph',
      description: '600명 이상의 성경 인물들과\n350개 이상의 관계를 그래프로 탐험하세요',
      descriptionEn: 'Explore 600+ Bible characters\nand 350+ relationships',
      color: AppColors.primary,
    ),
    OnboardingPage(
      icon: Icons.touch_app,
      title: '터치로 탐색',
      titleEn: 'Touch to Explore',
      description: '노드를 탭하면 인물 정보를 볼 수 있고\n드래그하여 그래프를 이동할 수 있어요',
      descriptionEn: 'Tap nodes for info\nDrag to move the graph',
      color: AppColors.accent,
      gestureHint: GestureHint.tap,
    ),
    OnboardingPage(
      icon: Icons.pinch,
      title: '핀치 줌',
      titleEn: 'Pinch to Zoom',
      description: '두 손가락으로 확대/축소하여\n원하는 영역을 자세히 볼 수 있어요',
      descriptionEn: 'Use two fingers to zoom\nin and out',
      color: AppColors.newTestament,
      gestureHint: GestureHint.pinch,
    ),
    OnboardingPage(
      icon: Icons.timeline,
      title: '타임라인 & 성경',
      titleEn: 'Timeline & Bible',
      description: '시대별 사건 타임라인과\n성경 66권 전문을 읽을 수 있어요',
      descriptionEn: 'View timeline by era\nand read full 66 books',
      color: AppColors.oldTestament,
    ),
    OnboardingPage(
      icon: Icons.language,
      title: '한국어 / English',
      titleEn: 'Korean / English',
      description: '설정에서 언어를 변경할 수 있어요\n이제 시작해볼까요?',
      descriptionEn: 'Change language in settings\nReady to start?',
      color: AppColors.bothTestaments,
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _completeOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('onboarding_completed', true);

    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const HomeScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // Skip button
            Align(
              alignment: Alignment.topRight,
              child: TextButton(
                onPressed: _completeOnboarding,
                child: Text(
                  _currentPage == _pages.length - 1 ? '' : 'Skip',
                  style: const TextStyle(color: AppColors.textMuted),
                ),
              ),
            ),
            // Page content
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() => _currentPage = index);
                },
                itemCount: _pages.length,
                itemBuilder: (context, index) {
                  return _buildPage(_pages[index]);
                },
              ),
            ),
            // Page indicators
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                _pages.length,
                (index) => AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: _currentPage == index ? 24 : 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: _currentPage == index
                        ? _pages[index].color
                        : AppColors.surfaceLight,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 32),
            // Next/Start button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (_currentPage == _pages.length - 1) {
                      _completeOnboarding();
                    } else {
                      _pageController.nextPage(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                      );
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _pages[_currentPage].color,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Text(
                    _currentPage == _pages.length - 1 ? '시작하기' : '다음',
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildPage(OnboardingPage page) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Icon with glow effect
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: page.color.withValues(alpha: 0.2),
              boxShadow: [
                BoxShadow(
                  color: page.color.withValues(alpha: 0.3),
                  blurRadius: 30,
                  spreadRadius: 10,
                ),
              ],
            ),
            child: Icon(
              page.icon,
              size: 60,
              color: page.color,
            ),
          ),
          const SizedBox(height: 48),
          // Title
          Text(
            page.title,
            style: const TextStyle(
              color: AppColors.textPrimary,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            page.titleEn,
            style: TextStyle(
              color: page.color,
              fontSize: 16,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          // Description
          Text(
            page.description,
            style: const TextStyle(
              color: AppColors.textSecondary,
              fontSize: 16,
              height: 1.5,
            ),
            textAlign: TextAlign.center,
          ),
          // Gesture hint animation
          if (page.gestureHint != null) ...[
            const SizedBox(height: 32),
            _buildGestureHint(page.gestureHint!),
          ],
        ],
      ),
    );
  }

  Widget _buildGestureHint(GestureHint hint) {
    switch (hint) {
      case GestureHint.tap:
        return const _TapGestureAnimation();
      case GestureHint.pinch:
        return const _PinchGestureAnimation();
    }
  }
}

enum GestureHint { tap, pinch }

class OnboardingPage {
  final IconData icon;
  final String title;
  final String titleEn;
  final String description;
  final String descriptionEn;
  final Color color;
  final GestureHint? gestureHint;

  OnboardingPage({
    required this.icon,
    required this.title,
    required this.titleEn,
    required this.description,
    required this.descriptionEn,
    required this.color,
    this.gestureHint,
  });
}

class _TapGestureAnimation extends StatefulWidget {
  const _TapGestureAnimation();

  @override
  State<_TapGestureAnimation> createState() => _TapGestureAnimationState();
}

class _TapGestureAnimationState extends State<_TapGestureAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat();

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.2).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _opacityAnimation = Tween<double>(begin: 1.0, end: 0.3).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 60,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Stack(
            alignment: Alignment.center,
            children: [
              // Ripple effect
              Transform.scale(
                scale: _scaleAnimation.value,
                child: Opacity(
                  opacity: _opacityAnimation.value,
                  child: Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: AppColors.accent,
                        width: 2,
                      ),
                    ),
                  ),
                ),
              ),
              // Finger icon
              const Icon(
                Icons.touch_app,
                color: AppColors.accent,
                size: 32,
              ),
            ],
          );
        },
      ),
    );
  }
}

class _PinchGestureAnimation extends StatefulWidget {
  const _PinchGestureAnimation();

  @override
  State<_PinchGestureAnimation> createState() => _PinchGestureAnimationState();
}

class _PinchGestureAnimationState extends State<_PinchGestureAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _spreadAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    )..repeat(reverse: true);

    _spreadAnimation = Tween<double>(begin: 20, end: 50).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 60,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Transform.translate(
                offset: Offset(-_spreadAnimation.value, 0),
                child: const Icon(
                  Icons.circle,
                  color: AppColors.newTestament,
                  size: 24,
                ),
              ),
              Transform.translate(
                offset: Offset(_spreadAnimation.value, 0),
                child: const Icon(
                  Icons.circle,
                  color: AppColors.newTestament,
                  size: 24,
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

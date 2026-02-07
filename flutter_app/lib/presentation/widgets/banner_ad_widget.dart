import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import '../../services/ad_service.dart';

class BannerAdWidget extends StatefulWidget {
  const BannerAdWidget({super.key});

  @override
  State<BannerAdWidget> createState() => _BannerAdWidgetState();
}

class _BannerAdWidgetState extends State<BannerAdWidget> {
  Ad? _ad;
  bool _isAdLoaded = false;
  int _retryAttempt = 0;
  static const int _maxRetries = 3;

  @override
  void initState() {
    super.initState();
    if (!kIsWeb) {
      Future.delayed(const Duration(milliseconds: 500), () {
        if (mounted) _loadAd();
      });
    }
  }

  void _loadAd() {
    _ad?.dispose();
    _ad = null;

    final adService = AdService();
    if (!adService.canShowAds) {
      debugPrint('BannerAdWidget: canShowAds is false, skipping');
      return;
    }

    if (adService.isAndroid) {
      _loadNativeAd(adService);
    } else {
      _loadBannerAd(adService);
    }
  }

  void _loadNativeAd(AdService adService) {
    debugPrint('BannerAdWidget: Loading NativeAd for Android');
    final nativeAd = adService.createNativeAd(
      onAdLoaded: (ad) {
        debugPrint('BannerAdWidget: NativeAd loaded');
        if (mounted) {
          setState(() {
            _isAdLoaded = true;
          });
        }
      },
      onAdFailedToLoad: (ad, error) {
        debugPrint('BannerAdWidget: NativeAd failed: ${error.message} (attempt $_retryAttempt)');
        ad.dispose();
        if (mounted) {
          setState(() {
            _ad = null;
            _isAdLoaded = false;
          });
          _retryWithBackoff();
        }
      },
    );
    _ad = nativeAd;
    nativeAd.load();
  }

  void _loadBannerAd(AdService adService) {
    debugPrint('BannerAdWidget: Loading BannerAd for iOS');
    final bannerAd = adService.createBannerAd(
      onAdLoaded: (ad) {
        debugPrint('BannerAdWidget: BannerAd loaded');
        if (mounted) {
          setState(() {
            _isAdLoaded = true;
          });
        }
      },
      onAdFailedToLoad: (ad, error) {
        debugPrint('BannerAdWidget: BannerAd failed: ${error.message} (attempt $_retryAttempt)');
        ad.dispose();
        if (mounted) {
          setState(() {
            _ad = null;
            _isAdLoaded = false;
          });
          _retryWithBackoff();
        }
      },
    );
    _ad = bannerAd;
    bannerAd.load();
  }

  void _retryWithBackoff() {
    if (_retryAttempt < _maxRetries) {
      _retryAttempt++;
      Future.delayed(Duration(seconds: _retryAttempt * 2), () {
        if (mounted) _loadAd();
      });
    }
  }

  @override
  void dispose() {
    _ad?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_isAdLoaded || _ad == null) {
      return const SizedBox(height: 50);
    }

    if (_ad is NativeAd) {
      return SizedBox(
        height: 56,
        child: AdWidget(ad: _ad as NativeAd),
      );
    }

    if (_ad is BannerAd) {
      final bannerAd = _ad as BannerAd;
      return SizedBox(
        width: bannerAd.size.width.toDouble(),
        height: bannerAd.size.height.toDouble(),
        child: AdWidget(ad: bannerAd),
      );
    }

    return const SizedBox(height: 50);
  }
}

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
  BannerAd? _bannerAd;
  bool _isAdLoaded = false;
  int _retryAttempt = 0;
  static const int _maxRetries = 3;

  @override
  void initState() {
    super.initState();
    // Skip ads on web
    if (!kIsWeb) {
      // Delay loading slightly to ensure AdMob is initialized
      Future.delayed(const Duration(milliseconds: 500), () {
        if (mounted) _loadAd();
      });
    }
  }

  void _loadAd() {
    _bannerAd?.dispose();
    _bannerAd = AdService().createBannerAd(
      onAdLoaded: (ad) {
        debugPrint('Banner ad loaded successfully');
        if (mounted) {
          setState(() {
            _isAdLoaded = true;
          });
        }
      },
      onAdFailedToLoad: (ad, error) {
        debugPrint('Banner ad failed to load: ${error.message} (attempt $_retryAttempt)');
        ad.dispose();
        if (mounted) {
          setState(() {
            _bannerAd = null;
            _isAdLoaded = false;
          });
          // Retry with exponential backoff
          if (_retryAttempt < _maxRetries) {
            _retryAttempt++;
            Future.delayed(Duration(seconds: _retryAttempt * 2), () {
              if (mounted) _loadAd();
            });
          }
        }
      },
    );

    _bannerAd?.load();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_isAdLoaded || _bannerAd == null) {
      return const SizedBox(height: 50);
    }

    return Container(
      width: _bannerAd!.size.width.toDouble(),
      height: _bannerAd!.size.height.toDouble(),
      alignment: Alignment.center,
      child: AdWidget(ad: _bannerAd!),
    );
  }
}

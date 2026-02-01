import 'package:flutter/foundation.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class AdService {
  static final AdService _instance = AdService._internal();
  factory AdService() => _instance;
  AdService._internal();

  bool _isInitialized = false;
  bool _canShowAds = true; // Default to true, will be updated after consent check

  // Production Ad Unit IDs
  static const String _bannerAdUnitIdAndroid = 'ca-app-pub-3715008468517611/8425278053';
  static const String _bannerAdUnitIdIOS = 'ca-app-pub-3715008468517611/5435001256';

  // Test Ad Unit IDs (for development)
  static const String _testBannerAdUnitIdAndroid = 'ca-app-pub-3940256099942544/6300978111';
  static const String _testBannerAdUnitIdIOS = 'ca-app-pub-3940256099942544/2934735716';

  bool get canShowAds => !kIsWeb && _canShowAds;

  String get bannerAdUnitId {
    if (kDebugMode) {
      return defaultTargetPlatform == TargetPlatform.android
          ? _testBannerAdUnitIdAndroid
          : _testBannerAdUnitIdIOS;
    }
    return defaultTargetPlatform == TargetPlatform.android
        ? _bannerAdUnitIdAndroid
        : _bannerAdUnitIdIOS;
  }

  /// Initialize ads with GDPR consent handling
  Future<void> initialize() async {
    if (_isInitialized) return;

    // Skip initialization on web - google_mobile_ads doesn't support web
    if (kIsWeb) {
      _isInitialized = true;
      return;
    }

    // Request consent information update (GDPR)
    final params = ConsentRequestParameters();

    ConsentInformation.instance.requestConsentInfoUpdate(
      params,
      () async {
        // Consent info updated successfully
        if (await ConsentInformation.instance.isConsentFormAvailable()) {
          await _loadAndShowConsentForm();
        }
        await _initializeMobileAds();
      },
      (FormError error) {
        // Error getting consent info, initialize ads anyway for non-EU users
        debugPrint('Consent info error: ${error.message}');
        _initializeMobileAds();
      },
    );

    _isInitialized = true;
  }

  Future<void> _loadAndShowConsentForm() async {
    ConsentForm.loadConsentForm(
      (ConsentForm consentForm) async {
        final status = await ConsentInformation.instance.getConsentStatus();
        if (status == ConsentStatus.required) {
          consentForm.show((FormError? formError) {
            if (formError != null) {
              debugPrint('Consent form error: ${formError.message}');
            }
            _loadAndShowConsentForm(); // Reload if needed
          });
        }
      },
      (FormError error) {
        debugPrint('Failed to load consent form: ${error.message}');
      },
    );
  }

  Future<void> _initializeMobileAds() async {
    await MobileAds.instance.initialize();

    // Check if we can show personalized ads
    try {
      final status = await ConsentInformation.instance.getConsentStatus();
      // Allow ads unless user explicitly denied
      _canShowAds = status != ConsentStatus.required;
    } catch (e) {
      // If consent check fails, still allow ads (non-personalized)
      debugPrint('Consent status check failed: $e');
      _canShowAds = true;
    }

    if (kDebugMode) {
      MobileAds.instance.updateRequestConfiguration(
        RequestConfiguration(testDeviceIds: ['YOUR_TEST_DEVICE_ID']),
      );
    }
  }

  /// Reset consent for testing (debug only)
  Future<void> resetConsent() async {
    if (kDebugMode) {
      await ConsentInformation.instance.reset();
    }
  }

  AdRequest _getAdRequest() {
    return const AdRequest(
      nonPersonalizedAds: false, // Will be personalized if consent given
    );
  }

  BannerAd createBannerAd({
    required Function(Ad) onAdLoaded,
    required Function(Ad, LoadAdError) onAdFailedToLoad,
  }) {
    return BannerAd(
      adUnitId: bannerAdUnitId,
      size: AdSize.banner,
      request: _getAdRequest(),
      listener: BannerAdListener(
        onAdLoaded: onAdLoaded,
        onAdFailedToLoad: onAdFailedToLoad,
        onAdOpened: (ad) => debugPrint('Ad opened'),
        onAdClosed: (ad) => debugPrint('Ad closed'),
      ),
    );
  }
}

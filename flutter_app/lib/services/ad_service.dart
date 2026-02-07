import 'package:flutter/foundation.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class AdService {
  static final AdService _instance = AdService._internal();
  factory AdService() => _instance;
  AdService._internal();

  bool _isInitialized = false;
  bool _canShowAds = true;

  // Android: Native Advanced ad unit (네이티브 광고 고급형)
  static const String _nativeAdUnitIdAndroid = 'ca-app-pub-3715008468517611/8425278053';
  // iOS: Banner ad unit (배너)
  static const String _bannerAdUnitIdIOS = 'ca-app-pub-3715008468517611/5435001256';

  // Test Ad Unit IDs (for development)
  static const String _testNativeAdUnitIdAndroid = 'ca-app-pub-3940256099942544/2247696110';
  static const String _testBannerAdUnitIdIOS = 'ca-app-pub-3940256099942544/2934735716';

  bool get canShowAds => !kIsWeb && _canShowAds;
  bool get isAndroid => defaultTargetPlatform == TargetPlatform.android;

  String get nativeAdUnitId {
    if (kDebugMode) {
      return _testNativeAdUnitIdAndroid;
    }
    return _nativeAdUnitIdAndroid;
  }

  String get bannerAdUnitId {
    if (kDebugMode) {
      return _testBannerAdUnitIdIOS;
    }
    return _bannerAdUnitIdIOS;
  }

  /// Initialize ads with GDPR consent handling
  Future<void> initialize() async {
    if (_isInitialized) return;

    // Skip initialization on web
    if (kIsWeb) {
      _isInitialized = true;
      return;
    }

    final params = ConsentRequestParameters();

    ConsentInformation.instance.requestConsentInfoUpdate(
      params,
      () async {
        if (await ConsentInformation.instance.isConsentFormAvailable()) {
          await _loadAndShowConsentForm();
        }
        await _initializeMobileAds();
      },
      (FormError error) {
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
            _loadAndShowConsentForm();
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

    try {
      final status = await ConsentInformation.instance.getConsentStatus();
      _canShowAds = true;
      debugPrint('AdService: Consent status: $status, canShowAds: $_canShowAds');
    } catch (e) {
      debugPrint('Consent status check failed: $e');
      _canShowAds = true;
    }

    debugPrint('AdService: MobileAds initialized, canShowAds: $_canShowAds, platform: ${isAndroid ? "Android" : "iOS"}');
  }

  Future<void> resetConsent() async {
    if (kDebugMode) {
      await ConsentInformation.instance.reset();
    }
  }

  AdRequest _getAdRequest() {
    return const AdRequest(
      nonPersonalizedAds: false,
    );
  }

  /// Create a NativeAd for Android
  NativeAd createNativeAd({
    required Function(Ad) onAdLoaded,
    required Function(Ad, LoadAdError) onAdFailedToLoad,
  }) {
    debugPrint('AdService: Creating NativeAd with unit: $nativeAdUnitId');
    return NativeAd(
      adUnitId: nativeAdUnitId,
      factoryId: 'smallNativeAd',
      request: _getAdRequest(),
      listener: NativeAdListener(
        onAdLoaded: (ad) {
          debugPrint('AdService: NativeAd loaded successfully');
          onAdLoaded(ad);
        },
        onAdFailedToLoad: (ad, error) {
          debugPrint('AdService: NativeAd failed to load: ${error.message} (code: ${error.code})');
          onAdFailedToLoad(ad, error);
        },
        onAdOpened: (ad) => debugPrint('NativeAd opened'),
        onAdClosed: (ad) => debugPrint('NativeAd closed'),
      ),
    );
  }

  /// Create a BannerAd for iOS
  BannerAd createBannerAd({
    required Function(Ad) onAdLoaded,
    required Function(Ad, LoadAdError) onAdFailedToLoad,
  }) {
    debugPrint('AdService: Creating BannerAd with unit: $bannerAdUnitId');
    return BannerAd(
      adUnitId: bannerAdUnitId,
      size: AdSize.banner,
      request: _getAdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          debugPrint('AdService: BannerAd loaded successfully');
          onAdLoaded(ad);
        },
        onAdFailedToLoad: (ad, error) {
          debugPrint('AdService: BannerAd failed to load: ${error.message} (code: ${error.code})');
          onAdFailedToLoad(ad, error);
        },
        onAdOpened: (ad) => debugPrint('BannerAd opened'),
        onAdClosed: (ad) => debugPrint('BannerAd closed'),
      ),
    );
  }
}

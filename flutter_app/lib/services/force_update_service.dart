import 'dart:io';
import 'package:firebase_remote_config/firebase_remote_config.dart';
import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:url_launcher/url_launcher.dart';

class ForceUpdateService {
  static final ForceUpdateService _instance = ForceUpdateService._internal();
  factory ForceUpdateService() => _instance;
  ForceUpdateService._internal();

  late final FirebaseRemoteConfig _remoteConfig;
  bool _isInitialized = false;

  // Play Store URL
  static const String _playStoreUrl =
      'https://play.google.com/store/apps/details?id=com.graphbible.app';
  // App Store URL (for future iOS release)
  static const String _appStoreUrl =
      'https://apps.apple.com/app/id123456789'; // Replace with actual ID

  Future<void> initialize() async {
    if (_isInitialized) return;

    try {
      _remoteConfig = FirebaseRemoteConfig.instance;

      await _remoteConfig.setConfigSettings(RemoteConfigSettings(
        fetchTimeout: const Duration(minutes: 1),
        minimumFetchInterval: const Duration(hours: 1),
      ));

      // Set default values
      await _remoteConfig.setDefaults({
        'force_update_enabled': false,
        'minimum_version': '1.0.0',
        'latest_version': '1.0.0',
        'update_message_ko': '새로운 버전이 출시되었습니다. 업데이트 후 사용해 주세요.',
        'update_message_en': 'A new version is available. Please update to continue.',
        'maintenance_mode': false,
        'maintenance_message_ko': '서버 점검 중입니다. 잠시 후 다시 이용해 주세요.',
        'maintenance_message_en': 'Server maintenance in progress. Please try again later.',
      });

      // Fetch and activate remote config
      await _remoteConfig.fetchAndActivate();
      _isInitialized = true;
    } catch (e) {
      debugPrint('Remote Config initialization error: $e');
      _isInitialized = true; // Continue without remote config
    }
  }

  Future<UpdateStatus> checkForUpdate() async {
    if (!_isInitialized) {
      await initialize();
    }

    try {
      // Refresh config
      await _remoteConfig.fetchAndActivate();

      // Check maintenance mode first
      if (_remoteConfig.getBool('maintenance_mode')) {
        return UpdateStatus.maintenance;
      }

      // Check force update
      if (!_remoteConfig.getBool('force_update_enabled')) {
        return UpdateStatus.noUpdate;
      }

      final packageInfo = await PackageInfo.fromPlatform();
      final currentVersion = packageInfo.version;
      final minimumVersion = _remoteConfig.getString('minimum_version');
      final latestVersion = _remoteConfig.getString('latest_version');

      // Compare versions
      if (_isVersionLower(currentVersion, minimumVersion)) {
        return UpdateStatus.forceUpdate;
      } else if (_isVersionLower(currentVersion, latestVersion)) {
        return UpdateStatus.optionalUpdate;
      }

      return UpdateStatus.noUpdate;
    } catch (e) {
      debugPrint('Update check error: $e');
      return UpdateStatus.noUpdate;
    }
  }

  bool _isVersionLower(String current, String minimum) {
    final currentParts = current.split('.').map((e) => int.tryParse(e) ?? 0).toList();
    final minimumParts = minimum.split('.').map((e) => int.tryParse(e) ?? 0).toList();

    // Pad shorter list with zeros
    while (currentParts.length < 3) currentParts.add(0);
    while (minimumParts.length < 3) minimumParts.add(0);

    for (int i = 0; i < 3; i++) {
      if (currentParts[i] < minimumParts[i]) return true;
      if (currentParts[i] > minimumParts[i]) return false;
    }
    return false;
  }

  String getUpdateMessage(String lang) {
    return lang == 'ko'
        ? _remoteConfig.getString('update_message_ko')
        : _remoteConfig.getString('update_message_en');
  }

  String getMaintenanceMessage(String lang) {
    return lang == 'ko'
        ? _remoteConfig.getString('maintenance_message_ko')
        : _remoteConfig.getString('maintenance_message_en');
  }

  String getLatestVersion() {
    return _remoteConfig.getString('latest_version');
  }

  Future<void> openStore() async {
    final url = Platform.isIOS ? _appStoreUrl : _playStoreUrl;
    final uri = Uri.parse(url);

    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  // Show force update dialog
  Future<void> showUpdateDialog(BuildContext context, String lang) async {
    final status = await checkForUpdate();

    if (status == UpdateStatus.noUpdate) return;

    if (!context.mounted) return;

    if (status == UpdateStatus.maintenance) {
      await _showMaintenanceDialog(context, lang);
    } else if (status == UpdateStatus.forceUpdate) {
      await _showForceUpdateDialog(context, lang);
    } else if (status == UpdateStatus.optionalUpdate) {
      await _showOptionalUpdateDialog(context, lang);
    }
  }

  Future<void> _showForceUpdateDialog(BuildContext context, String lang) async {
    await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => PopScope(
        canPop: false,
        child: AlertDialog(
          title: Text(lang == 'ko' ? '업데이트 필요' : 'Update Required'),
          content: Text(getUpdateMessage(lang)),
          actions: [
            TextButton(
              onPressed: () => openStore(),
              child: Text(lang == 'ko' ? '업데이트' : 'Update'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _showOptionalUpdateDialog(BuildContext context, String lang) async {
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(lang == 'ko' ? '새 버전 출시' : 'New Version Available'),
        content: Text(
          lang == 'ko'
              ? '새로운 버전 ${getLatestVersion()}이 출시되었습니다.\n업데이트하시겠습니까?'
              : 'Version ${getLatestVersion()} is now available.\nWould you like to update?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(lang == 'ko' ? '나중에' : 'Later'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              openStore();
            },
            child: Text(lang == 'ko' ? '업데이트' : 'Update'),
          ),
        ],
      ),
    );
  }

  Future<void> _showMaintenanceDialog(BuildContext context, String lang) async {
    await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => PopScope(
        canPop: false,
        child: AlertDialog(
          title: Text(lang == 'ko' ? '서버 점검' : 'Maintenance'),
          content: Text(getMaintenanceMessage(lang)),
          actions: [
            TextButton(
              onPressed: () => exit(0),
              child: Text(lang == 'ko' ? '확인' : 'OK'),
            ),
          ],
        ),
      ),
    );
  }
}

enum UpdateStatus {
  noUpdate,
  optionalUpdate,
  forceUpdate,
  maintenance,
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../providers/filter_provider.dart';
import '../../providers/theme_provider.dart';
import '../../providers/text_scale_provider.dart';
import 'privacy_policy_screen.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = ref.watch(languageProvider);
    final themeMode = ref.watch(themeProvider);
    final textScale = ref.watch(textScaleProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(lang == 'ko' ? '설정' : 'Settings'),
        automaticallyImplyLeading: false,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Appearance Section
          _SectionHeader(title: lang == 'ko' ? '화면' : 'Appearance'),
          _SettingsTile(
            icon: Icons.dark_mode,
            title: lang == 'ko' ? '테마' : 'Theme',
            subtitle: _getThemeLabel(themeMode, lang),
            onTap: () => _showThemeDialog(context, ref, lang),
          ),

          const SizedBox(height: 24),

          // Language Section
          _SectionHeader(title: lang == 'ko' ? '언어' : 'Language'),
          _SettingsTile(
            icon: Icons.language,
            title: lang == 'ko' ? '언어 설정' : 'Language',
            subtitle: lang == 'ko' ? '한국어' : 'English',
            onTap: () => _showLanguageDialog(context, ref, lang),
          ),

          const SizedBox(height: 24),

          // Accessibility Section
          _SectionHeader(title: lang == 'ko' ? '접근성' : 'Accessibility'),
          _SettingsTile(
            icon: Icons.text_fields,
            title: lang == 'ko' ? '텍스트 크기' : 'Text Size',
            subtitle: _getTextScaleLabel(textScale, lang),
            onTap: () => _showTextScaleDialog(context, ref, lang),
          ),

          const SizedBox(height: 24),

          // About Section
          _SectionHeader(title: lang == 'ko' ? '정보' : 'About'),
          _SettingsTile(
            icon: Icons.info_outline,
            title: lang == 'ko' ? '앱 버전' : 'App Version',
            subtitle: '1.0.0',
            onTap: null,
          ),
          _SettingsTile(
            icon: Icons.privacy_tip_outlined,
            title: lang == 'ko' ? '개인정보처리방침' : 'Privacy Policy',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const PrivacyPolicyScreen()),
              );
            },
          ),
          _SettingsTile(
            icon: Icons.description_outlined,
            title: lang == 'ko' ? '이용약관' : 'Terms of Service',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const PrivacyPolicyScreen()),
              );
            },
          ),

          const SizedBox(height: 24),

          // Credits
          Center(
            child: Column(
              children: [
                Text(
                  lang == 'ko' ? '그래프 성경' : 'Graph Bible',
                  style: TextStyle(
                    color: isDark ? AppColors.textMuted : Colors.grey,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '© 2024 Graph Bible',
                  style: TextStyle(
                    color: isDark ? AppColors.textMuted : Colors.grey,
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

  String _getThemeLabel(AppThemeMode mode, String lang) {
    switch (mode) {
      case AppThemeMode.system:
        return lang == 'ko' ? '시스템 설정' : 'System';
      case AppThemeMode.light:
        return lang == 'ko' ? '라이트 모드' : 'Light';
      case AppThemeMode.dark:
        return lang == 'ko' ? '다크 모드' : 'Dark';
    }
  }

  String _getTextScaleLabel(TextScaleOption scale, String lang) {
    switch (scale) {
      case TextScaleOption.small:
        return lang == 'ko' ? '작게' : 'Small';
      case TextScaleOption.medium:
        return lang == 'ko' ? '보통' : 'Medium';
      case TextScaleOption.large:
        return lang == 'ko' ? '크게' : 'Large';
      case TextScaleOption.extraLarge:
        return lang == 'ko' ? '매우 크게' : 'Extra Large';
    }
  }

  void _showThemeDialog(BuildContext context, WidgetRef ref, String lang) {
    final currentTheme = ref.read(themeProvider);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(lang == 'ko' ? '테마 선택' : 'Select Theme'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _ThemeOption(
              title: lang == 'ko' ? '시스템 설정' : 'System',
              subtitle: lang == 'ko' ? '기기 설정을 따릅니다' : 'Follow device settings',
              icon: Icons.settings_suggest,
              isSelected: currentTheme == AppThemeMode.system,
              onTap: () {
                ref.read(themeProvider.notifier).setTheme(AppThemeMode.system);
                Navigator.pop(context);
              },
            ),
            _ThemeOption(
              title: lang == 'ko' ? '라이트 모드' : 'Light',
              subtitle: lang == 'ko' ? '밝은 화면' : 'Bright appearance',
              icon: Icons.light_mode,
              isSelected: currentTheme == AppThemeMode.light,
              onTap: () {
                ref.read(themeProvider.notifier).setTheme(AppThemeMode.light);
                Navigator.pop(context);
              },
            ),
            _ThemeOption(
              title: lang == 'ko' ? '다크 모드' : 'Dark',
              subtitle: lang == 'ko' ? '어두운 화면' : 'Dark appearance',
              icon: Icons.dark_mode,
              isSelected: currentTheme == AppThemeMode.dark,
              onTap: () {
                ref.read(themeProvider.notifier).setTheme(AppThemeMode.dark);
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showLanguageDialog(BuildContext context, WidgetRef ref, String lang) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(lang == 'ko' ? '언어 선택' : 'Select Language'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Text('🇰🇷', style: TextStyle(fontSize: 24)),
              title: const Text('한국어'),
              trailing: lang == 'ko' ? const Icon(Icons.check, color: AppColors.primary) : null,
              onTap: () {
                ref.read(languageProvider.notifier).state = 'ko';
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Text('🇺🇸', style: TextStyle(fontSize: 24)),
              title: const Text('English'),
              trailing: lang == 'en' ? const Icon(Icons.check, color: AppColors.primary) : null,
              onTap: () {
                ref.read(languageProvider.notifier).state = 'en';
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showTextScaleDialog(BuildContext context, WidgetRef ref, String lang) {
    final currentScale = ref.read(textScaleProvider);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(lang == 'ko' ? '텍스트 크기' : 'Text Size'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _TextScaleOption(
              title: lang == 'ko' ? '작게' : 'Small',
              subtitle: '85%',
              icon: Icons.text_decrease,
              isSelected: currentScale == TextScaleOption.small,
              onTap: () {
                ref.read(textScaleProvider.notifier).setTextScale(TextScaleOption.small);
                Navigator.pop(context);
              },
            ),
            _TextScaleOption(
              title: lang == 'ko' ? '보통' : 'Medium',
              subtitle: '100%',
              icon: Icons.text_fields,
              isSelected: currentScale == TextScaleOption.medium,
              onTap: () {
                ref.read(textScaleProvider.notifier).setTextScale(TextScaleOption.medium);
                Navigator.pop(context);
              },
            ),
            _TextScaleOption(
              title: lang == 'ko' ? '크게' : 'Large',
              subtitle: '115%',
              icon: Icons.text_increase,
              isSelected: currentScale == TextScaleOption.large,
              onTap: () {
                ref.read(textScaleProvider.notifier).setTextScale(TextScaleOption.large);
                Navigator.pop(context);
              },
            ),
            _TextScaleOption(
              title: lang == 'ko' ? '매우 크게' : 'Extra Large',
              subtitle: '130%',
              icon: Icons.format_size,
              isSelected: currentScale == TextScaleOption.extraLarge,
              onTap: () {
                ref.read(textScaleProvider.notifier).setTextScale(TextScaleOption.extraLarge);
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;

  const _SectionHeader({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title,
        style: TextStyle(
          color: AppColors.primary,
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _SettingsTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? subtitle;
  final VoidCallback? onTap;

  const _SettingsTile({
    required this.icon,
    required this.title,
    this.subtitle,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ListTile(
      leading: Icon(
        icon,
        color: isDark ? AppColors.textSecondary : Colors.grey[600],
      ),
      title: Text(
        title,
        style: TextStyle(
          color: isDark ? AppColors.textPrimary : Colors.black87,
          fontSize: 16,
        ),
      ),
      subtitle: subtitle != null
          ? Text(
              subtitle!,
              style: TextStyle(
                color: isDark ? AppColors.textMuted : Colors.grey,
                fontSize: 13,
              ),
            )
          : null,
      trailing: onTap != null
          ? Icon(
              Icons.chevron_right,
              color: isDark ? AppColors.textMuted : Colors.grey,
            )
          : null,
      onTap: onTap,
      contentPadding: const EdgeInsets.symmetric(horizontal: 4),
    );
  }
}

class _ThemeOption extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final bool isSelected;
  final VoidCallback onTap;

  const _ThemeOption({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: isSelected ? AppColors.primary : null),
      title: Text(title),
      subtitle: Text(subtitle, style: const TextStyle(fontSize: 12)),
      trailing: isSelected ? const Icon(Icons.check, color: AppColors.primary) : null,
      onTap: onTap,
    );
  }
}

class _TextScaleOption extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final bool isSelected;
  final VoidCallback onTap;

  const _TextScaleOption({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: isSelected ? AppColors.primary : null),
      title: Text(title),
      subtitle: Text(subtitle, style: const TextStyle(fontSize: 12)),
      trailing: isSelected ? const Icon(Icons.check, color: AppColors.primary) : null,
      onTap: onTap,
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../providers/filter_provider.dart';

class PrivacyPolicyScreen extends ConsumerWidget {
  const PrivacyPolicyScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(lang == 'ko' ? '개인정보처리방침' : 'Privacy Policy'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              lang == 'ko' ? '그래프 성경 개인정보처리방침' : 'Graph Bible Privacy Policy',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: isDark ? AppColors.textPrimary : Colors.black87,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              lang == 'ko' ? '최종 수정일: 2024년 1월' : 'Last Updated: January 2024',
              style: TextStyle(
                color: isDark ? AppColors.textMuted : Colors.grey,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 24),

            _buildSection(
              context,
              title: lang == 'ko' ? '1. 수집하는 정보' : '1. Information We Collect',
              content: lang == 'ko'
                  ? '''자동 수집 정보:
• 기기 정보: 기기 모델, 운영체제 버전
• 앱 사용 데이터: 앱 실행 횟수, 사용 시간 (익명화됨)
• 광고 ID: 맞춤형 광고 제공 목적 (Google AdMob)

사용자 저장 정보 (기기 내 저장):
• 즐겨찾기한 성경 인물
• 앱 설정 (테마, 언어, 텍스트 크기)
• 온보딩 완료 여부

중요: 이 정보는 사용자 기기에만 저장되며 외부 서버로 전송되지 않습니다.'''
                  : '''Automatically Collected:
• Device Information: Device model, OS version
• App Usage Data: App launches, usage duration (anonymized)
• Advertising ID: For personalized ads (Google AdMob)

User-Stored Information (Stored Locally):
• Bookmarked Bible characters
• App settings (theme, language, text size)
• Onboarding completion status

Important: This information is stored only on your device and is not transmitted to external servers.''',
            ),

            _buildSection(
              context,
              title: lang == 'ko' ? '2. 정보 사용 목적' : '2. How We Use Information',
              content: lang == 'ko'
                  ? '''• 앱 기능 제공 및 개선
• 사용자 맞춤 설정 유지
• 광고 제공 (Google AdMob)
• 앱 오류 분석 및 성능 개선'''
                  : '''• Provide and improve app functionality
• Maintain user preferences
• Display advertisements (Google AdMob)
• Analyze errors and improve performance''',
            ),

            _buildSection(
              context,
              title: lang == 'ko' ? '3. 제3자 서비스' : '3. Third-Party Services',
              content: lang == 'ko'
                  ? '''Google AdMob
앱은 광고 제공을 위해 Google AdMob을 사용합니다.

EU 사용자의 경우, 앱 첫 실행 시 광고 동의를 요청합니다 (GDPR 준수).'''
                  : '''Google AdMob
The App uses Google AdMob to serve advertisements.

For EU users, the App requests consent for advertising upon first launch (GDPR compliance).''',
            ),

            _buildSection(
              context,
              title: lang == 'ko' ? '4. 데이터 보안' : '4. Data Security',
              content: lang == 'ko'
                  ? '''• 모든 사용자 설정은 기기 내 로컬 저장소에만 저장됩니다
• 외부 서버로 개인 데이터를 전송하지 않습니다
• 계정 생성이나 로그인이 필요하지 않습니다'''
                  : '''• All user settings are stored only in local device storage
• No personal data is transmitted to external servers
• No account creation or login required''',
            ),

            _buildSection(
              context,
              title: lang == 'ko' ? '5. 아동 개인정보 보호' : '5. Children\'s Privacy',
              content: lang == 'ko'
                  ? '''앱은 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.
앱 콘텐츠는 모든 연령이 사용하기에 적합합니다.'''
                  : '''The App does not knowingly collect personal information from children under 13.
App content is suitable for all ages.''',
            ),

            _buildSection(
              context,
              title: lang == 'ko' ? '6. 사용자 권리' : '6. Your Rights',
              content: lang == 'ko'
                  ? '''• 데이터 삭제: 앱 삭제 시 모든 로컬 데이터가 자동 삭제됩니다
• 광고 추적 거부: 기기 설정에서 광고 ID 재설정 또는 맞춤 광고 비활성화 가능
• 설정 초기화: 앱 설정에서 데이터 초기화 가능'''
                  : '''• Data Deletion: All local data is automatically deleted when the App is uninstalled
• Opt-out of Ad Tracking: Reset Advertising ID or disable personalized ads in device settings
• Reset Settings: Reset data through App settings''',
            ),

            _buildSection(
              context,
              title: lang == 'ko' ? '7. 문의' : '7. Contact Us',
              content: lang == 'ko'
                  ? '''개인정보 관련 문의사항:
이메일: graphbible.app@gmail.com'''
                  : '''For privacy-related inquiries:
Email: graphbible.app@gmail.com''',
            ),

            const SizedBox(height: 24),
            Center(
              child: Text(
                '© 2024 Graph Bible. All rights reserved.',
                style: TextStyle(
                  color: isDark ? AppColors.textMuted : Colors.grey,
                  fontSize: 12,
                ),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildSection(BuildContext context, {required String title, required String content}) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: isDark ? AppColors.textPrimary : Colors.black87,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: TextStyle(
              fontSize: 14,
              height: 1.6,
              color: isDark ? AppColors.textSecondary : Colors.grey[700],
            ),
          ),
        ],
      ),
    );
  }
}

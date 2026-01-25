import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:graph_bible/main.dart' as app;

void main() {
  final binding = IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Store Screenshots', () {
    testWidgets('Capture all screens', (tester) async {
      // 앱 시작 (온보딩 스킵)
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));

      // 1. 그래프 화면
      await tester.pumpAndSettle(const Duration(seconds: 2));
      await takeScreenshot(binding, '01_graph_screen');

      // 2. 타임라인 탭
      await tester.tap(find.text('타임라인').first);
      await tester.pumpAndSettle(const Duration(seconds: 1));
      await takeScreenshot(binding, '02_timeline_screen');

      // 3. 성경 탭
      await tester.tap(find.text('성경').first);
      await tester.pumpAndSettle(const Duration(seconds: 1));
      await takeScreenshot(binding, '03_bible_screen');

      // 4. 검색 탭
      await tester.tap(find.text('검색').first);
      await tester.pumpAndSettle(const Duration(seconds: 1));
      await takeScreenshot(binding, '04_search_screen');

      // 5. 설정 탭
      await tester.tap(find.text('설정').first);
      await tester.pumpAndSettle(const Duration(seconds: 1));
      await takeScreenshot(binding, '05_settings_screen');
    });
  });
}

Future<void> takeScreenshot(
  IntegrationTestWidgetsFlutterBinding binding,
  String name,
) async {
  if (Platform.isAndroid) {
    await binding.convertFlutterSurfaceToImage();
    await binding.takeScreenshot(name);
  }
}

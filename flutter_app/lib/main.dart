import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/constants/app_theme.dart';
import 'presentation/screens/home/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: GraphBibleApp(),
    ),
  );
}

class GraphBibleApp extends StatelessWidget {
  const GraphBibleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '그래프 성경',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const HomeScreen(),
    );
  }
}

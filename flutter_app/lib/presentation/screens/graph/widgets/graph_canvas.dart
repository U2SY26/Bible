import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../data/models/character.dart';
import '../../../../data/models/relationship.dart';
import '../../../providers/data_providers.dart';
import '../../../providers/filter_provider.dart';
import '../../../providers/selection_provider.dart';

// 연결된 노드 ID 집합을 계산하는 헬퍼 함수
Set<String> _getConnectedNodeIds(String nodeId, List<Relationship> relationships) {
  final connectedIds = <String>{nodeId};
  for (final rel in relationships) {
    if (rel.source == nodeId) {
      connectedIds.add(rel.target);
    } else if (rel.target == nodeId) {
      connectedIds.add(rel.source);
    }
  }
  return connectedIds;
}

// Graph node representation
class GraphNode {
  final String id;
  final String name;
  final int importance;
  final String testament;
  Offset position;
  Offset velocity;
  bool isDragging;
  bool isPinned;  // 드래그 후 고정

  GraphNode({
    required this.id,
    required this.name,
    required this.importance,
    required this.testament,
    required this.position,
    this.velocity = Offset.zero,
    this.isDragging = false,
    this.isPinned = false,
  });

  double get radius => 5 + (importance * 0.8);

  bool get isFixed => isDragging || isPinned;
}

class GraphCanvas extends ConsumerStatefulWidget {
  final List<Character> characters;

  const GraphCanvas({super.key, required this.characters});

  @override
  ConsumerState<GraphCanvas> createState() => _GraphCanvasState();
}

class _GraphCanvasState extends ConsumerState<GraphCanvas>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late AnimationController _fitAnimationController;
  final Map<String, GraphNode> _nodes = {};
  List<Relationship> _relationships = [];

  Offset _pan = Offset.zero;
  double _zoom = 1.0;
  String? _draggedNodeId;
  Offset? _lastFocalPoint;
  Offset? _scaleStartPoint;
  bool _hasMoved = false;
  Size? _canvasSize;
  bool _initialFitDone = false;

  // 더블탭 감지용
  DateTime? _lastTapTime;
  String? _lastTappedNodeId;

  // 드래그 중 여부 (용수철 효과 활성화)
  bool _isDraggingNode = false;

  // "두번 클릭하라" 말풍선 표시 여부
  bool _showDoubleTapHint = false;

  // 애니메이션용
  Offset _targetPan = Offset.zero;
  double _targetZoom = 1.0;
  Offset _startPan = Offset.zero;
  double _startZoom = 1.0;

  // Physics constants
  static const double repulsionStrength = 1500;  // 반발력
  static const double attractionStrength = 50.0;  // 2배 강한 연결 인력
  static const double idealDistance = 50;
  static const double damping = 0.70;  // 빠른 수렴
  static const double minDistance = 20;
  static const double centerGravity = 0.0;  // 중심 중력 없음
  static const double maxVelocity = 400.0;  // 2배 속도
  static const double springStrength = 100.0;  // 용수철 강도

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();

    _fitAnimationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _fitAnimationController.addListener(_onFitAnimation);

    _animationController.addListener(_onFrame);
    _initializeNodes();
    _loadRelationships();
  }

  void _onFitAnimation() {
    final t = Curves.easeOutCubic.transform(_fitAnimationController.value);
    setState(() {
      _zoom = _startZoom + (_targetZoom - _startZoom) * t;
      _pan = Offset(
        _startPan.dx + (_targetPan.dx - _startPan.dx) * t,
        _startPan.dy + (_targetPan.dy - _startPan.dy) * t,
      );
    });
  }

  void _animateToFit(double newZoom, Offset newPan) {
    _startZoom = _zoom;
    _startPan = _pan;
    _targetZoom = newZoom;
    _targetPan = newPan;
    _fitAnimationController.forward(from: 0);
  }

  void _initializeNodes() {
    final random = Random();
    final centerX = 0.0;  // 원점 중심
    final centerY = 0.0;
    // 노드 수에 따라 동적으로 반경 조절 (1.5배 넓게)
    final nodeCount = widget.characters.length;
    final spreadRadius = (100.0 + sqrt(nodeCount) * 30) * 1.5;  // 1.5배 증가

    for (final char in widget.characters) {
      final angle = random.nextDouble() * 2 * pi;
      final r = 75 + random.nextDouble() * spreadRadius;  // 1.5배
      _nodes[char.id] = GraphNode(
        id: char.id,
        name: char.nameKo,
        importance: char.importance,
        testament: char.testament,
        position: Offset(centerX + r * cos(angle), centerY + r * sin(angle)),
      );
    }
  }

  Future<void> _loadRelationships() async {
    final repo = ref.read(relationshipRepositoryProvider);
    final allRelationships = await repo.getAllRelationships();

    // Filter relationships to only those between visible characters
    final visibleIds = widget.characters.map((c) => c.id).toSet();
    setState(() {
      _relationships = allRelationships
          .where(
              (r) => visibleIds.contains(r.source) && visibleIds.contains(r.target))
          .toList();
    });

    // 초기 fit-to-screen 실행 (약간의 지연 후)
    Future.delayed(const Duration(milliseconds: 100), () {
      if (mounted && !_initialFitDone) {
        _fitToScreen();
        _initialFitDone = true;
      }
    });
  }

  void _fitToScreen({bool animate = true}) {
    if (_nodes.isEmpty || _canvasSize == null) return;

    // 모든 노드의 경계 계산
    double minX = double.infinity;
    double maxX = double.negativeInfinity;
    double minY = double.infinity;
    double maxY = double.negativeInfinity;

    for (final node in _nodes.values) {
      final r = node.radius;
      minX = min(minX, node.position.dx - r);
      maxX = max(maxX, node.position.dx + r);
      minY = min(minY, node.position.dy - r);
      maxY = max(maxY, node.position.dy + r);
    }

    // 여백 추가
    const padding = 50.0;
    minX -= padding;
    maxX += padding;
    minY -= padding;
    maxY += padding;

    final contentWidth = maxX - minX;
    final contentHeight = maxY - minY;
    final contentCenterX = (minX + maxX) / 2;
    final contentCenterY = (minY + maxY) / 2;

    // 화면에 맞는 줌 계산
    final scaleX = _canvasSize!.width / contentWidth;
    final scaleY = _canvasSize!.height / contentHeight;
    final newZoom = min(scaleX, scaleY).clamp(0.3, 2.0);

    // 중앙 정렬을 위한 pan 계산
    final screenCenterX = _canvasSize!.width / 2;
    final screenCenterY = _canvasSize!.height / 2;
    final newPan = Offset(
      screenCenterX - contentCenterX * newZoom,
      screenCenterY - contentCenterY * newZoom,
    );

    // 모든 노드 고정 (초기 배치 후 움직이지 않음)
    for (final node in _nodes.values) {
      node.isPinned = true;
      node.velocity = Offset.zero;
    }

    if (animate && _initialFitDone) {
      _animateToFit(newZoom, newPan);
    } else {
      setState(() {
        _zoom = newZoom;
        _pan = newPan;
      });
    }
  }

  void _onFrame() {
    if (!mounted) return;

    // Apply physics
    _applyForces();

    setState(() {});
  }

  void _applyForces() {
    final nodeList = _nodes.values.toList();
    final draggedNode = _draggedNodeId != null ? _nodes[_draggedNodeId] : null;

    // Calculate center of mass
    Offset center = Offset.zero;
    for (final node in nodeList) {
      center += node.position;
    }
    if (nodeList.isNotEmpty) {
      center = center / nodeList.length.toDouble();
    }

    // 드래그 중일 때 용수철 효과 적용 (더 강한 힘 + 2차 연결까지)
    if (_isDraggingNode && draggedNode != null) {
      // 1차 연결 노드들 수집 및 끌어당김
      final firstDegreeNodes = <String>{};
      for (final rel in _relationships) {
        if (rel.source == _draggedNodeId) {
          firstDegreeNodes.add(rel.target);
          final target = _nodes[rel.target];
          if (target != null && !target.isFixed) {
            final diff = draggedNode.position - target.position;
            final distance = diff.distance;
            if (distance > 1) {
              final direction = diff / distance;
              // 더 강한 용수철 힘 (거리에 비례하여 가속)
              final distanceFactor = min(distance / 100, 3.0);
              target.velocity += direction * springStrength * 0.3 * distanceFactor;
            }
          }
        } else if (rel.target == _draggedNodeId) {
          firstDegreeNodes.add(rel.source);
          final source = _nodes[rel.source];
          if (source != null && !source.isFixed) {
            final diff = draggedNode.position - source.position;
            final distance = diff.distance;
            if (distance > 1) {
              final direction = diff / distance;
              final distanceFactor = min(distance / 100, 3.0);
              source.velocity += direction * springStrength * 0.3 * distanceFactor;
            }
          }
        }
      }

      // 2차 연결 노드들도 약하게 끌어당김 (체인 효과)
      for (final firstNodeId in firstDegreeNodes) {
        final firstNode = _nodes[firstNodeId];
        if (firstNode == null) continue;

        for (final rel in _relationships) {
          String? secondNodeId;
          if (rel.source == firstNodeId && rel.target != _draggedNodeId) {
            secondNodeId = rel.target;
          } else if (rel.target == firstNodeId && rel.source != _draggedNodeId) {
            secondNodeId = rel.source;
          }

          if (secondNodeId != null && !firstDegreeNodes.contains(secondNodeId)) {
            final secondNode = _nodes[secondNodeId];
            if (secondNode != null && !secondNode.isFixed) {
              // 2차 노드는 1차 노드 쪽으로 끌어당김
              final diff = firstNode.position - secondNode.position;
              final distance = diff.distance;
              if (distance > 1) {
                final direction = diff / distance;
                secondNode.velocity += direction * springStrength * 0.15;
              }
            }
          }
        }
      }
    }

    // Repulsion between all nodes
    for (int i = 0; i < nodeList.length; i++) {
      for (int j = i + 1; j < nodeList.length; j++) {
        _applyRepulsion(nodeList[i], nodeList[j]);
      }
    }

    // Attraction along edges
    for (final rel in _relationships) {
      final source = _nodes[rel.source];
      final target = _nodes[rel.target];
      if (source != null && target != null) {
        _applyAttraction(source, target);
      }
    }

    // Update positions with damping and center gravity
    for (final node in _nodes.values) {
      if (!node.isFixed) {
        // Apply center gravity
        final toCenter = center - node.position;
        node.velocity += toCenter * centerGravity;

        node.velocity *= damping;
        node.position += node.velocity * 0.016; // ~60fps
      }
    }
  }

  void _applyRepulsion(GraphNode a, GraphNode b) {
    final diff = a.position - b.position;
    final distance = max(diff.distance, minDistance);
    final force = repulsionStrength / (distance * distance);
    final direction = diff / distance;

    if (!a.isFixed) a.velocity += direction * force * 0.01;
    if (!b.isFixed) b.velocity -= direction * force * 0.01;
  }

  void _applyAttraction(GraphNode a, GraphNode b) {
    final diff = b.position - a.position;
    final distance = diff.distance;
    if (distance < 1) return;

    // 거리가 멀수록 가속도 급격히 증가 (세제곱 비례)
    final distanceRatio = (distance - idealDistance) / idealDistance;
    final acceleration = 1.0 + (distanceRatio.abs() * distanceRatio.abs() * distanceRatio.abs());
    final force = (distance - idealDistance) * attractionStrength * acceleration;
    final direction = diff / distance;

    if (!a.isFixed) {
      a.velocity += direction * force * 0.5;
      // 최대 속도 제한
      if (a.velocity.distance > maxVelocity) {
        a.velocity = a.velocity / a.velocity.distance * maxVelocity;
      }
    }
    if (!b.isFixed) {
      b.velocity -= direction * force * 0.5;
      if (b.velocity.distance > maxVelocity) {
        b.velocity = b.velocity / b.velocity.distance * maxVelocity;
      }
    }
  }

  @override
  void didUpdateWidget(GraphCanvas oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.characters != oldWidget.characters) {
      _updateNodes();
      _loadRelationships();
    }
  }

  void _updateNodes() {
    final currentIds = widget.characters.map((c) => c.id).toSet();
    final existingIds = _nodes.keys.toSet();

    // Remove nodes that are no longer in the list
    for (final id in existingIds.difference(currentIds)) {
      _nodes.remove(id);
    }

    // Add new nodes - 기존 노드 중심 근처에 배치
    final random = Random();
    Offset center = Offset.zero;
    if (_nodes.isNotEmpty) {
      for (final node in _nodes.values) {
        center += node.position;
      }
      center = center / _nodes.length.toDouble();
    }

    for (final char in widget.characters) {
      if (!_nodes.containsKey(char.id)) {
        final angle = random.nextDouble() * 2 * pi;
        final r = 100 + random.nextDouble() * 200;
        _nodes[char.id] = GraphNode(
          id: char.id,
          name: char.nameKo,
          importance: char.importance,
          testament: char.testament,
          position: Offset(center.dx + r * cos(angle), center.dy + r * sin(angle)),
        );
      }
    }

    // 필터 변경 시 fit-to-screen
    _initialFitDone = false;
  }

  @override
  Widget build(BuildContext context) {
    final selectedId = ref.watch(selectedCharacterIdProvider);
    final selectionMode = ref.watch(selectionModeProvider);
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // 연결된 노드 ID 계산
    final visibleNodeIds = selectedId != null
        ? _getConnectedNodeIds(selectedId, _relationships)
        : <String>{};

    return LayoutBuilder(
      builder: (context, constraints) {
        // 캔버스 크기 저장
        _canvasSize = Size(constraints.maxWidth, constraints.maxHeight);

        return Stack(
          children: [
            GestureDetector(
              onScaleStart: _onScaleStart,
              onScaleUpdate: _onScaleUpdate,
              onScaleEnd: _onScaleEnd,
              onDoubleTapDown: _onDoubleTap,
              child: ClipRect(
                child: Container(
                  color: isDark ? AppColors.background : const Color(0xFFF5F5F7),
                  child: CustomPaint(
                    painter: _GraphPainter(
                      nodes: _nodes,
                      relationships: _relationships,
                      pan: _pan,
                      zoom: _zoom,
                      selectedNodeId: selectedId,
                      lang: lang,
                      isDark: isDark,
                      selectionMode: selectionMode,
                      visibleNodeIds: visibleNodeIds,
                    ),
                    size: Size.infinite,
                  ),
                ),
              ),
            ),
            // "두번 클릭하라" 말풍선
            if (_showDoubleTapHint && selectionMode == SelectionMode.focused && selectedId != null)
              Positioned(
                left: 0,
                right: 0,
                bottom: 60,
                child: Center(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: (isDark ? Colors.white : Colors.black).withValues(alpha: 0.7),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      lang == 'ko' ? '두번 클릭하여 상세보기' : 'Double tap for details',
                      style: TextStyle(
                        color: isDark ? Colors.black : Colors.white,
                        fontSize: 11,
                      ),
                    ),
                  ),
                ),
              ),
            // Fit-to-screen 버튼
            Positioned(
              right: 16,
              bottom: 16,
              child: FloatingActionButton.small(
                heroTag: 'fitToScreen',
                onPressed: () {
                  // 전체 화면 fit 시 선택 해제
                  ref.read(selectionModeProvider.notifier).state = SelectionMode.none;
                  ref.read(selectedCharacterIdProvider.notifier).state = null;
                  _showDoubleTapHint = false;
                  _fitToScreen();
                },
                backgroundColor: isDark ? AppColors.surfaceLight : Colors.white,
                child: Icon(
                  Icons.fit_screen,
                  color: isDark ? AppColors.textSecondary : Colors.grey[700],
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  void _onScaleStart(ScaleStartDetails details) {
    _lastFocalPoint = details.localFocalPoint;
    _scaleStartPoint = details.localFocalPoint;
    _hasMoved = false;

    // 두 손가락 이상이면 노드 선택 안함 (핀치 줌 전용)
    if (details.pointerCount > 1) {
      return;
    }

    // Check if touching a node (한 손가락일 때만)
    final touchPoint = (details.localFocalPoint - _pan) / _zoom;
    final currentMode = ref.read(selectionModeProvider);
    final currentSelectedId = ref.read(selectedCharacterIdProvider);

    // focused/detailOpen 모드에서는 보이는 노드만 터치 가능
    final visibleNodeIds = currentSelectedId != null && currentMode != SelectionMode.none
        ? _getConnectedNodeIds(currentSelectedId, _relationships)
        : null;

    for (final node in _nodes.values) {
      // 보이지 않는 노드는 터치 불가
      if (visibleNodeIds != null && !visibleNodeIds.contains(node.id)) {
        continue;
      }

      if ((node.position - touchPoint).distance < node.radius + 10) {  // 터치 영역 확대
        _draggedNodeId = node.id;
        node.isDragging = true;
        _isDraggingNode = true;

        // 더블탭 감지
        final now = DateTime.now();
        final isDoubleTap = _lastTapTime != null &&
            _lastTappedNodeId == node.id &&
            now.difference(_lastTapTime!).inMilliseconds < 400;

        if (isDoubleTap && currentMode == SelectionMode.focused) {
          // 더블탭 -> detailOpen (팝업 표시)
          ref.read(selectionModeProvider.notifier).state = SelectionMode.detailOpen;
          _showDoubleTapHint = false;
        } else if (currentSelectedId != node.id) {
          // 다른 노드 터치 -> focused 모드로 전환
          ref.read(selectedCharacterIdProvider.notifier).state = node.id;
          ref.read(selectionModeProvider.notifier).state = SelectionMode.focused;
          _showDoubleTapHint = true;
        }

        _lastTapTime = now;
        _lastTappedNodeId = node.id;

        // 드래그 시작 시 연결된 노드들의 고정 해제 (용수철 효과를 위해)
        _unpinConnectedNodes(node.id);
        return;
      }
    }
  }

  // 연결된 노드들의 고정을 해제
  void _unpinConnectedNodes(String nodeId) {
    for (final rel in _relationships) {
      if (rel.source == nodeId) {
        final target = _nodes[rel.target];
        if (target != null) {
          target.isPinned = false;
        }
      } else if (rel.target == nodeId) {
        final source = _nodes[rel.source];
        if (source != null) {
          source.isPinned = false;
        }
      }
    }
  }

  void _onScaleUpdate(ScaleUpdateDetails details) {
    // Check if there was significant movement
    if (_scaleStartPoint != null) {
      final distance = (details.localFocalPoint - _scaleStartPoint!).distance;
      if (distance > 5) {
        _hasMoved = true;
      }
    }

    if (_draggedNodeId != null) {
      // Dragging a node
      final node = _nodes[_draggedNodeId];
      if (node != null) {
        _hasMoved = true;
        node.position = (details.localFocalPoint - _pan) / _zoom;
      }
    } else {
      // Pan and zoom (속도 조절)
      if (_lastFocalPoint != null) {
        final delta = (details.localFocalPoint - _lastFocalPoint!) * 0.7;  // 70%만 적용
        setState(() {
          _pan += delta;
        });
      }

      if (details.scale != 1.0) {
        _hasMoved = true;
        // 확대/축소 속도를 더 늦춤
        final scaleDelta = (details.scale - 1.0) * 0.08;  // 8%만 적용
        final newZoom = (_zoom * (1.0 + scaleDelta)).clamp(0.3, 2.0);

        // 손가락 위치 기준으로 줌 (focal point zoom)
        final focalPoint = details.localFocalPoint;
        final oldZoom = _zoom;

        setState(() {
          _zoom = newZoom;
          // 줌 변화에 따라 pan 조정하여 focal point 유지
          _pan = focalPoint - (focalPoint - _pan) * (newZoom / oldZoom);
        });
      }
    }
    _lastFocalPoint = details.localFocalPoint;
  }

  void _onScaleEnd(ScaleEndDetails details) {
    final currentMode = ref.read(selectionModeProvider);
    final currentSelectedId = ref.read(selectedCharacterIdProvider);

    // If there was no movement, treat it as a tap (for web compatibility)
    if (!_hasMoved && _scaleStartPoint != null && _draggedNodeId == null) {
      final touchPoint = (_scaleStartPoint! - _pan) / _zoom;

      // focused/detailOpen 모드에서는 보이는 노드만 체크
      final visibleNodeIds = currentSelectedId != null && currentMode != SelectionMode.none
          ? _getConnectedNodeIds(currentSelectedId, _relationships)
          : null;

      bool tappedNode = false;
      for (final node in _nodes.values) {
        // 보이지 않는 노드는 체크 안함
        if (visibleNodeIds != null && !visibleNodeIds.contains(node.id)) {
          continue;
        }
        if ((node.position - touchPoint).distance < node.radius + 10) {
          tappedNode = true;
          break;
        }
      }

      // 빈 공간 터치 - 모드 전환
      if (!tappedNode) {
        if (currentMode == SelectionMode.detailOpen) {
          // detailOpen -> focused (팝업만 닫기)
          ref.read(selectionModeProvider.notifier).state = SelectionMode.focused;
          _showDoubleTapHint = true;
        }
        // focused 모드에서 빈 공간 터치 시 리셋하지 않음
        // 리셋은 우하단 fit-to-screen 버튼으로만 가능
      }
    }

    if (_draggedNodeId != null) {
      final node = _nodes[_draggedNodeId];
      if (node != null) {
        node.isDragging = false;
        node.isPinned = true;  // 드래그 후 고정
        node.velocity = Offset.zero;  // 속도 초기화
      }

      _isDraggingNode = false;

      // 연결된 노드들만 fit 화면으로
      if (currentMode == SelectionMode.focused || currentMode == SelectionMode.none) {
        _fitToConnectedNodes(_draggedNodeId!);
      }

      // 연결된 노드들도 다시 고정
      _pinConnectedNodes(_draggedNodeId!);
      _draggedNodeId = null;
    }
  }

  // 연결된 노드들만 fit 화면으로 (애니메이션)
  void _fitToConnectedNodes(String nodeId) {
    if (_canvasSize == null) return;

    final connectedIds = _getConnectedNodeIds(nodeId, _relationships);
    if (connectedIds.isEmpty) return;

    // 연결된 노드들의 경계 계산
    double minX = double.infinity;
    double maxX = double.negativeInfinity;
    double minY = double.infinity;
    double maxY = double.negativeInfinity;

    for (final id in connectedIds) {
      final node = _nodes[id];
      if (node == null) continue;
      final r = node.radius;
      minX = min(minX, node.position.dx - r);
      maxX = max(maxX, node.position.dx + r);
      minY = min(minY, node.position.dy - r);
      maxY = max(maxY, node.position.dy + r);
    }

    // 여백 추가
    const padding = 80.0;
    minX -= padding;
    maxX += padding;
    minY -= padding;
    maxY += padding;

    final contentWidth = maxX - minX;
    final contentHeight = maxY - minY;
    final contentCenterX = (minX + maxX) / 2;
    final contentCenterY = (minY + maxY) / 2;

    // 화면에 맞는 줌 계산
    final scaleX = _canvasSize!.width / contentWidth;
    final scaleY = _canvasSize!.height / contentHeight;
    final newZoom = min(scaleX, scaleY).clamp(0.5, 2.0);

    // 중앙 정렬을 위한 pan 계산
    final screenCenterX = _canvasSize!.width / 2;
    final screenCenterY = _canvasSize!.height / 2;
    final newPan = Offset(
      screenCenterX - contentCenterX * newZoom,
      screenCenterY - contentCenterY * newZoom,
    );

    // 부드러운 애니메이션
    _animateToFit(newZoom, newPan);
  }

  // 연결된 노드들을 다시 고정
  void _pinConnectedNodes(String nodeId) {
    // 잠시 후 모든 노드 고정 (물리 시뮬레이션 안정화 후)
    Future.delayed(const Duration(milliseconds: 500), () {
      if (mounted) {
        setState(() {
          for (final node in _nodes.values) {
            node.isPinned = true;
            node.velocity = Offset.zero;
          }
        });
      }
    });
    _lastFocalPoint = null;
    _scaleStartPoint = null;
    _hasMoved = false;
  }

  @override
  void dispose() {
    _animationController.dispose();
    _fitAnimationController.dispose();
    super.dispose();
  }

  void _onDoubleTap(TapDownDetails details) {
    final touchPoint = (details.localPosition - _pan) / _zoom;
    final currentMode = ref.read(selectionModeProvider);
    final currentSelectedId = ref.read(selectedCharacterIdProvider);

    // focused/detailOpen 모드에서는 보이는 노드만 터치 가능
    final visibleNodeIds = currentSelectedId != null && currentMode != SelectionMode.none
        ? _getConnectedNodeIds(currentSelectedId, _relationships)
        : null;

    for (final node in _nodes.values) {
      // 보이지 않는 노드는 터치 불가
      if (visibleNodeIds != null && !visibleNodeIds.contains(node.id)) {
        continue;
      }

      if ((node.position - touchPoint).distance < node.radius + 15) {
        // 더블탭 -> detailOpen (팝업 표시)
        ref.read(selectedCharacterIdProvider.notifier).state = node.id;
        ref.read(selectionModeProvider.notifier).state = SelectionMode.detailOpen;
        _showDoubleTapHint = false;
        setState(() {});
        return;
      }
    }
  }
}

class _GraphPainter extends CustomPainter {
  final Map<String, GraphNode> nodes;
  final List<Relationship> relationships;
  final Offset pan;
  final double zoom;
  final String? selectedNodeId;
  final String lang;
  final bool isDark;
  final SelectionMode selectionMode;
  final Set<String> visibleNodeIds;

  _GraphPainter({
    required this.nodes,
    required this.relationships,
    required this.pan,
    required this.zoom,
    this.selectedNodeId,
    required this.lang,
    required this.isDark,
    required this.selectionMode,
    required this.visibleNodeIds,
  });

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.translate(pan.dx, pan.dy);
    canvas.scale(zoom);

    // focused나 detailOpen 모드일 때는 연결된 노드만 표시
    final showOnlyConnected = selectionMode != SelectionMode.none && selectedNodeId != null;

    // Draw edges first (연결된 것만)
    for (final rel in relationships) {
      if (showOnlyConnected) {
        // 선택된 노드와 연결된 엣지만 표시
        if (rel.source != selectedNodeId && rel.target != selectedNodeId) {
          continue;
        }
      }
      _drawEdge(canvas, rel);
    }

    // Draw nodes (연결된 것만)
    for (final node in nodes.values) {
      if (showOnlyConnected && !visibleNodeIds.contains(node.id)) {
        continue;
      }
      _drawNode(canvas, node);
    }

    canvas.restore();
  }

  void _drawEdge(Canvas canvas, Relationship rel) {
    final source = nodes[rel.source];
    final target = nodes[rel.target];
    if (source == null || target == null) return;

    final isHighlighted =
        selectedNodeId == rel.source || selectedNodeId == rel.target;

    final color = RelationshipColors.getColor(rel.type);
    final paint = Paint()
      ..color = color.withValues(alpha: isHighlighted ? 0.8 : 0.3)
      ..strokeWidth = isHighlighted ? 2.0 : 1.0
      ..style = PaintingStyle.stroke;

    canvas.drawLine(source.position, target.position, paint);
  }

  void _drawNode(Canvas canvas, GraphNode node) {
    final isSelected = selectedNodeId == node.id;
    final isFocusedMode = selectionMode == SelectionMode.focused || selectionMode == SelectionMode.detailOpen;
    final radius = node.radius * (isSelected ? 1.3 : 1.0);

    // Get node color
    final nodeColor =
        AppColors.getCharacterColor(node.id, node.importance, node.testament);

    // 강화된 네온 효과 (선택된 노드 + focused 모드)
    if (isSelected && isFocusedMode) {
      // 외곽 네온 (여러 레이어)
      for (int i = 3; i >= 1; i--) {
        final glowPaint = Paint()
          ..color = Colors.cyanAccent.withValues(alpha: 0.15 * i)
          ..maskFilter = MaskFilter.blur(BlurStyle.normal, 8.0 * i);
        canvas.drawCircle(node.position, radius + 8 * i, glowPaint);
      }
      // 중심 네온
      final innerGlowPaint = Paint()
        ..color = Colors.white.withValues(alpha: 0.5)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 5);
      canvas.drawCircle(node.position, radius + 3, innerGlowPaint);
    } else if (node.importance >= 8 || isSelected) {
      // 기본 글로우
      final glowPaint = Paint()
        ..color = nodeColor.withValues(alpha: 0.3)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10);
      canvas.drawCircle(node.position, radius + 5, glowPaint);
    }

    // Node fill with gradient
    final fillPaint = Paint()
      ..shader = RadialGradient(
        colors: [
          isSelected && isFocusedMode ? Colors.white : nodeColor,
          nodeColor.withValues(alpha: 0.7),
        ],
      ).createShader(Rect.fromCircle(center: node.position, radius: radius));
    canvas.drawCircle(node.position, radius, fillPaint);

    // Node border
    final borderPaint = Paint()
      ..color = isSelected
          ? (isFocusedMode ? Colors.cyanAccent : Colors.white)
          : nodeColor.withValues(alpha: 0.5)
      ..strokeWidth = isSelected ? 3.5 : 1.5
      ..style = PaintingStyle.stroke;
    canvas.drawCircle(node.position, radius, borderPaint);

    // Node label
    if (zoom > 0.4) {
      final textPainter = TextPainter(
        text: TextSpan(
          text: node.name,
          style: TextStyle(
            color: isDark ? AppColors.textPrimary : const Color(0xFF1C1C1E),
            fontSize: 10 / zoom,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
        textDirection: TextDirection.ltr,
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        Offset(
          node.position.dx - textPainter.width / 2,
          node.position.dy + radius + 4,
        ),
      );
    }
  }

  @override
  bool shouldRepaint(covariant _GraphPainter oldDelegate) => true;
}

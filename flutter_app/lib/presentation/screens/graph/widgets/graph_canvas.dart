import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../data/models/character.dart';
import '../../../../data/models/relationship.dart';
import '../../../providers/data_providers.dart';
import '../../../providers/filter_provider.dart';
import '../../../providers/selection_provider.dart';

// Graph node representation
class GraphNode {
  final String id;
  final String name;
  final int importance;
  final String testament;
  Offset position;
  Offset velocity;
  bool isDragging;

  GraphNode({
    required this.id,
    required this.name,
    required this.importance,
    required this.testament,
    required this.position,
    this.velocity = Offset.zero,
    this.isDragging = false,
  });

  double get radius => 15 + (importance * 2);
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
  final Map<String, GraphNode> _nodes = {};
  List<Relationship> _relationships = [];

  Offset _pan = Offset.zero;
  double _zoom = 0.6;
  String? _draggedNodeId;
  Offset? _lastFocalPoint;
  Offset? _scaleStartPoint;
  bool _hasMoved = false;

  // Physics constants
  static const double repulsionStrength = 3000;
  static const double attractionStrength = 0.05;
  static const double idealDistance = 120;
  static const double damping = 0.85;
  static const double minDistance = 40;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();

    _animationController.addListener(_onFrame);
    _initializeNodes();
    _loadRelationships();
  }

  void _initializeNodes() {
    final random = Random();
    final centerX = 200.0;
    final centerY = 300.0;
    final radius = 300.0;

    for (final char in widget.characters) {
      final angle = random.nextDouble() * 2 * pi;
      final r = random.nextDouble() * radius;
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
  }

  void _onFrame() {
    if (!mounted) return;

    // Apply physics
    _applyForces();

    setState(() {});
  }

  void _applyForces() {
    final nodeList = _nodes.values.toList();

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

    // Update positions with damping
    for (final node in _nodes.values) {
      if (!node.isDragging) {
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

    if (!a.isDragging) a.velocity += direction * force * 0.01;
    if (!b.isDragging) b.velocity -= direction * force * 0.01;
  }

  void _applyAttraction(GraphNode a, GraphNode b) {
    final diff = b.position - a.position;
    final distance = diff.distance;
    if (distance < 1) return;

    final force = (distance - idealDistance) * attractionStrength;
    final direction = diff / distance;

    if (!a.isDragging) a.velocity += direction * force;
    if (!b.isDragging) b.velocity -= direction * force;
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

    // Add new nodes
    final random = Random();
    for (final char in widget.characters) {
      if (!_nodes.containsKey(char.id)) {
        final angle = random.nextDouble() * 2 * pi;
        final r = random.nextDouble() * 200;
        _nodes[char.id] = GraphNode(
          id: char.id,
          name: char.nameKo,
          importance: char.importance,
          testament: char.testament,
          position: Offset(200 + r * cos(angle), 300 + r * sin(angle)),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final selectedId = ref.watch(selectedCharacterIdProvider);
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onScaleStart: _onScaleStart,
      onScaleUpdate: _onScaleUpdate,
      onScaleEnd: _onScaleEnd,
      onTapUp: _onTapUp,
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
          ),
          size: Size.infinite,
        ),
      ),
    );
  }

  void _onScaleStart(ScaleStartDetails details) {
    _lastFocalPoint = details.localFocalPoint;
    _scaleStartPoint = details.localFocalPoint;
    _hasMoved = false;

    // Check if touching a node
    final touchPoint = (details.localFocalPoint - _pan) / _zoom;
    for (final node in _nodes.values) {
      if ((node.position - touchPoint).distance < node.radius) {
        _draggedNodeId = node.id;
        node.isDragging = true;
        return;
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
      // Pan and zoom
      if (_lastFocalPoint != null) {
        final delta = details.localFocalPoint - _lastFocalPoint!;
        setState(() {
          _pan += delta;
        });
      }

      if (details.scale != 1.0) {
        _hasMoved = true;
        setState(() {
          _zoom = (_zoom * details.scale).clamp(0.2, 3.0);
        });
      }
    }
    _lastFocalPoint = details.localFocalPoint;
  }

  void _onScaleEnd(ScaleEndDetails details) {
    // If there was no movement, treat it as a tap (for web compatibility)
    if (!_hasMoved && _scaleStartPoint != null) {
      final touchPoint = (_scaleStartPoint! - _pan) / _zoom;
      bool tappedNode = false;
      for (final node in _nodes.values) {
        if ((node.position - touchPoint).distance < node.radius) {
          ref.read(selectedCharacterIdProvider.notifier).state = node.id;
          tappedNode = true;
          break;
        }
      }
      // Tap on empty space - deselect
      if (!tappedNode) {
        ref.read(selectedCharacterIdProvider.notifier).state = null;
      }
    }

    if (_draggedNodeId != null) {
      _nodes[_draggedNodeId]?.isDragging = false;
      _draggedNodeId = null;
    }
    _lastFocalPoint = null;
    _scaleStartPoint = null;
    _hasMoved = false;
  }

  void _onTapUp(TapUpDetails details) {
    final touchPoint = (details.localPosition - _pan) / _zoom;
    for (final node in _nodes.values) {
      if ((node.position - touchPoint).distance < node.radius) {
        ref.read(selectedCharacterIdProvider.notifier).state = node.id;
        return;
      }
    }
    // Tap on empty space - deselect
    ref.read(selectedCharacterIdProvider.notifier).state = null;
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
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

  _GraphPainter({
    required this.nodes,
    required this.relationships,
    required this.pan,
    required this.zoom,
    this.selectedNodeId,
    required this.lang,
    required this.isDark,
  });

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.translate(pan.dx, pan.dy);
    canvas.scale(zoom);

    // Draw edges first
    for (final rel in relationships) {
      _drawEdge(canvas, rel);
    }

    // Draw nodes
    for (final node in nodes.values) {
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
    final radius = node.radius * (isSelected ? 1.2 : 1.0);

    // Get node color
    final nodeColor =
        AppColors.getCharacterColor(node.id, node.importance, node.testament);

    // Glow effect for important or selected nodes
    if (node.importance >= 8 || isSelected) {
      final glowPaint = Paint()
        ..color = nodeColor.withValues(alpha: 0.3)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10);
      canvas.drawCircle(node.position, radius + 5, glowPaint);
    }

    // Node fill with gradient
    final fillPaint = Paint()
      ..shader = RadialGradient(
        colors: [
          nodeColor,
          nodeColor.withValues(alpha: 0.7),
        ],
      ).createShader(Rect.fromCircle(center: node.position, radius: radius));
    canvas.drawCircle(node.position, radius, fillPaint);

    // Node border
    final borderPaint = Paint()
      ..color = isSelected ? Colors.white : nodeColor.withValues(alpha: 0.5)
      ..strokeWidth = isSelected ? 3.0 : 1.5
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

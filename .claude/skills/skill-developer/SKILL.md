---
name: skill-developer
description: "Claude Code 스킬 생성 및 관리 가이드"
---

# Skill Developer — 스킬 생성 가이드

## 사용 시기
- "스킬 만들어", "스킬 생성", "create skill" 등 스킬 생성 요청 시

## 스킬 구조

```
.claude/skills/{skill-name}/
├── SKILL.md          # 메인 정의 (500줄 이내 권장)
└── resources/        # 참조 자료 (선택)
```

## SKILL.md 필수 구조

```yaml
---
name: skill-name
description: "한 줄 설명"
---
```

본문: 사용 시기, 핵심 원칙, 실행 절차

## 헌법적 원칙

1. **Claude의 능력을 제한하지 않는다** — 가이드라인을 제공하되 가능성을 닫지 않는다
2. **추상적이고 범용적으로 작성** — 특정 프레임워크/라이브러리에 종속되지 않는다
3. **500줄 이내** — 초과 시 resources/ 하위로 분리
4. **YAML 프론트매터는 name, description만** 사용

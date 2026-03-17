# Bible (성경 인물 그래프) - 프로젝트 규정

**Last Updated**: 2026-02-25

---

## 칸반보드 연동 (필수)

> **모든 작업은 반드시 칸반 티켓으로 등록한 후 착수해야 한다.**

### 규칙
1. 작업 시작 전 `kanban_team_list`로 기존 팀 확인
2. 팀이 없으면 `kanban_team_create`로 생성 — **project_group은 반드시 "Bible"**
3. 티켓 생성 → 작업 → 상태 변경 (Todo → InProgress → Review → Done)
4. 완료 시 아카이브

### MCP 도구
- `kanban_team_list` — 팀 목록 (project_group 필터 가능)
- `kanban_team_create` — 팀 생성 (**project_group 필수**)
- `kanban_ticket_create` — 티켓 생성
- `kanban_ticket_status` — 상태 변경

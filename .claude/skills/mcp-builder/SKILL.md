---
name: mcp-builder
description: "MCP 서버 개발 가이드"
---

# MCP Builder — MCP 서버 개발

## 사용 시기
- "MCP 서버", "MCP 도구", "JSON-RPC" 관련 개발 요청 시

## MCP 프로토콜 핵심

- **JSON-RPC 2.0** 기반 통신
- `initialize` → `tools/list` → `tools/call` 순서
- 도구 정의: `name`, `description`, `inputSchema` (JSON Schema)

## 도구 설계 원칙

1. **단일 책임** — 하나의 도구는 하나의 명확한 작업 수행
2. **명확한 스키마** — required/optional 파라미터 구분, description 필수
3. **에러 처리** — isError 플래그로 성공/실패 구분
4. **멱등성** — 같은 입력에 같은 결과 보장 (가능한 경우)

## 설정 패턴

```json
{
  "mcpServers": {
    "서버명": {
      "type": "url",
      "url": "http://localhost:PORT/mcp"
    }
  }
}
```

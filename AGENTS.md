# Presenton Agent Guide

This repository contains **Presenton**, an AI-powered presentation generator. The project is a monorepo with a Next.js frontend and a FastAPI backend.

## 📂 Repository Structure

- `servers/nextjs/`: Frontend (Next.js 14, TypeScript, Tailwind CSS)
- `servers/fastapi/`: Backend (Python, FastAPI, SQLModel)
- `app_data/`: Persistent data (SQLite, uploaded files)
- `docker-compose.yml`: Main orchestration file

## 🛠 Build & Run Commands

### Backend (FastAPI)
- **Workdir:** `servers/fastapi`
- **Install:** `pip install -e .` (uses `pyproject.toml`)
- **Run Dev:** `python server.py --port 8000 --reload true`
- **Lint:** `ruff check .` (or `flake8` if installed)
- **Test (All):** `pytest`
- **Test (Single):** `pytest tests/test_name.py` or `pytest tests/test_name.py::test_function_name`

### Frontend (Next.js)
- **Workdir:** `servers/nextjs`
- **Install:** `npm install`
- **Run Dev:** `npm run dev` (starts on port 3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** *No unit tests currently configured.* Cypress is present in `cypress/` but no E2E tests were found.

### Docker (Full Stack)
- **Start:** `podman-compose up -d` (or `docker-compose`)
- **Logs:** `podman logs presenton_development_1 -f`

## 🧩 Code Style & Conventions

### General
- **Philosophy:** Keep It Simple, Stupid (KISS). Write minimal, functional code.
- **Comments:** Explain *why*, not *what*. Avoid chatter.
- **Paths:** Always use absolute paths in tool calls.

### Backend (Python/FastAPI)
- **Style:** PEP 8.
- **Type Hints:** Mandatory for all function arguments and return types.
- **Async/Await:** Use `async def` for I/O-bound operations (DB, API calls).
- **ORM:** SQLModel. UUIDs are stored as 32-char hex strings in SQLite (use `UUIDHex` TypeDecorator).
- **Imports:** Group standard lib, third-party, then local application imports.

### Frontend (TypeScript/Next.js)
- **Framework:** Next.js 14 (App Router).
- **Language:** TypeScript (Strict mode). Use `interface` over `type`.
- **Components:** Functional components with hooks. No class components.
- **Styling:** Tailwind CSS + shadcn/ui.
- **State:** Redux Toolkit for complex global state.
- **File Naming:** kebab-case for files (`my-component.tsx`), PascalCase for components (`MyComponent`).

## 🤖 Agent Interaction Rules (from .github/copilot-instructions.md)

- **Persona:** Expert software developer & AI architect.
- **Approach:** 
  - Don't just give answers; push for understanding.
  - Ask clarifying questions for ambiguous requirements.
  - Suggest trade-offs.
- **Output:** concise, simple, functional code.

## ⚠️ Common Pitfalls

1. **UUIDs:** SQLite stores UUIDs as hex strings. Ensure models use the custom `UUIDHex` type.
2. **Ports:** Next.js is on 3000, FastAPI on 8000. Nginx proxies both on **8080**. Puppeteer must hit port 8080.
3. **Template Editing:** Custom templates live in `app_data/fastapi.db` or `servers/nextjs/presentation-templates/`. Use provided scripts to export/import.

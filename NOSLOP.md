# noslop - Content Workflow CLI

A command-line tool for managing social media content with an interactive TUI.

## Quick Start

```bash
noslop          # Open interactive TUI
noslop init     # Initialize new project
noslop new "My Post"  # Create new draft
```

## Commands

### Core
| Command | Description |
|---------|-------------|
| `noslop` | Open interactive TUI |
| `noslop init` | Create folder structure + config files |
| `noslop help` | Show all commands |

### Content Management
| Command | Description |
|---------|-------------|
| `noslop new <title>` | Create new draft with title |
| `noslop list [--drafts|--posts]` | List content with schedule |
| `noslop status` | Summary: counts, next scheduled |
| `noslop show <id>` | Show full content of a post/draft |

### Workflow Actions
| Command | Description |
|---------|-------------|
| `noslop ready <id>` | Mark draft as ready to post |
| `noslop unready <id>` | Mark draft as in-progress |
| `noslop schedule <id> <datetime>` | Set/update scheduled time |
| `noslop delete <id>` | Delete a draft |

### X Integration
| Command | Description |
|---------|-------------|
| `noslop auth x` | Authenticate with X API |
| `noslop auth x --status` | Check authentication status |
| `noslop auth x --list` | List all authenticated accounts |
| `noslop auth x --unlink` | Remove account link from project |
| `noslop auth x --logout <name>` | Remove stored credentials |
| `noslop x post <id>` | Post draft to X immediately |

### Examples
```bash
# Full workflow
noslop new "Monday Motivation"
noslop ready monday-motivation
noslop x post monday-motivation   # Posts to X, moves to posts/
```

## Folder Structure

```
your-project/
├── CLAUDE.md      # Your brand voice & guidelines
├── NOSLOP.md      # This file (tool documentation)
├── drafts/        # Work in progress
│   └── post-name/
│       ├── x.md   # Post content
│       └── assets/ # Images, videos (optional)
└── posts/         # Published/scheduled content
    └── post-name/
        ├── x.md
        └── assets/
```

## Post File Format (x.md)

```markdown
# Post Title

## Post
\`\`\`
your post content here
lowercase, brand voice, etc.
\`\`\`

## Status
draft | ready

## Media
Description of media to create/attach

## Scheduled
2026-01-27 09:00

## Posted
2026-01-27 09:00

## Published
https://x.com/user/status/123
```

## TUI Keyboard Shortcuts

| Key | Drafts Tab | Posts Tab |
|-----|------------|-----------|
| `Tab` | Switch to Posts | Switch to Drafts |
| `↑/↓` | Navigate items | Navigate items |
| `Enter` | Toggle ready/draft | Add URL |
| `Space` | Move to Posts | — |
| `Backspace` | Delete (drafts only) | — |
| `s` | Toggle schedule view | Toggle schedule view |
| `←/→` | Navigate weeks | Navigate weeks |
| `q` | Quit | Quit |

## Working with AI Assistants

This project is designed to work with Claude Code and other AI assistants:

1. **Use CLI commands** instead of manual file editing
2. **CLAUDE.md** contains your brand voice and guidelines
3. **NOSLOP.md** (this file) documents all available commands

The AI should use commands like `noslop new`, `noslop ready`, `noslop x post`
instead of directly creating/moving files.

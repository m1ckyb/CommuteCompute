
## Version Reference Fixes (2026-02-02 00:25 UTC)

### Changes Applied
| File | Line | Old | New | Notes |
|------|------|-----|-----|-------|
| `src/services/ccdash-renderer.js` | 299-2542 | V10 Spec | V12 Spec | Updated 31 spec section references |
| `src/services/ccdash-renderer.js` | 2542 | ZONES_V10 | ZONES_V12 | Primary export renamed |
| `src/services/ccdash-renderer.js` | 2543 | (none) | ZONES_V10 | Added backward-compat alias |

### Previously Fixed (not requiring action)
- `README.md:15` — Already shows V3.0.0 ✓
- `firmware/README.md:5` — Shows correct version (6.1-60s) ✓

## Version Reference Fixes (2026-02-02 00:25 UTC)

### Changes Applied
| File | Line | Old | New | Notes |
|------|------|-----|-----|-------|
| `src/services/ccdash-renderer.js` | 299-2542 | V10 Spec | V12 Spec | Updated 31 spec section references |
| `src/services/ccdash-renderer.js` | 2542 | ZONES_V10 | ZONES_V12 | Primary export renamed |
| `src/services/ccdash-renderer.js` | 2543 | (none) | ZONES_V10 | Added backward-compat alias |

### Previously Fixed (not requiring action)
- `README.md:15` — Already shows V3.0.0 ✓
- `firmware/README.md:5` — Shows correct version (6.1-60s) ✓

## README.md Compliance Update (2026-02-02 00:30 UTC)

### Version Reference Fixes
| Line | Old | New |
|------|-----|-----|
| 35 | 20-second partial refresh | 60-second partial refresh |
| 237 | CCDash™ V11 | CCDash™ V12 |
| 381 | CCDashDesignV10 spec | CCDashDesignV12 spec |
| 385 | 20-second refresh | 60-second refresh |

### New Sections Added
- **📁 Directory Structure** — Full project tree per Section 4 architecture
- **🔄 Data Flow** — Diagram from DEVELOPMENT-RULES.md Section 4.3
- **Architecture Boundaries** — Table from Section 4.2
- **Cache TTLs** — Per Section 11 API rules

### Source References
- DEVELOPMENT-RULES.md Section 3.1 (Zero-Config)
- DEVELOPMENT-RULES.md Section 4.1-4.5 (Architecture)
- DEVELOPMENT-RULES.md Section 19 (60s Refresh)

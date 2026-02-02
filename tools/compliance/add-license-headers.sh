#!/bin/bash
# ============================================================================
# ADD LICENSE HEADERS SCRIPT
# CommuteCompute Repository
# ============================================================================
#
# Adds AGPL-3.0 license headers to all source files missing them.
#
# Usage:
#   ./add-license-headers.sh [path] [--dry-run]
#
# ============================================================================

set -euo pipefail

REPO_PATH="${1:-.}"
DRY_RUN=false

for arg in "$@"; do
    [[ "$arg" == "--dry-run" ]] && DRY_RUN=true
done

# Configuration
COPYRIGHT_HOLDER="Angus Bergman"
COPYRIGHT_YEARS="2025-2026"
PROJECT_NAME="CommuteCompute"
PROJECT_DESC="Smart Transit Display for Australian Public Transport"
SPDX_ID="AGPL-3.0-or-later"

# Counters
ADDED=0
SKIPPED=0
ERRORS=0

# Header templates (using heredocs)
JS_HEADER="/**
 * ${PROJECT_NAME}™
 * ${PROJECT_DESC}
 *
 * Copyright © ${COPYRIGHT_YEARS} ${COPYRIGHT_HOLDER}
 *
 * This file is part of ${PROJECT_NAME}.
 *
 * ${PROJECT_NAME} is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ${PROJECT_NAME} is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with ${PROJECT_NAME}. If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: ${SPDX_ID}
 */

"

PY_HEADER="\"\"\"
${PROJECT_NAME}™
${PROJECT_DESC}

Copyright © ${COPYRIGHT_YEARS} ${COPYRIGHT_HOLDER}

This file is part of ${PROJECT_NAME}, licensed under AGPL-3.0-or-later.
See LICENCE file for details.

SPDX-License-Identifier: ${SPDX_ID}
\"\"\"

"

SH_HEADER="#!/bin/bash
# ${PROJECT_NAME}™ - ${PROJECT_DESC}
# Copyright © ${COPYRIGHT_YEARS} ${COPYRIGHT_HOLDER}
# SPDX-License-Identifier: ${SPDX_ID}
# Licensed under AGPL-3.0-or-later. See LICENCE file.

"

C_HEADER="/**
 * ${PROJECT_NAME}™ - ${PROJECT_DESC}
 * Copyright © ${COPYRIGHT_YEARS} ${COPYRIGHT_HOLDER}
 * SPDX-License-Identifier: ${SPDX_ID}
 */

"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  ADD LICENSE HEADERS - ${PROJECT_NAME}                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Repository: $REPO_PATH"
$DRY_RUN && echo "Mode: DRY RUN (no changes will be made)"
echo ""

# Check if file has header
has_header() {
    local file="$1"
    head -30 "$file" 2>/dev/null | grep -qi "agpl\|gnu affero\|spdx-license-identifier"
}

# Add header to file
add_header() {
    local file="$1"
    local header="$2"
    local ext="${file##*.}"
    
    if $DRY_RUN; then
        echo "  Would add header to: $file"
        ((ADDED++)) || true
        return
    fi
    
    # Create temp file
    local tmp=$(mktemp)
    
    # Handle shebang for non-shell files
    if [[ "$ext" != "sh" ]] && [[ "$ext" != "bash" ]] && head -1 "$file" | grep -q "^#!"; then
        head -1 "$file" > "$tmp"
        echo "" >> "$tmp"
        echo -n "$header" >> "$tmp"
        tail -n +2 "$file" >> "$tmp"
    elif [[ "$ext" == "sh" ]] || [[ "$ext" == "bash" ]]; then
        # Shell files - our header has shebang, remove existing
        if head -1 "$file" | grep -q "^#!"; then
            echo -n "$header" > "$tmp"
            tail -n +2 "$file" >> "$tmp"
        else
            echo -n "$header" > "$tmp"
            cat "$file" >> "$tmp"
        fi
    else
        echo -n "$header" > "$tmp"
        cat "$file" >> "$tmp"
    fi
    
    mv "$tmp" "$file"
    echo "  ✓ Added header: $file"
    ((ADDED++)) || true
}

# Process files
process_file() {
    local file="$1"
    local ext="${file##*.}"
    
    # Skip if has header
    if has_header "$file"; then
        ((SKIPPED++)) || true
        return
    fi
    
    # Get appropriate header
    local header=""
    case "$ext" in
        js|ts|jsx|tsx|mjs|css|scss)
            header="$JS_HEADER"
            ;;
        py)
            header="$PY_HEADER"
            ;;
        sh|bash)
            header="$SH_HEADER"
            ;;
        c|cpp|h|hpp|ino)
            header="$C_HEADER"
            ;;
        *)
            return
            ;;
    esac
    
    add_header "$file" "$header"
}

# Find and process files
echo "Scanning for source files without headers..."
echo ""

while IFS= read -r file; do
    [[ -f "$file" ]] && process_file "$file"
done < <(find "$REPO_PATH" -type f \( \
    -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.mjs" \
    -o -name "*.py" \
    -o -name "*.sh" -o -name "*.bash" \
    -o -name "*.c" -o -name "*.cpp" -o -name "*.h" -o -name "*.hpp" -o -name "*.ino" \
    -o -name "*.css" -o -name "*.scss" \
    \) ! -path "*node_modules*" ! -path "*.git*" 2>/dev/null)

# Summary
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "SUMMARY"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  Headers added:  $ADDED"
echo "  Already OK:     $SKIPPED"
echo "  Errors:         $ERRORS"
echo ""

if $DRY_RUN; then
    echo "This was a dry run. Run without --dry-run to apply changes."
else
    echo "Done! Run licensing-audit.sh to verify."
fi

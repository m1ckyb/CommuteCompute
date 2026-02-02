#!/bin/bash
# CommuteCompute™ - Smart Transit Display for Australian Public Transport
# Copyright © 2025-2026 Angus Bergman
# SPDX-License-Identifier: AGPL-3.0-or-later
# Licensed under AGPL-3.0-or-later. See LICENCE file.

# Quick launcher for serial monitor
# Usage: ./monitor.sh [port]

cd "$(dirname "$0")"

if [ -n "$1" ]; then
    python3 tools/serial_monitor.py -p "$1"
else
    python3 tools/serial_monitor.py
fi

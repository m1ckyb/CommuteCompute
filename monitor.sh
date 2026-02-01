#!/bin/bash
# Quick launcher for serial monitor
# Usage: ./monitor.sh [port]

cd "$(dirname "$0")"

if [ -n "$1" ]; then
    python3 tools/serial_monitor.py -p "$1"
else
    python3 tools/serial_monitor.py
fi

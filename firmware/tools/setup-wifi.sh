#!/bin/bash
# CommuteCompute™ - Smart Transit Display for Australian Public Transport
# Copyright © 2025-2026 Angus Bergman
# SPDX-License-Identifier: AGPL-3.0-or-later
# Licensed under AGPL-3.0-or-later. See LICENCE file.

# WiFi Setup Helper for Commute Compute

echo "=========================================="
echo "Commute Compute WiFi Setup"
echo "=========================================="
echo ""
echo "INSTRUCTIONS:"
echo "1. Connect to WiFi network: Commute Compute-Setup"
echo "2. Open browser to: http://192.168.4.1"
echo "3. Select your home WiFi and enter password"
echo ""
echo "The device should show in serial:"
echo "  ✓ WiFi OK - IP: 192.168.x.x"
echo ""
echo "Once connected, the device will:"
echo "  1. Register with server automatically"
echo "  2. Get a Device ID (friendly_id)"
echo "  3. Draw the unified setup screen"
echo ""
echo "Then visit: https://your-server.vercel.app/admin"
echo ""
echo "Press Ctrl+C to exit"
echo ""
echo "Monitoring device for WiFi connection..."
echo "=========================================="
echo ""

python3 - <<'PYTHON'
import serial
import time
import sys

try:
    ser = serial.Serial('/dev/cu.usbmodem14101', 115200, timeout=1)

    while True:
        if ser.in_waiting > 0:
            line = ser.readline()
            try:
                decoded = line.decode('utf-8', errors='ignore').strip()
                if decoded:
                    timestamp = time.strftime('%H:%M:%S')
                    print(f'[{timestamp}] {decoded}')

                    if 'WiFi OK' in decoded:
                        print('\n' + '='*60)
                        print('✅ WiFi Connected Successfully!')
                        print('='*60)
                        print('Device will now register with server...')
                        print('')

                    if 'Registered as' in decoded:
                        device_id = decoded.split(':')[-1].strip()
                        print('\n' + '='*60)
                        print(f'✅ Device Registered!')
                        print(f'Device ID: {device_id}')
                        print('='*60)
                        print('')
                        print('Next step:')
                        print('  Visit: https://your-server.vercel.app/admin')
                        print(f'  Enter Device ID: {device_id}')
                        print('')

            except:
                pass
        time.sleep(0.05)

except KeyboardInterrupt:
    print('\n\nSetup helper stopped')
except Exception as e:
    print(f'Error: {e}')
finally:
    try:
        ser.close()
    except:
        pass
PYTHON

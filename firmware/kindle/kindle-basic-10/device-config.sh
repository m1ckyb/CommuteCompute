#!/bin/bash
# CommuteCompute™ - Smart Transit Display for Australian Public Transport
# Copyright © 2025-2026 Angus Bergman
# SPDX-License-Identifier: AGPL-3.0-or-later
# Licensed under AGPL-3.0-or-later. See LICENCE file.

# Kindle Basic (10th gen) - Device Configuration
# Commute Compute Firmware v2.0
# Copyright (c) 2026 Angus Bergman - CC BY-NC 4.0

# Device identification
export DEVICE_MODEL="kindle-basic-10"
export DEVICE_RESOLUTION="600x800"
export DEVICE_PPI="167"
export DEVICE_ORIENTATION="portrait"

# API endpoint parameters (matches server /api/livedash)
export DEVICE_API_PARAM="device=kindle-basic-10"

# Display settings
export CC_FULL_REFRESH_INTERVAL=10  # More frequent full refresh for lower PPI

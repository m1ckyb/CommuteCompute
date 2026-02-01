/**
 * CommuteCompute System™
 * Smart Transit Display for Australian Public Transport
 *
 * Copyright © 2025-2026 Angus Bergman
 *
 * This file is part of CommuteCompute.
 *
 * CommuteCompute is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CommuteCompute is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CommuteCompute. If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Test node-fetch with KeyId header to verify it works the same as curl
 */

import fetch from 'node-fetch';
import 'dotenv/config';

const API_KEY = process.env.ODATA_API_KEY;
const URL = 'https://api.opendata.transport.vic.gov.au/opendata/public-transport/gtfs/realtime/v1/metro/trip-updates';

console.log('Testing node-fetch with KeyId header...');
console.log(`API Key: ${API_KEY?.substring(0, 8)}...`);
console.log(`URL: ${URL}\n`);

try {
  const response = await fetch(URL, {
    headers: {
      'KeyId': API_KEY,
      'Accept': '*/*'
    }
  });

  console.log(`Status: ${response.status} ${response.statusText}`);
  console.log(`Content-Type: ${response.headers.get('content-type')}`);

  if (response.ok) {
    const buffer = await response.arrayBuffer();
    console.log(`✅ SUCCESS! Received ${buffer.byteLength} bytes of data`);
  } else {
    const text = await response.text();
    console.log(`❌ Error: ${text.substring(0, 200)}`);
  }
} catch (error) {
  console.log(`❌ Exception: ${error.message}`);
}

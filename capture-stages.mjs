/**
 * CommuteCompute™
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

import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const outDir = './docs/screenshots/setup-flow';
await mkdir(outDir, { recursive: true });

console.log('Launching browser...');
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1000, height: 900 });

const htmlPath = `file://${process.cwd()}/tools/setup-flow-simulator/index.html`;
console.log('Loading:', htmlPath);
await page.goto(htmlPath);
await page.waitForSelector('.screen');

const stages = ['01-flash', '02-wifi', '03-register', '04-config', '05-dashboard'];

for (let i = 0; i < 5; i++) {
  if (i > 0) {
    await page.click('.btn-p');
    await new Promise(r => setTimeout(r, 500));
  }
  const path = join(outDir, `${stages[i]}.png`);
  await page.screenshot({ path });
  console.log('Captured:', stages[i] + '.png');
}

await browser.close();
console.log('Done! Screenshots in:', outDir);

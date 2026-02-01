/**
 * CommuteCompute System™ - CCFirm™ Firmware
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
 * PTV-TRMNL v5.28 - Image Fetch Firmware
 * Fetches pre-rendered BMP from server and displays it.
 */

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <WiFiManager.h>
#include <bb_epaper.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "../include/config.h"

#define SCREEN_W 800
#define SCREEN_H 480
#define BMP_SIZE 50000

BBEPAPER bbep(EP75_800x480);
uint8_t* bmpBuffer = nullptr;
bool wifiOK = false;
unsigned long lastRefresh = 0;

void setup() {
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
    Serial.begin(115200);
    delay(500);
    Serial.println("\n=== PTV-TRMNL v5.28 Image Mode ===");
    
    bmpBuffer = (uint8_t*)malloc(BMP_SIZE);
    if (!bmpBuffer) Serial.println("ERROR: No memory");
    
    bbep.initIO(EPD_DC_PIN, EPD_RST_PIN, EPD_BUSY_PIN, EPD_CS_PIN, EPD_MOSI_PIN, EPD_SCK_PIN, 8000000);
    bbep.setPanelType(EP75_800x480);
    bbep.setRotation(0);
    bbep.allocBuffer(false);
    pinMode(PIN_INTERRUPT, INPUT_PULLUP);
    
    bbep.fillScreen(BBEP_WHITE);
    bbep.setFont(FONT_8x8);
    bbep.setTextColor(BBEP_BLACK, BBEP_WHITE);
    bbep.setCursor(300, 220);
    bbep.print("PTV-TRMNL v5.28");
    bbep.setCursor(280, 250);
    bbep.print("Image Mode - Connecting...");
    bbep.refresh(REFRESH_FULL, true);
    
    WiFiManager wm;
    wm.setConfigPortalTimeout(180);
    wifiOK = wm.autoConnect("PTV-TRMNL-Setup");
    Serial.println(wifiOK ? "WiFi OK" : "WiFi FAIL");
}

void loop() {
    if (!wifiOK || WiFi.status() != WL_CONNECTED) {
        delay(5000);
        return;
    }
    
    if (millis() - lastRefresh < 60000 && lastRefresh > 0) {
        delay(1000);
        return;
    }
    lastRefresh = millis();
    
    Serial.printf("\n=== Fetching image (heap: %d) ===\n", ESP.getFreeHeap());
    
    WiFiClientSecure* client = new WiFiClientSecure();
    if (!client) return;
    client->setInsecure();
    
    HTTPClient http;
    String url = String(SERVER_URL) + "/api/image";
    Serial.println(url);
    
    http.setTimeout(30000);
    if (!http.begin(*client, url)) { delete client; return; }
    
    http.addHeader("Accept", "image/bmp");
    int code = http.GET();
    
    if (code != 200) {
        Serial.printf("HTTP %d\n", code);
        http.end(); delete client; return;
    }
    
    int len = http.getSize();
    Serial.printf("Size: %d\n", len);
    
    if (len <= 0 || len > BMP_SIZE) {
        http.end(); delete client; return;
    }
    
    WiFiClient* stream = http.getStreamPtr();
    int got = 0;
    while (http.connected() && got < len) {
        size_t avail = stream->available();
        if (avail) got += stream->readBytes(bmpBuffer + got, min((int)avail, len - got));
        yield();
    }
    http.end(); delete client;
    
    Serial.printf("Got %d bytes\n", got);
    
    if (got < 54 || bmpBuffer[0] != 'B' || bmpBuffer[1] != 'M') {
        Serial.println("Invalid BMP");
        return;
    }
    
    Serial.println("Displaying...");
    bbep.fillScreen(BBEP_WHITE);
    int r = bbep.loadBMP(bmpBuffer, 0, 0, BBEP_BLACK, BBEP_WHITE);
    if (r != BBEP_SUCCESS) Serial.printf("loadBMP err: %d\n", r);
    
    bbep.refresh(REFRESH_FULL, true);
    Serial.println("Done!");
}

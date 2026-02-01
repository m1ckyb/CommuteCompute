/**
 * Font rendering test - following ESP32-C3 dev rules
 * - NO allocBuffer()
 * - Use bit-bang mode (speed=0)
 * - Use FONT_8x8 only
 */

#include <Arduino.h>
#include <bb_epaper.h>
#include "../include/config.h"

BBEPAPER* bbep = nullptr;

void setup() {
    Serial.begin(115200);
    delay(2000);
    Serial.println("\n=== Font Test (ESP32-C3 Rules) ===");
    Serial.printf("Free heap: %d\n", ESP.getFreeHeap());

    // Create display object
    Serial.println("[1] Creating BBEPAPER...");
    bbep = new BBEPAPER(EP75_800x480);
    if (!bbep) {
        Serial.println("FAILED to create bbep!");
        return;
    }

    // Init IO with bit-bang mode (speed=0) - required for ESP32-C3
    Serial.println("[2] initIO (bit-bang mode)...");
    bbep->initIO(EPD_DC_PIN, EPD_RST_PIN, EPD_BUSY_PIN, EPD_CS_PIN, EPD_MOSI_PIN, EPD_SCK_PIN, 0);

    // Set panel
    Serial.println("[3] setPanelType...");
    bbep->setPanelType(EP75_800x480);

    // Set rotation
    Serial.println("[4] setRotation...");
    bbep->setRotation(0);

    // DO NOT call allocBuffer() - it breaks ESP32-C3!
    Serial.println("[5] Skipping allocBuffer (breaks ESP32-C3)");
    Serial.printf("Free heap: %d\n", ESP.getFreeHeap());

    // Fill screen
    Serial.println("[6] fillScreen...");
    bbep->fillScreen(BBEP_WHITE);
    Serial.println("fillScreen OK");

    // Draw rectangle
    Serial.println("[7] drawRect...");
    bbep->drawRect(10, 10, 100, 50, BBEP_BLACK);
    Serial.println("drawRect OK");

    // Font operations - use FONT_8x8 only!
    Serial.println("[8] setFont(FONT_8x8)...");
    bbep->setFont(FONT_8x8);
    Serial.println("setFont OK");

    Serial.println("[9] setTextColor...");
    bbep->setTextColor(BBEP_BLACK, BBEP_WHITE);
    Serial.println("setTextColor OK");

    Serial.println("[10] setCursor...");
    bbep->setCursor(100, 100);
    Serial.println("setCursor OK");

    Serial.println("[11] print('A')...");
    bbep->print('A');
    Serial.println("print('A') OK!");

    Serial.println("[12] print(\"Hello\")...");
    bbep->print("Hello");
    Serial.println("print(Hello) OK!");

    // Larger text for visibility
    Serial.println("[13] Drawing test pattern...");
    bbep->setCursor(200, 200);
    bbep->print("FONT TEST OK");
    bbep->drawRect(190, 190, 200, 40, BBEP_BLACK);
    Serial.println("Test pattern OK");

    Serial.println("[14] refresh...");
    bbep->refresh(REFRESH_FULL, true);
    Serial.println("=== ALL TESTS PASSED ===");
    Serial.println("Display should show 'FONT TEST OK' with rectangles");
}

void loop() {
    delay(10000);
}

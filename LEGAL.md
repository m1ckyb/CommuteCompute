# Commute Compute System — Legal & Intellectual Property

**Document Version:** 1.5  
**Last Updated:** 2026-02-01  
**Owner:** Angus Bergman

---

## Intellectual Property Statement

All intellectual property rights in the Commute Compute System, including but not limited to software, documentation, designs, logos, and brand assets, are owned by **Angus Bergman**.

---

## Trademarks

The following are **unregistered trademarks (™)** owned by **Angus Bergman**:

| Mark | Type | Owner | Copyright |
|------|------|-------|-----------|
| **Commute Compute™** | Word Mark | Angus Bergman | © 2026 Angus Bergman |
| **Commute Compute System™** | Word Mark | Angus Bergman | © 2026 Angus Bergman |
| **SmartCommute™** | Word Mark | Angus Bergman | © 2026 Angus Bergman |
| **CCDash™** | Word Mark | Angus Bergman | © 2026 Angus Bergman |
| **CC LiveDash™** | Word Mark | Angus Bergman | © 2026 Angus Bergman |
| **CCFirm™** | Word Mark | Angus Bergman | © 2026 Angus Bergman |
| **CC Logo** | Design Mark | Angus Bergman | © 2026 Angus Bergman |

### Ownership Statement

All trademarks, service marks, trade names, logos, and designs listed above are the exclusive intellectual property of **Angus Bergman**. All associated copyrights, including but not limited to source code, documentation, specifications, and brand assets relating to each trademark, are owned by Angus Bergman.

### License Disclaimer

**NOTICE:** Use of the Commute Compute System™ and all associated trademarks, software, documentation, and intellectual property is granted solely pursuant to the terms of the **AGPL v3 (GNU Affero General Public Licence v3.0)** license, unless otherwise expressly agreed in writing by the copyright owner.

By using, copying, modifying, or distributing any part of this system, you acknowledge and agree that:

1. Your use is subject to either AGPL v3 (open source) or a commercial licence
2. No ownership or proprietary rights are transferred to you
3. Commercial use requires a commercial licence (contact commutecompute.licensing@gmail.com)
4. All trademark rights remain exclusively with Angus Bergman
5. Attribution must be maintained in all copies and derivative works

**No implied license** is granted under any trademark, patent, or other intellectual property right of Angus Bergman, except as expressly set forth in the applicable license.

For commercial licensing inquiries, contact the copyright owner.

### Third-Party Content Exclusion

**IMPORTANT:** The copyright claims of Angus Bergman apply exclusively to original work created for the Commute Compute System™. The following third-party content is expressly **excluded** from these copyright claims and remains the intellectual property of their respective owners:

| Source | Copyright Owner | License |
|--------|-----------------|---------|
| Transit Data | Transport Victoria / State of Victoria | CC BY 4.0 |
| Weather Data | Bureau of Meteorology / Commonwealth of Australia | CC BY 3.0 AU |
| Geocoding Data | OpenStreetMap Contributors | ODbL |
| Node.js Dependencies | Various Authors | MIT, Apache, ISC, etc. |
| ESP-IDF / Arduino | Espressif Systems | Apache 2.0 |
| PlatformIO Libraries | Various Authors | As specified per library |

These third-party components are incorporated under their respective licenses and are not claimed as original work of Angus Bergman. Users must comply with the attribution and license requirements of each third-party source independently.

**Attribution Requirements for Third-Party Data:**

When using or displaying data from the Commute Compute System™, the following attributions must be maintained:

1. "Transit data from Transport Victoria OpenData, licensed under CC BY 4.0"
2. "Weather data © Commonwealth of Australia, Bureau of Meteorology"
3. "Map data © OpenStreetMap contributors, licensed under ODbL"

Removal or alteration of third-party attributions is prohibited.

### Firmware Naming Convention

All custom firmware uses the **CCFirm** prefix:

| Firmware Name | Target Device |
|---------------|---------------|
| CCFirmTRMNL | TRMNL e-ink display |
| CCFirmKindle | Jailbroken Kindle devices |
| CCFirmWaveshare | Waveshare e-ink displays |
| CCFirmESP32 | Generic ESP32 e-ink setups |

### Trademark Usage Guidelines

1. Always use ™ symbol on first reference in documents
2. Do not alter, abbreviate, or modify trademark names
3. Use proper capitalization (SmartCommute, not smartcommute)
4. Third parties must obtain written permission for trademark use

---

## Copyright

```
Copyright (c) 2026 Angus Bergman
All Rights Reserved
```

### Licensed Components

The following components are licensed under **AGPL v3** (GNU Affero General Public Licence v3.0):

- Source code
- Documentation
- Design specifications
- Brand guidelines (for reference only)

**License URL:** See LICENCE for full terms

### What AGPL v3 Permits (Open Source Option)

✅ Share — copy and redistribute in any medium or format  
✅ Adapt — remix, transform, and build upon the material  
✅ Attribution — must give appropriate credit  

### What Requires a Commercial Licence

❌ Closed-source commercial use without a commercial licence  
❌ Removing or altering copyright notices  
❌ Implying endorsement by the licensor  

---

## Third-Party Components

The Commute Compute System incorporates third-party components with their own licenses:

| Component | License | Usage |
|-----------|---------|-------|
| Transport Victoria OpenData | CC BY 4.0 | Transit data |
| Bureau of Meteorology | CC BY 3.0 AU | Weather data |
| OpenStreetMap | ODbL | Geocoding |
| Node.js dependencies | Various (MIT, Apache, etc.) | Runtime libraries |

Third-party libraries retain their original licenses.

---

## Data Attribution Requirements

When displaying data from external sources, the following attributions are required:

1. **Transit Data:** "Data from Transport Victoria OpenData (CC BY 4.0)"
2. **Weather Data:** "Weather data © Bureau of Meteorology"
3. **Map Data:** "© OpenStreetMap contributors"

---

## File Attribution Audit

**Last Audit:** 2026-02-01  
**Files with Copyright Headers:** 110+  
**Compliance Status:** ✅ Complete

### Trademark Family File Registry

All source files contain appropriate trademark attribution in their headers:

| Trademark | Files | Key Components |
|-----------|-------|----------------|
| **SmartCommute™** | 9 | `smart-commute.js`, `smart-journey-engine.js`, `smart-route-recommender.js`, `journey-planner.js`, `opendata-client.js`, `coffee-decision.js` |
| **CCDash™** | 5 | `ccdash-renderer.js`, `zones.js`, `dashboard_template.cpp`, `journey-display/` module |
| **CC LiveDash™** | 2 | `livedash.js`, `api/livedash.js` |
| **CCFirm™** | 7 | `main.cpp`, `main-tiered.cpp`, `main-minimal.cpp`, and all firmware variants |

### Standard File Header Format

All original source files MUST include:

```
/**
 * [Component Name] — [Description]
 * Part of the Commute Compute System™
 * 
 * [Additional description if needed]
 * 
 * Copyright (c) 2026 Angus Bergman
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * See LICENCE for full terms
 */
```

### Third-Party Code Exclusions

The following files/directories contain third-party code and are **excluded** from copyright claims:

| Path | Content | License |
|------|---------|---------|
| `node_modules/` | npm dependencies | Various (MIT, Apache, ISC, etc.) |
| `firmware/.pio/libdeps/` | PlatformIO libraries | Various (MIT, Apache, etc.) |
| `firmware/src/base64.hpp` | Base64 encoding | MIT |

### Firmware Third-Party Attribution

CCFirm™ firmware files include explicit third-party attribution in headers:

```cpp
/**
 * THIRD-PARTY COMPONENTS (excluded from copyright claim):
 * - Arduino/ESP-IDF: Apache 2.0 (Espressif Systems)
 * - bb_epaper: MIT License (Larry Bank)
 * - base64: MIT License
 */
```

---

## Contact

For licensing inquiries, trademark permissions, or legal questions:

**Angus Bergman**  
GitHub: [@angusbergman17-cpu](https://github.com/angusbergman17-cpu)

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.5 | 2026-02-01 | Comprehensive license compliance audit (110+ files updated) |
| 1.4 | 2026-02-01 | AGPL v3 + Commercial dual-licence transition |
| 1.3 | 2026-02-01 | Added Metro Tunnel third-party reference disclaimer |
| 1.2 | 2026-02-01 | Public release compliance update |
| 1.1 | 2026-01-31 | Added File Attribution Audit section, Trademark Family File Registry, third-party exclusions documentation |
| 1.0 | 2026-01-30 | Initial IP documentation |

---

*This document is part of the Commute Compute System™ by Angus Bergman*

---

## Third-Party References Disclaimer

### Metro Tunnel Reference

The Commute Compute System™ references "Metro Tunnel" compatibility. This is a **descriptive reference** under nominative fair use.

**Disclaimer:** "Metro Tunnel" is a Victorian Government infrastructure project managed by Rail Projects Victoria. Commute Compute System™ is an **independent project** and is **not affiliated with, endorsed by, or sponsored by** Rail Projects Victoria, Metro Trains Melbourne, the Victorian Government, or any related entity.

The Metro Tunnel reference indicates technical compatibility with the new transit network configuration and station data — not any official partnership or endorsement.

| Reference | Owner | Usage Type |
|-----------|-------|------------|
| Metro Tunnel | Rail Projects Victoria / State of Victoria | Descriptive (nominative fair use) |
| Metro Trains Melbourne | Metro Trains Melbourne Pty Ltd | Not used |
| PTV | Public Transport Victoria | Data source attribution only |


#!/usr/bin/env python3
"""
MARKDOWN DOCUMENT ACCURACY AUDITOR
CommuteCompute Repository
Version: 1.0.0
"""
import os, sys, re, json, argparse, difflib, hashlib
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Set, Any
from enum import Enum
from collections import defaultdict

class Config:
    CODE_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.py', '.c', '.cpp', '.h', '.ino', '.sh'}
    CONFIG_EXTENSIONS = {'.json', '.yaml', '.yml', '.toml', '.env'}
    DOC_EXTENSIONS = {'.md', '.txt', '.html'}
    ALL_EXTENSIONS = CODE_EXTENSIONS | CONFIG_EXTENSIONS | DOC_EXTENSIONS
    SKIP_DIRS = {'node_modules', '.git', '__pycache__', 'dist', 'build', '.next', 'coverage'}
    SIMILARITY_THRESHOLD = 0.6
    MIN_CONSOLIDATION_SIZE = 50

class Severity(Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"
    INFO = "INFO"

class IssueType(Enum):
    VERSION_MISMATCH = "Version Mismatch"
    FILE_NOT_FOUND = "File Not Found"
    CODE_MISMATCH = "Code Mismatch"
    OUTDATED_INFO = "Outdated Information"
    BROKEN_LINK = "Broken Link"
    DIAGRAM_INACCURACY = "Diagram Inaccuracy"
    REDUNDANT_CONTENT = "Redundant Content"
    MISSING_INFO = "Missing Information"
    TYPO = "Potential Typo"
    CONSOLIDATION = "Consolidation Opportunity"

#!/bin/bash
# Pre-commit hook to prevent accidental secret commits
# Install: cp scripts/pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

echo "Checking for potential secrets..."

FOUND=0

# Check for Google API keys
if git diff --cached --diff-filter=ACMR | grep -E 'AIza[0-9A-Za-z_-]{35}' | grep -v 'example\|placeholder\|XXX' > /dev/null 2>&1; then
  echo "Potential Google API key found!"
  FOUND=1
fi

# Check for AWS keys
if git diff --cached --diff-filter=ACMR | grep -E 'AKIA[0-9A-Z]{16}' > /dev/null 2>&1; then
  echo "Potential AWS key found!"
  FOUND=1
fi

# Check for hardcoded passwords
if git diff --cached --diff-filter=ACMR | grep -iE 'password\s*=\s*["'\''][^"'\'']{8,}' | grep -v 'example\|placeholder\|your_' > /dev/null 2>&1; then
  echo "Potential hardcoded password found!"
  FOUND=1
fi

if [ $FOUND -eq 1 ]; then
  echo ""
  echo "COMMIT BLOCKED: Potential secrets detected!"
  echo "Use 'git commit --no-verify' to bypass if false positive."
  exit 1
fi

echo "No secrets detected"
exit 0

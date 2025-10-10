# Workflow Changes - Release Automation Fix

## Problem

The `update-prettier-and-release.yml` workflow was not cutting releases properly because:

1. **Used Prettier versions for tags**: Created tags like `v3.6.2` (Prettier version) instead of `v1.0.x` (repo version)
2. **Only released on Prettier updates**: No mechanism to release repository changes independently
3. **Version confusion**: Manual tags (v1.0.0, v1.0.1, v1.0.2) conflicted with workflow tags (v3.6.2)

## Solution

Modified the workflow to use **repository semantic versioning** independently of Prettier versions:

### Key Changes

1. **Track repository version in package.json**
   - Added `repo_version` output to read from `package.json`
   - Uses the `version` field as source of truth

2. **Auto-increment patch version**
   - New step: "Calculate new version"
   - Bumps patch version when Prettier updates (e.g., 1.0.2 → 1.0.3)

3. **Update both versions in package.json**
   - Updates Prettier version in devDependencies
   - Updates repository version field
   - Single atomic update using `jq`

4. **Use repository version for tags**
   - Creates tags like `v1.0.3` instead of `v3.6.2`
   - Release notes reference Prettier version: "Updated Prettier to v3.7.0"

## How It Works

### Workflow Flow

```
Daily at 07:17 UTC or manual trigger
  ↓
Check current Prettier vs latest
  ↓
If up-to-date → Exit (no release)
  ↓
If update available:
  1. Read current repo version from package.json (e.g., 1.0.2)
  2. Calculate new version (e.g., 1.0.3)
  3. Update package.json:
     - prettier: 3.6.2 → 3.7.0
     - version: 1.0.2 → 1.0.3
  4. Update .pre-commit-hooks.yaml
  5. Update README.md
  6. Commit: "chore: update Prettier to v3.7.0"
  7. Create tag: v1.0.3
  8. Push to main
  9. Create GitHub Release: v1.0.3
```

### Example Scenario

**Before:**
- package.json version: 1.0.2
- Prettier: 3.6.2
- Latest Prettier: 3.7.0

**After workflow runs:**
- package.json version: 1.0.3
- Prettier: 3.7.0
- New tag: v1.0.3
- New release: "v1.0.3 - Updated Prettier to v3.7.0"

## Testing

### Manual Testing

Since Prettier is currently at 3.6.2 (up-to-date), you can:

1. **Wait for next Prettier release**: The workflow will automatically trigger daily
2. **Manually trigger**: Go to Actions → Update Prettier and Release → Run workflow
3. **Mock test** (local): See test scripts in `/tmp/test_*.sh` created during development

### Validation Tests Performed

✅ YAML syntax validation  
✅ Version parsing (1.0.0 → 1.0.1, 1.0.9 → 1.0.10, 2.5.99 → 2.5.100)  
✅ package.json update with jq  
✅ Full workflow simulation  

## Cleanup Required

⚠️ **Manual action needed**: Delete the old `v3.6.2` tag

1. Go to: https://github.com/will-rice/prettier-pre-commit/tags
2. Find and delete tag `v3.6.2`
3. If a release exists for it, delete that too

This prevents confusion between old Prettier-versioned tags and new repository-versioned tags.

## Future Enhancements

Consider these improvements:

1. **Configurable version bump**: Allow major/minor bumps via workflow input
2. **Manual releases**: Add a separate workflow for releasing non-Prettier changes
3. **Changelog generation**: Auto-generate CHANGELOG.md from commits
4. **Pre-release tags**: Support alpha/beta releases

## Files Modified

- `.github/workflows/update-prettier-and-release.yml` - Main workflow changes
- `package.json` - Set version to 1.0.2 (matching latest manual release)

## Backwards Compatibility

- ✅ Existing workflow triggers (schedule, workflow_dispatch) unchanged
- ✅ Environment variables unchanged
- ✅ Permissions unchanged
- ✅ File update logic preserved (README, .pre-commit-hooks.yaml)
- ⚠️ Tag naming changed from `v{prettier_version}` to `v{repo_version}`

## References

- Original workflow: Used Prettier version as tag
- New workflow: Uses repository semantic version as tag
- Versioning strategy: Patch bump on Prettier updates

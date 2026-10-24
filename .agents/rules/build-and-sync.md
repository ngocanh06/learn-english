# Project Workflow Rules: Build & Sync

Whenever completing any coding task or modification in this repository:
1. **Always run `npm run build`**:
   - Ensure zero compilation/build errors.
   - Update the production bundle in `build/` so live and local previews stay fully synchronized.
2. **Always commit and push to remote on both branches**:
   - Push to `origin master`.
   - Merge into `main` and push to `origin main`.
   - Switch back to `master`.

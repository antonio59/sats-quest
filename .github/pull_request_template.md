## Summary

<!-- Briefly describe what changed and why. -->

## Testing

- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] Manually checked in the browser (if UI/game behaviour changed)

## Release checklist

- [ ] User-facing change? Bump `version` in `package.json` (new feature: minor; fix only: patch).
- [ ] Added a `## [x.y.z] - YYYY-MM-DD` section to the `header` in `cliff.toml` (do not edit `CHANGELOG.md` directly — it is regenerated on push to `main`).
- [ ] Updated `README.md` / docs if what users see has changed.
- [ ] Not user-facing (CI, tests, refactor only), so no version bump needed.

---
'progress-str': major
---

Pin `type-plus` to `8.0.0-beta.10`, exactly.

**Breaking: this raises the TypeScript floor for consumers to 5.6.** `type-plus` 5, 6 and
7 declared no `typescript` peer at all; 8 declares `>= 5.6.0`. `RecursivePartial` appears
in this package's published types —

```ts
declare function progressBar(options?: RecursivePartial<ProgressBarOptions>): ProgressBar
```

— so anyone type-checking against `progress-str` resolves `type-plus`'s declarations and
inherits that peer. The last published release (3.4.4) declares `type-plus: ^6.0.0`, so
the jump consumers actually see is **6 -> 8**.

`type-plus` 8 also depends on `tersify` ^4 rather than ^3, and on `unpartial` ^1.0.7,
which declares `engines: node >= 20`. This package already declares `>= 20`, so the Node
floor does not move.

The version is pinned rather than caret-ranged. `^8.0.0-beta.10` resolves to
`>=8.0.0-beta.10 <9.0.0-0`, which admits every later 8.0.0 prerelease as well as `8.0.0`
and `8.1.0` — and 8 is a prerelease line where breaking changes land between betas
(beta.10 to beta.11 changed `Equal`'s signature and removed `isType.f`). An exact version
makes each bump a reviewable PR instead of something a lockfile refresh can do silently.
Move back to a caret when 8.0.0 is stable.

No source change was needed: `RecursivePartial`, `required` and `requiredDeep` are
unchanged in 8.

`assertron` moves 11.5.2 -> 11.6.0 in the lockfile as a side effect. 11.6.0 already
declares `type-plus: ^8.0.0-beta.10`, so with both on 8 the tree resolves a single
type-plus and a single tersify.

---
"progress-str": patch
---

Drop the runtime dependency on `type-plus`.

`type-plus` 8.0.0 is ESM only, so the CommonJS build could no longer `require()` it on the low end of the supported Node range (`>= 20`). The `required()`/`requiredDeep()` merge helpers and the `RecursivePartial` type are now inlined.

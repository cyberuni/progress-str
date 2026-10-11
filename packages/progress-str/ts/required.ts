// Inlined from `type-plus` (which re-exports them from `unpartial`).
// type-plus 8 is ESM only, and the CJS build of this package must not `require()` it:
// `engines.node` is ">= 20", and require(esm) is not available across that range.

/**
 * Creates a recursive partial type of type T.
 */
export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends (infer U)[]
		? RecursivePartial<U>[] | undefined
		: T[P] extends (...args: any[]) => any
			? T[P] | undefined
			: T[P] extends Record<PropertyKey, any>
				? RecursivePartial<T[P]> | undefined
				: T[P] | undefined
}

/**
 * Shallow merges `source2` over `source1`.
 * A key `source2` sets to `undefined` overwrites the earlier value.
 */
export function required<A extends object, B extends object>(source1: A, source2: B | undefined): A & B {
	return { ...source1, ...source2 } as A & B
}

/**
 * Recursively merges `source2` over `source1`.
 * A key `source2` sets to `undefined` keeps the earlier value.
 *
 * Only plain objects are merged; any other value in `source2` replaces the earlier one.
 */
export function requiredDeep<A extends object, B extends object>(source1: A, source2: B | undefined): A & B {
	return deepmerge(source1, source2)
}

function deepmerge(source1: any, source2: any): any {
	if (!isPlainObject(source1) || !isPlainObject(source2)) return source2 === undefined ? source1 : source2
	const result: Record<string, any> = { ...source1 }
	for (const k of Object.keys(source2)) result[k] = deepmerge(source1[k], source2[k])
	return result
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype
}

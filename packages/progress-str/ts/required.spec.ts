import { required, requiredDeep } from './required.js'

describe('required', () => {
	test('shallow merges the second source over the first', () => {
		expect(required({ a: 1, b: { x: 1, y: 1 } }, { b: { x: 2 } })).toEqual({ a: 1, b: { x: 2 } })
	})
	test('an undefined key overwrites the earlier value', () => {
		expect(required({ a: 1 }, { a: undefined })).toEqual({ a: undefined })
	})
	test('an undefined second source returns a copy of the first', () => {
		expect(required({ a: 1 }, undefined)).toEqual({ a: 1 })
	})
})

describe('requiredDeep', () => {
	test('merges nested objects', () => {
		expect(requiredDeep({ a: 1, b: { x: 1, y: 1 } }, { b: { x: 2 } })).toEqual({ a: 1, b: { x: 2, y: 1 } })
	})
	test('an undefined key keeps the earlier value', () => {
		expect(requiredDeep({ a: 1 }, { a: undefined })).toEqual({ a: 1 })
	})
	test('an undefined second source keeps the first', () => {
		expect(requiredDeep({ a: 1 }, undefined)).toEqual({ a: 1 })
	})
	test('an array replaces the earlier value', () => {
		expect(requiredDeep({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] })
	})
	test('adds keys missing from the first source', () => {
		expect(requiredDeep({ a: 1 }, { b: { x: 1 } })).toEqual({ a: 1, b: { x: 1 } })
	})
})

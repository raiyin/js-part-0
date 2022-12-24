// Test utils

const testBlock = (name: string): void => {
    console.groupEnd();
    console.group(`# ${name}\n`);
};

const areEqual = (a: string | boolean | any[], b: string | boolean | any[]): boolean => {
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length == b.length && a.every((element, index) => areEqual(element, b[index]));
    }
    else
        return a === b;
    // Compare arrays of primitives
    // Remember: [] !== []
};

const test = (
    whatWeTest: string, actualResult: string | boolean | any[],
    expectedResult: string | boolean | any[]): void => {
    if (areEqual(actualResult, expectedResult)) {
        console.log(`[OK] ${whatWeTest}\n`);
    } else {
        console.error(`[FAIL] ${whatWeTest}`);
        console.debug('Expected:');
        console.debug(expectedResult);
        console.debug('Actual:');
        console.debug(actualResult);
        console.log('');
    }
};

// Functions

const getType = (value: string | number | boolean | Function | object | null | undefined | any[]): string => {
    // Return string with a native JS type of value
    return typeof value;
};

const getTypesOfItems = (arr: any[]): any[] => {
    // Return array with types of items of given array
    return arr.map((item) => getType(item));
};

const allItemsHaveTheSameType = (arr: any[]): boolean => {
    // Return true if all items of array have the same type
    return new Set(arr.map((item) => getType(item))).size == 1;
};

const getRealType = (value: any): string => {
    // Return string with a “real” type of value.
    // For example:
    //     typeof new Date()       // 'object'
    //     getRealType(new Date()) // 'date'
    //     typeof NaN              // 'number'
    //     getRealType(NaN)        // 'NaN'
    // Use typeof, instanceof and some magic. It's enough to have
    // 12-13 unique types but you can find out in JS even more :)

    let typeOfValue: string = typeof value;
    if (typeOfValue === 'number') {
        if (isNaN(value)) return 'NaN';
        else if (Math.abs(value) === Infinity)
            return 'Infinity';
        else return 'number';
    } else if (typeOfValue === 'string')
        return 'string';
    else if (typeOfValue === 'boolean')
        return 'boolean';
    else if (typeOfValue === 'undefined')
        return 'undefined';
    else if (typeOfValue === 'symbol')
        return 'symbol';
    else if (typeOfValue === 'function')
        return 'function';
    // object
    else {
        if (value instanceof Array)
            return 'array';
        if (value instanceof Number)
            return 'number';
        else if (value instanceof Date)
            return 'date';
        else if (value instanceof Set)
            return 'set';
        else if (value instanceof Map)
            return 'map';
        else if (value instanceof WeakMap)
            return 'weakmap';
        else if (value instanceof WeakSet)
            return 'weakset';
        else if (value instanceof RegExp)
            return 'regexp';
        else if (value instanceof Error)
            return 'error';
        else if (value instanceof Date)
            return 'date';
        else return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
};

const getRealTypesOfItems = (arr: any[]): string[] => {
    // Return array with real types of items of given array
    return arr.map((item) => getRealType(item));
};

const everyItemHasAUniqueRealType = (arr: any[]): boolean => {
    // Return true if there are no items in array
    // with the same real type
    return new Set(arr.map((item) => getRealType(item))).size === arr.length;
};

function compareFn(a: number[], b: number[]): number {
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[0] > b[0]) {
        return 1;
    }
    // a must be equal to b
    return 0;
}


const countRealTypes = (arr: any[]): any[] => {
    // Return an array of arrays with a type and count of items
    // with this type in the input array, sorted by type.
    // Like an Object.entries() result: [['boolean', 3], ['string', 5]]
    const map = new Map();
    arr.forEach((element) => {
        let realTypeOfValue = getRealType(element);
        let realTypeExist = map.get(realTypeOfValue);
        map.set(realTypeOfValue, (realTypeExist || 0) + 1);
    });
    return [...map].sort(compareFn);
};

// Tests

testBlock('getType');

test('Boolean', getType(true), 'boolean');
test('Number', getType(123), 'number');
test('String', getType('whoo'), 'string');
test('Array', getType([]), 'object');
test('Object', getType({}), 'object');
test(
    'Function',
    getType(() => { }),
    'function',
);
test('Undefined', getType(undefined), 'undefined');
test('Null', getType(null), 'object');

testBlock('allItemsHaveTheSameType');

test('All values are numbers', allItemsHaveTheSameType([11, 12, 13]), true);

test(
    'All values are strings',
    allItemsHaveTheSameType(['11', '12', '13']),
    true,
);

test(
    'All values are strings but wait',
    allItemsHaveTheSameType(['11', new String('12'), '13']),
    false,
);

test(
    'Values like a number',
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/27910
    allItemsHaveTheSameType([123, 123 / 'a', 1 / 0]),
    true,
    // What the result?
);

test('Values like an object', allItemsHaveTheSameType([{}]), true);

testBlock('getTypesOfItems VS getRealTypesOfItems');

const knownTypes = [
    // Add values of different types like boolean, object, date, NaN and so on
    true,
    42,
    'this is a string',
    [1, 1, 2, 3, 5, 8],
    {},
    function (a: number, b: number) {
        return a * b;
    },
    undefined,
    'str'.match(/[aeiou]/gi),
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/27910
    123 / 'a',
    1 / 0,
    new Date(),
    new RegExp('\d{4}'),
    new Set(),
    new Map(),
    Symbol('abc'),
    new Error('abc'),
    new WeakSet(),
];

test('Check basic types', getTypesOfItems(knownTypes), [
    // What the types?
    'boolean',
    'number',
    'string',
    'object',
    'object',
    'function',
    'undefined',
    'object',
    'number',
    'number',
    'object',
    'object',
    'object',
    'object',
    'symbol',
    'object',
    'object',
]);

test('Check real types', getRealTypesOfItems(knownTypes), [
    'boolean',
    'number',
    'string',
    'array',
    'object',
    'function',
    'undefined',
    'null',
    'NaN',
    'Infinity',
    'date',
    'regexp',
    'set',
    'map',
    'symbol',
    'error',
    'weakset',
    // What else?
]);

testBlock('everyItemHasAUniqueRealType');

test(
    'All value types in the array are unique',
    everyItemHasAUniqueRealType([true, 123, '123']),
    true,
);

test(
    'Two values have the same type',
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/27910
    everyItemHasAUniqueRealType([true, 123, '123' === 123]),
    false,
);

test(
    'There are no repeated types in knownTypes',
    everyItemHasAUniqueRealType(knownTypes),
    true,
);

testBlock('countRealTypes');

test(
    'Count unique types of array items',
    countRealTypes([true, null, !null, !!null, {}]),
    [
        ['boolean', 3],
        ['null', 1],
        ['object', 1],
    ],
);

test(
    'Counted unique types are sorted',
    countRealTypes([{}, null, true, !null, !!null]),
    [
        ['boolean', 3],
        ['null', 1],
        ['object', 1],
    ],
);

// Add several positive and negative tests
test(
    'All infinities have same type',
    allItemsHaveTheSameType([Infinity, +Infinity, -Infinity]),
    true,
);
test(
    'All arrays have unique types',
    everyItemHasAUniqueRealType([
        new Int8Array([1, 2, 3]),
        new Uint8Array([1, 2, 3]),
        new Int16Array([1, 2, 3]),
        new Uint16Array([1, 2, 3]),
        new Int32Array([1, 2, 3]),
        new Uint32Array([1, 2, 3]),
        new Uint8ClampedArray([1, 2, 3]),
    ]),
    true,
);
test(
    'All numbers are the same type',
    allItemsHaveTheSameType([11, parseInt('12'), 13, parseFloat('2.1')]),
    true,
);
test(
    'Items have some the diff types',
    allItemsHaveTheSameType([11, new String(), new Date(), new RegExp('\d{4}')]),
    false,
);

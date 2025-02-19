// Test utils

const testBlock = (name) => {
    console.groupEnd();
    console.group(`# ${name}\n`);
}

const areEqual = (a, b) => {
    return a === b;
    // Compare arrays of primitives
    // Remember: [] !== []
}

const test = (whatWeTest, actualResult, expectedResult) => {
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
}


// Functions 

const getType = (value) => {
    // Return string with a native JS type of value
}

const getTypesOfItems = (arr) => {
    // Return array with types of items of given array
}

const allItemsHaveTheSameType = (arr) => {
    // Return true if all items of array have the same type
};

const getRealType = (value) => {
    // Return string with a “real” type of value.
    // For example:
    //     typeof new Date()       // 'object'
    //     getRealType(new Date()) // 'date'
    //     typeof NaN              // 'number'
    //     getRealType(NaN)        // 'NaN'
    // Use typeof, instanceof and some magic. It's enough to have
    // 12-13 unique types but you can find out in JS even more :)
}

const getRealTypesOfItems = (arr) => {
    // Return array with real types of items of given array
};

const everyItemHasAUniqueRealType = (arr) => {
    // Return true if there are no items in array
    // with the same real type
};

const countRealTypes = (arr) => {
    // Return an array of arrays with a type and count of items
    // with this type in the input array, sorted by type.
    // Like an Object.entries() result: [['boolean', 3], ['string', 5]]
};


// Tests

testBlock('getType');

test('Boolean', getType(true), 'boolean');
test('Number', getType(123), 'number');
test('String', getType('whoo'), 'string');
test('Array', getType([]), 'object');
test('Object', getType({}), 'object');
test('Function', getType(() => {}), 'function');
test('Undefined', getType(undefined), 'undefined');
test('Null', getType(null), 'object');

testBlock('allItemsHaveTheSameType');

test(
    'All values are numbers',
    allItemsHaveTheSameType([11, 12, 13]),
    true
);

test(
    'All values are strings',
    allItemsHaveTheSameType(['11', '12', '13']),
    true
);

test(
    'All values are strings but wait',
    allItemsHaveTheSameType(['11', new String('12'), '13']),
    // What the result?
);

test(
    'Values like a number',
    allItemsHaveTheSameType([123, 123/'a', 1/0]),
    // What the result?
);

test(
    'Values like an object',
    allItemsHaveTheSameType([{}/* , Add as many as possible */]),
    true
);

testBlock('getTypesOfItems VS getRealTypesOfItems');

const knownTypes = [
    // Add values of different types like boolean, object, date, NaN and so on
];

test(
    'Check basic types',
    getTypesOfItems(knownTypes),
    [
        // What the types?
    ]
);

test(
    'Check real types',
    getRealTypesOfItems(knownTypes),
    [
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
        // What else?
    ]
);

testBlock('everyItemHasAUniqueRealType');

test(
    'All value types in the array are unique',
    everyItemHasAUniqueRealType([
        true,
        123,
        '123',
    ]),
    true
);

test(
    'Two values have the same type',
    everyItemHasAUniqueRealType([
        true,
        123,
        '123' === 123,
    ]),
    false
);

test(
    'There are no repeated types in knownTypes',
    everyItemHasAUniqueRealType(knownTypes),
    true
);


testBlock('countRealTypes');

test(
    'Count unique types of array items',
    countRealTypes([
        true,
        null,
        !null,
        !!null,
        {},
    ]),
    [
        ['boolean', 3],
        ['null', 1],
        ['object', 1],
    ]
);

test(
    'Counted unique types are sorted',
    countRealTypes([
        {},
        null,
        true,
        !null,
        !!null,
    ]),
    [
        ['boolean', 3],
        ['null', 1],
        ['object', 1],
    ]
);

// Add several positive and negative tests

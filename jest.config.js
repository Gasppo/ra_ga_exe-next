module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.mjs?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    'moduleNameMapper': {
        '@backend/(.*)': '<rootDir>/src/backend/$1',
        '@pages/(.*)': '<rootDir>/src/pages/$1',
        '@utils/(.*)': '<rootDir>/src/utils/$1',
    }
};

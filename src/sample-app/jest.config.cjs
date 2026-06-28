/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    roots: ['<rootDir>/src'],

    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

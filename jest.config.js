/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: '@dynatrace/runtime-simulator/lib/test-environment',
  clearMocks: true,
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    `/node_modules/(?!@bundled-es-modules)`,
  ],
  moduleNameMapper: {
    "^@pages/$": "<rootDir>/src/app/pages/$1",
    "^@common/(.*)$": "<rootDir>/src/app/common/$1",
    "^@api/(.*)$": "<rootDir>/api/$1",
  },
};

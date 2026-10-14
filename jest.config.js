module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/dist/'],
  collectCoverageFrom: ['src/app/core/**/*.ts'],
};

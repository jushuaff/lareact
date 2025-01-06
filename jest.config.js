export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
    '^react-router-dom$': require.resolve('react-router-dom'),
  },
  testMatch: [
    '**/tests/**/*.(test|spec).js',
    '**/?(*.)+(test|spec).js',
  ],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
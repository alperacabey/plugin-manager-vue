module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    '**/*.spec.ts',
  ],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
  moduleFileExtensions: ['vue', 'js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  silent: true,
}
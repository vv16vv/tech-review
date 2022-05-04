module.exports = {
  verbose: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};

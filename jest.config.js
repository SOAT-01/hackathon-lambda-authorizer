const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");
module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    ".*\\.ts$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),
  modulePaths: ["<rootDir>/src"],
  testRegex: "src/.*\\.(test|spec)\\.ts$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node",
};

# Testing Documentation

This project uses **Jest** and **React Testing Library** for unit testing.

## 🧪 Test Structure

```
src/
├── features/game/
│   ├── logic.test.ts              # Business logic tests
│   └── lib/
│       ├── getAnswerStatus.test.ts
│       └── getAnswerLetter.test.ts
└── shared/lib/
    └── formatters.test.ts         # Utility function tests
```

## 📝 Running Tests

### Basic Commands

```bash
# Run all tests (lint + type-check + unit tests)
yarn test

# Run only unit tests
yarn test:unit

# Run tests in watch mode (for development)
yarn test:watch

# Run tests with coverage report
yarn test:coverage
```

## 📊 Test Coverage

Current test coverage:

| Category | Tests | Status |
|----------|-------|--------|
| **Business Logic** | ✅ 32 tests | All passing |
| **Utility Functions** | ✅ 11 tests | All passing |
| **Total** | ✅ 43 tests | All passing |

### What's Tested

#### 1. Game Logic (`logic.test.ts`)
- ✅ `isAnswerCorrect()` - Answer validation
- ✅ `isLastQuestion()` - Question index checking
- ✅ `calculateReward()` - Reward calculation
- ✅ `determineGameStatus()` - Game status determination
- ✅ `createGameResult()` - Result object creation
- ✅ `isValidQuestionIndex()` - Index validation

#### 2. Answer Status (`getAnswerStatus.test.ts`)
- ✅ Status before reveal (Selected/Default)
- ✅ Status after reveal (Correct/Wrong)
- ✅ Edge cases (undefined, empty arrays, multiple correct answers)

#### 3. Answer Letter (`getAnswerLetter.test.ts`)
- ✅ Letter mapping (A, B, C, D, etc.)
- ✅ Consecutive letters

#### 4. Formatters (`formatters.test.ts`)
- ✅ Money formatting with $ and commas
- ✅ Edge cases (zero, negative, large numbers)

## 🏗️ Test Configuration

### jest.config.js

```javascript
{
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

### jest.setup.js

```javascript
import '@testing-library/jest-dom';
```

## ✍️ Writing Tests

### Test File Naming

- Use `.test.ts` or `.test.tsx` extension
- Place test files next to the code they test
- Example: `logic.ts` → `logic.test.ts`

### Example Test Structure

```typescript
import { functionToTest } from './module';

describe('Module Name', () => {
    describe('functionToTest', () => {
        it('should do something when condition', () => {
            // Arrange
            const input = 'value';
            
            // Act
            const result = functionToTest(input);
            
            // Assert
            expect(result).toBe('expected');
        });

        it('should handle edge case', () => {
            expect(functionToTest(null)).toBe(null);
        });
    });
});
```

### Best Practices

1. **Arrange-Act-Assert Pattern**
   - Arrange: Set up test data
   - Act: Execute the function
   - Assert: Verify the result

2. **Test Names**
   - Use descriptive names: "should return X when Y"
   - Make test intent clear

3. **Edge Cases**
   - Test null/undefined
   - Test empty arrays/objects
   - Test boundary values

4. **Keep Tests Simple**
   - One assertion per test (when possible)
   - Don't test implementation details

## 🎯 Coverage Goals

Current coverage status:

- ✅ **Pure functions:** 100% covered
- ✅ **Business logic:** 100% covered
- 🔄 **React components:** Not yet covered
- 🔄 **Hooks:** Not yet covered

### Future Testing Plans

1. **Component Tests**
   - Test GameScreen rendering
   - Test user interactions
   - Test error states

2. **Hook Tests**
   - Test useGameController
   - Test useGameResult
   - Test custom hooks behavior

3. **Integration Tests**
   - Test game flow end-to-end
   - Test navigation

## 🚫 What NOT to Test

- External libraries (Next.js, React, Zod)
- CSS styles
- TypeScript types (use type-check instead)
- Mock implementations

## 🐛 Debugging Tests

### Run specific test file

```bash
yarn test:unit logic.test.ts
```

### Run tests matching pattern

```bash
yarn test:unit --testNamePattern="isAnswerCorrect"
```

### See detailed output

```bash
yarn test:unit --verbose
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

## 🔧 CI/CD Integration

Tests run automatically on:

- ✅ **Pre-push hook:** All tests must pass
- ✅ **Pull requests:** CI runs full test suite
- ✅ **Before deployment:** Tests + coverage check

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

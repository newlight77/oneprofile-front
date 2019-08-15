## Jest

To use Jest as our test runner we’re going to use jest-preset-angular.

- Add these dependencies :

```sh
#npm install -D jest jest-preset-angular @types/jest
npm install jest @types/jest --save-dev
npm install jest-preset-angular --save-dev
```

- Then create jest.setup.ts file in the same root with package.json or inside 

```sh
echo "
import 'jest-preset-angular';
" > ./jest.setup.ts
```

- The next step is adding jest configuration on package.json:

```json
"jest": {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/jest.setup.ts",
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules",
      "<rootDir>/dist",
      "<rootDir>/src/test.ts"
    ],
    "globals": {
      "ts-jest": {
        "tsConfigFile": "tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$",
        "astTransformers": [ "<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer"]
      }
    }
  }
```

Add <rootDir>/src/test.ts in testPathIgnorePatterns to avoid running test with Karma.

>By Angular CLI defaults you’ll have a src/test.ts file which will be picked up by jest. Just remove it and it's reference in tsconfig.spec.json.

```sh
   "files": [
-    "src/test.ts",
     "src/polyfills.ts"
```

By default angular project the ts.config.json and ts.config.spec.json are located at the root but jest-preset-angular is refering it inside src folder. We had to overwrite it with <rootDir>/tsconfig.spec.json for global jest configuration in package.json.

- Adjust your test scripts: replace any ng test usage with Jest commands.

```json
     "build": "ng build",
-    "test": "ng test",
+    "test": "jest",
+    "test:watch": "jest --watch",
+    "test:ci": "jest --runInBand",
```

### Remove Jasmine and Karma 

- Remove any Karma and Jasmine related packages.

```json
-    "@types/jasmine": "~3.3.8",
     "@types/jasminewd2": "~2.0.3",
+    "@types/jest": "^24.0.17",
     "codelyzer": "^5.0.0",
     "jasmine-core": "~3.4.0",
     "jasmine-spec-reporter": "~4.2.1",
-    "karma": "~4.1.0",
-    "karma-chrome-launcher": "~2.2.0",
-    "karma-coverage-istanbul-reporter": "~2.0.1",
-    "karma-jasmine": "~2.0.1",
-    "karma-jasmine-html-reporter": "^1.4.0",
```

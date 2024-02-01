## Release History



### 3.0.0 ( 2024-02-01)
- [x] Previous version was working with "FIFO" and "FILO". Name "FILO" was change to "LIFO" to be more consistent with the rest of the world. No other changes were made;
- [x] Documentation was updated according to the new version;
- [x] Package.json: "exports" section was added. Allows you to use package as commonjs or es6 module without additional configuration;
- [x] Folder 'dist' was added to the project. Includes commonjs, umd and esm versions of the library;
- [x] Rollup was added to the project. Used to build the library versions;



### 2.0.0 (2023-05-30)
- [x] Options as an object;
- [x] New option - limit;
- [x] New option - onLimit;
- [x] When stack has limit and onLimit is set to 'update', the method 'push' will return the list of items that were removed;
- [x] Pull with ignore argument;
- [x] Pick with ignore argument;

### 1.1.0 ( 2023-05-26)
- [x] Pull more then one value at the time;
- [x] Method pullReverse: When we want to pull more then one value, but in reverse order;
- [x] Peek more then one value at the time;
- [x] Method peekReverse: When we want to peek more then one value, but in reverse order;



### 1.0.0 ( 2021-03-29 )
 - [x] Node.js module;
 - [x] Tests;
 - [x] Short documentation;



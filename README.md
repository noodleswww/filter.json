# filter.json

[![NPM](https://nodei.co/npm/filter.json.png)](https://nodei.co/npm/filter.json/)

[![Build Status](https://secure.travis-ci.org/noodleswww/filter.json.png)](https://travis-ci.org/noodleswww/filter.json)

filter your api data from your schema


## Contents

- [Notes](#notes)
- [Usage](#usage)
- [Test](#test)
- [Babel](#babel)
- [Hook](#hook)



## Why filter.json
* Front-end to render data depends json data returned by the remote interface, of course, the value will be returned in accordance with the interface data format, exp. `api.user.name` 。
* But unavoidable changes in the interface data or due to improper handling of back office staff to return to the non-conforming data interface.
* If the background user data field returns null / '' / [], if you use ejs or other template engine will cause the page Ben collapse, if it is in a production environment, it will cause great losses.
* filter.json born to do this, it will follow the model of the remote interface data structure of the data requested strict filtering, the data field does not conform to the agreement will be replaced by their corresponding data types.
* Even if the interface changes, or changing data types other causes, to ensure the normal rendering of the front page.


## Usage
### Add filter.json to your project

```console
$ npm install filter.json --save
```

Your `package.json` will then look like this:

```json
{
  "name": "awesome-package",
  "dependencies": {
    "filter.json": "^0.1.0"
  }
}
```

### Create your preset Schema

Create a object named `schema` in the js file or any other ways:

```js
const awesomeSchema = {
	error: 0,
	sCache: 1,
	data: {
		setup: { title: {}},
		catalog: {},
		top: {
			mixed: [],
			basic: [],
		},
	},
	message: '获取数据成功',
};
```

filter

### Get remote api json data

```js
const apiData = await request.get/post('http://test.com/api/xxx')
```

the apiData interface json must be the same as the `awesomeSchema`

### Import and Run
* es6 using

```js
import filterJson from 'filter.json';
const bkFilterData = filterJson(awesomeSchema, { type: 'object', api: apiData, schema: awesomeSchema });
```

* es5 using

```js
var filterJson = require('filter.json');
const bkFilterData = filterJson.default(awesomeSchema, { type: 'object', api: apiData, schema: awesomeSchema });
```

bkFilterData will be reorganized in strict accordance with the predefined Schema, even if the api json data of a field key is changed,
it will be assigned according to the Schema of the pre setting.

here is the api data json, do not same with Schema

```js
const apiData = {
	error: null,
	sCache: 1,
	data: {
		setup: null,
		catalog: {},
		top: {
			mixed: {},
			basic: null,
		},
	},
	message: 'msg ok',
};
````
and the result will be

```js
{
    error: 0,
    sCache: 1,
    data: {
	    setup: { title: {}},,
	    catalog: {},
	    top: {
		    mixed: {},
		    basic: [],
	    },
    },
    message: 'msg ok'
};
````

you can see the filed `error, setup, basic` will be restored by predefined Schema.
If you execute `apiData.data.top.basic.map` have no error. or it will throw an error.



## Notes
* the predefined Schema suggest Array is the lowest js type
```js
top: { basic : []}
````
* but also defined like this
```js
top: { basic: [{},{}]}
```
* if the basic field is null, the filter return data will be `basic: [{},{}]`



## Test

* configuration for ava es6
```
"ava": {
    "files": [
      "test/*.js"
    ],
    "concurrency": 5,
    "failFast": true,
    "tap": true,
    "powerAssert": false,
    "require": "babel-core/register"
  }
```
> `"require": "babel-core/register"` is important, so you must execute install `babel-core`.



## Babel

```
{
  "presets": [
	"es2015",
	"stage-0"
  ],
  "plugins": [
	"transform-runtime"
  ],
  "env": {
	"development": {
	  "sourceMaps": "inline"
	}
  }
}
```
> use preset [`babel-preset-es2015`](https://babeljs.io/docs/plugins/preset-es2015/) and [`babel-preset-stage-0`](https://babeljs.io/docs/plugins/babel-preset-stage-0/)
> use plugin [`babel-plugin-transform-runtime`](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime) . you can read more docs from [`transform-runtime`](https://babeljs.io/docs/plugins/transform-runtime/) and [`CN`](https://www.zfanw.com/blog/babel-6.html#babel-runtime) 
> generate sourceMaps in development env



## Hook

```
"scripts": {
    "test": "ava",
    "build": "babel index.js src -d dist"
  }
```




## FAQ



## Links

- [Awesome list](https://github.com/avajs/awesome-ava)
- [JavaScript Air podcast episode](http://jsair.io/ava)

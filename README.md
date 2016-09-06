# filter.json
filter your api data from your schema


## Contents

- [Notes](#notes)
- [Usage](#usage)
- [Test](#test)
- [Babel](#babel)
- [Hook](#hook)



## Why filter.json
* 前段渲染界面的数据依赖远程接口返回的json数据, 当然会按照接口返回的数据格式进行取值, 例如 `api.user.name` 。
* 但避免不了接口数据变动或者由于后台人员处理不当,返回了不符合约定的数据接口。
* 假如后台数据user字段返回了null/''/[], 如果你使用ejs或者其他模板引擎将会导致页面奔溃,如果是在生产环境,将会造成很大的损失。
* filter.json 为此而生, 它会按照远程接口的数据结构模型 对请求的数据进行严格的过滤, 对于不符合约定的数据字段将会被替换成对应的数据类型。
* 即使接口变动,或者其他原因造成的数据类型改变, 保证了前段页面的正常渲染。 


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

```js
import parseApiDataFromSchema from 'filter.json';
const bkFilterData = parseApiDataFromSchema(awesomeSchema, { type: 'object', api: apiData, schema: awesomeSchema });
````

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
	message: '获取数据成功',
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
    message: '获取数据成功'
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



## Test AVA

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



## Babel ES6

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



## Hook es5

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


import test from 'ava';
import parseApiDataFromSchema from '../src/apiFilter';
const filterJson = require('../dist/apiFilter');

const awesomeSchema = {
	error: false,
	sCache: true,
	data: {
		setup: { title: {}},
		catalog: {},
		top: {
			mixed: [{ catalog: {} }],
			basic: [{}],
		},
	},
	message: '获取数据成功',
};

const apiData = {
	error: null,
	sCache: [],
	data: {
		setup: { title: 'abc', keywords: '123'},
		catalog: {},
		top: {
			mixed: {},
			basic: null,
		},
	},
	message: '获取数据成功',
};

test('module filter.json', t => {
	let api = () => {
		const bkFilterDataES6 = parseApiDataFromSchema(awesomeSchema, { type: 'object', api: apiData, schema: awesomeSchema });
		t.is(Object.prototype.toString.call(bkFilterDataES6.data.top.mixed), '[object Array]');
		t.is(Object.prototype.toString.call(bkFilterDataES6.data.top.basic), '[object Array]');
		t.is(Object.prototype.toString.call(bkFilterDataES6.data.setup.title), '[object Object]');
		t.falsy(bkFilterDataES6.api);
		t.true(bkFilterDataES6.sCache);

		const bkFilterDataES5 = filterJson.default(awesomeSchema, { type: 'object', api: apiData, schema: awesomeSchema });
		t.is(Object.prototype.toString.call(bkFilterDataES5.data.top.mixed), '[object Array]');
		t.is(Object.prototype.toString.call(bkFilterDataES5.data.top.basic), '[object Array]');
		t.is(Object.prototype.toString.call(bkFilterDataES5.data.setup.title), '[object Object]');
		t.falsy(bkFilterDataES5.api);
		t.true(bkFilterDataES5.sCache);
	};
	api();
	t.pass();
});

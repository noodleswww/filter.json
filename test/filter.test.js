
import test from 'ava';
import parseApiDataFromSchema from '../src/apiFilter';

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
		const bkFilterData = parseApiDataFromSchema(awesomeSchema, { type: 'object', api: apiData, schema: awesomeSchema });
		t.is(Object.prototype.toString.call(bkFilterData.data.top.mixed), '[object Array]');
		t.is(Object.prototype.toString.call(bkFilterData.data.top.basic), '[object Array]');
		t.is(Object.prototype.toString.call(bkFilterData.data.setup.title), '[object Object]');
		t.falsy(bkFilterData.api);
		t.true(bkFilterData.sCache);
	};
	api();
	t.pass();
});

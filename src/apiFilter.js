/* eslint-disable */

function getOriginType(obj) {
	var reg = /Number|String|Object|Array|Null|Undefined/;
	return Object.prototype.toString.call(obj).match(reg).toString();
}


let apiData;
let schemaData;

/**
 *
 * @param obj 要过滤的数据结构模型
 * @param args  模块内部会缓存上一次执行解析的api载体名称
 *
 * ```js
 * // 调用方式
 * const apiBkData = await xxProxy.fetchData(xx);
 * const conditionSchema = xxProxy.conditionSchema;
 * parseApiDataFromSchema(conditionSchema, { key: 'conditionSchema', type: 'object', api: 'apiBkData' });
 * key: schema对象名称; type: 数据类型; api: 临时api返回对象的载体名称
 * ```
 *
 * 经过过滤的数据都严格按照自定义Schema匹配, 前段渲染只需要考虑 数组内部类型,
 * 目前 仅支持到数据, 后续将补充数组内部嵌套更复杂的数据类型
 * 例如: >二维数组, [{}], 或者包装成数组的更复杂的数据类型, 避免渲染空指针
 */
export default function parseApiDataFromSchema(obj, ...args) {

	+function(obj, ...args) {
		if (args[0].api && args[0].schema) {
			apiData = args[0].api;
			schemaData = args[0].schema;
			args[0].key = 'schemaData';
			delete args[0].api;
			delete args[0].schema;
		}

		const props = Object.getOwnPropertyNames(obj);
		if (!props.length) {
			//  console.log(obj, '..................level: ', args.map(item=>item.key).join('.'));
		} else {
			props.forEach(function(item) {
				const val = obj[item];
				const originType = getOriginType(val);

				const schemaTmpArr = [...args.concat({ key: item, type: 'array' })];
				const apiTmpArr = [...args.concat({ key: item, type: 'array' })];

				apiTmpArr.shift();
				apiTmpArr.unshift({ key: 'apiData', type: 'object' });

				//   eval 执行字符串
				const schemaEvalStr = schemaTmpArr.map(objItem => objItem.key).join('.');
				const apiEvalStr = apiTmpArr.map(objItem => objItem.key).join('.');

				//  eval 执行后结果
				let apiEval;
				let schemaEval;
				eval('apiEval = ' + apiEvalStr);
				eval('schemaEval = ' + schemaEvalStr);

				switch (originType) {
					case 'Array':
						if (getOriginType(apiEval) !== getOriginType(schemaEval)) {
							eval(apiEvalStr + ' = ' + schemaEvalStr);
						}

						break;
					case 'Object':
						if (getOriginType(apiEval) !== getOriginType(schemaEval)) {
							eval(apiEvalStr + ' = ' + schemaEvalStr);
						} else {
							parseApiDataFromSchema(val, ...args.concat({ key: item, type: 'object' }));
						}
						break;
					//  number, string, null, undefined
					default:
						if (getOriginType(apiEval) !== getOriginType(schemaEval)) {
							eval(apiEvalStr + ' = ' + schemaEvalStr);
						}
					//  console.log(item, '...........', val, '.......层级关系: ', args.concat(item).map(item=>item.key).join('.'));
				}
			});
		}
	}(obj, ...args);

	return apiData;
};

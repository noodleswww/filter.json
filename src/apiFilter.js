/**
 * original type
 * @param obj
 * @returns {string}
 */
function getOriginType(obj) {
	var reg = /Number|String|Object|Array|Null|Undefined|Boolean/;
	return Object.prototype.toString.call(obj).match(reg).toString();
}

//	cache your request api data
let apiData;
//	cache your predefined json Schema
let schemaData;

/**
 *
 * @param obj The data structure model of filtering
 * @param args  cached array
 *
 * ```js
 * const apiData = await xxProxy.fetchData(xx);
 * const awesomeSchema = xxProxy.conditionSchema;
 * const bkFilterData = parseApiDataFromSchema(awesomeSchema, { type: 'object', api: apiData, schema: awesomeSchema });
 * ```
 * */
export default function parseApiDataFromSchema(obj, ...args) {

	+function(obj, ...args) {
		//	cached data and schema from params and delete them
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
			props.forEach(item => {
				const val = obj[item];
				const originType = getOriginType(val);

				const schemaTmpArr = [...args.concat({ key: item, type: 'array' })];
				const apiTmpArr = [...args.concat({ key: item, type: 'array' })];

				apiTmpArr.shift();
				apiTmpArr.unshift({ key: 'apiData', type: 'object' });

				//   eval str
				const schemaEvalStr = schemaTmpArr.map(objItem => objItem.key).join('.');
				const apiEvalStr = apiTmpArr.map(objItem => objItem.key).join('.');

				//  eval res
				let apiEval;
				let schemaEval;
				eval('apiEval = ' + apiEvalStr);
				eval('schemaEval = ' + schemaEvalStr);

				//	judge type
				switch (originType) {
					case 'Array':
						if (getOriginType(apiEval) !== getOriginType(schemaEval)) {
							eval(apiEvalStr + ' = ' + schemaEvalStr);
						}
						//	 TODO do other things
						break;

					case 'Object':
						if (getOriginType(apiEval) !== getOriginType(schemaEval)) {
							eval(apiEvalStr + ' = ' + schemaEvalStr);
						} else {
							parseApiDataFromSchema(val, ...args.concat({ key: item, type: 'object' }));
						}
						break;

					default:
						//	number, string, null, undefined
						if (getOriginType(apiEval) !== getOriginType(schemaEval)) {
							eval(apiEvalStr + ' = ' + schemaEvalStr);
						}
					//	console.log(item, '...........', val, '.......层级关系: ', args.concat(item).map(item=>item.key).join('.'));
				}
			});
		}
	}(obj, ...args);

	return apiData;
};

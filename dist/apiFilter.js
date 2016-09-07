'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

exports.default = parseApiDataFromSchema;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var apiData = void 0;
//	cache your predefined json Schema
var schemaData = void 0;

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
function parseApiDataFromSchema(obj) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	+function (obj) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		//	cached data and schema from params and delete them
		if (args[0].api && args[0].schema) {
			apiData = args[0].api;
			schemaData = args[0].schema;
			args[0].key = 'schemaData';
			delete args[0].api;
			delete args[0].schema;
		}

		var props = (0, _getOwnPropertyNames2.default)(obj);
		if (!props.length) {
			//  console.log(obj, '..................level: ', args.map(item=>item.key).join('.'));
		} else {
			props.forEach(function (item) {
				var val = obj[item];
				var originType = getOriginType(val);

				var schemaTmpArr = [].concat((0, _toConsumableArray3.default)(args.concat({ key: item, type: 'array' })));
				var apiTmpArr = [].concat((0, _toConsumableArray3.default)(args.concat({ key: item, type: 'array' })));

				apiTmpArr.shift();
				apiTmpArr.unshift({ key: 'apiData', type: 'object' });

				//   eval str
				var schemaEvalStr = schemaTmpArr.map(function (objItem) {
					return objItem.key;
				}).join('.');
				var apiEvalStr = apiTmpArr.map(function (objItem) {
					return objItem.key;
				}).join('.');

				//  eval res
				var apiEval = void 0;
				var schemaEval = void 0;
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
							parseApiDataFromSchema.apply(undefined, [val].concat((0, _toConsumableArray3.default)(args.concat({ key: item, type: 'object' }))));
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
	}.apply(undefined, [obj].concat(args));

	return apiData;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGlGaWx0ZXIuanMiXSwibmFtZXMiOlsicGFyc2VBcGlEYXRhRnJvbVNjaGVtYSIsImdldE9yaWdpblR5cGUiLCJvYmoiLCJyZWciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJtYXRjaCIsImFwaURhdGEiLCJzY2hlbWFEYXRhIiwiYXJncyIsImFwaSIsInNjaGVtYSIsImtleSIsInByb3BzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIml0ZW0iLCJvcmlnaW5UeXBlIiwic2NoZW1hVG1wQXJyIiwiY29uY2F0IiwidHlwZSIsImFwaVRtcEFyciIsInNoaWZ0IiwidW5zaGlmdCIsInNjaGVtYUV2YWxTdHIiLCJtYXAiLCJvYmpJdGVtIiwiam9pbiIsImFwaUV2YWxTdHIiLCJhcGlFdmFsIiwic2NoZW1hRXZhbCIsImV2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tCQTBCd0JBLHNCOzs7O0FBMUJ4Qjs7Ozs7QUFLQSxTQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QjtBQUMzQixLQUFJQyxNQUFNLG1EQUFWO0FBQ0EsUUFBT0MsT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTCxHQUEvQixFQUFvQ00sS0FBcEMsQ0FBMENMLEdBQTFDLEVBQStDRyxRQUEvQyxFQUFQO0FBQ0E7O0FBRUQ7QUFDQSxJQUFJRyxnQkFBSjtBQUNBO0FBQ0EsSUFBSUMsbUJBQUo7O0FBRUE7Ozs7Ozs7Ozs7O0FBV2UsU0FBU1Ysc0JBQVQsQ0FBZ0NFLEdBQWhDLEVBQThDO0FBQUEsbUNBQU5TLElBQU07QUFBTkEsTUFBTTtBQUFBOztBQUU1RCxFQUFDLFVBQVNULEdBQVQsRUFBdUI7QUFBQSxxQ0FBTlMsSUFBTTtBQUFOQSxPQUFNO0FBQUE7O0FBQ3ZCO0FBQ0EsTUFBSUEsS0FBSyxDQUFMLEVBQVFDLEdBQVIsSUFBZUQsS0FBSyxDQUFMLEVBQVFFLE1BQTNCLEVBQW1DO0FBQ2xDSixhQUFVRSxLQUFLLENBQUwsRUFBUUMsR0FBbEI7QUFDQUYsZ0JBQWFDLEtBQUssQ0FBTCxFQUFRRSxNQUFyQjtBQUNBRixRQUFLLENBQUwsRUFBUUcsR0FBUixHQUFjLFlBQWQ7QUFDQSxVQUFPSCxLQUFLLENBQUwsRUFBUUMsR0FBZjtBQUNBLFVBQU9ELEtBQUssQ0FBTCxFQUFRRSxNQUFmO0FBQ0E7O0FBRUQsTUFBTUUsUUFBUSxtQ0FBMkJiLEdBQTNCLENBQWQ7QUFDQSxNQUFJLENBQUNhLE1BQU1DLE1BQVgsRUFBbUI7QUFDbEI7QUFDQSxHQUZELE1BRU87QUFDTkQsU0FBTUUsT0FBTixDQUFjLGdCQUFRO0FBQ3JCLFFBQU1DLE1BQU1oQixJQUFJaUIsSUFBSixDQUFaO0FBQ0EsUUFBTUMsYUFBYW5CLGNBQWNpQixHQUFkLENBQW5COztBQUVBLFFBQU1HLDBEQUFtQlYsS0FBS1csTUFBTCxDQUFZLEVBQUVSLEtBQUtLLElBQVAsRUFBYUksTUFBTSxPQUFuQixFQUFaLENBQW5CLEVBQU47QUFDQSxRQUFNQyx1REFBZ0JiLEtBQUtXLE1BQUwsQ0FBWSxFQUFFUixLQUFLSyxJQUFQLEVBQWFJLE1BQU0sT0FBbkIsRUFBWixDQUFoQixFQUFOOztBQUVBQyxjQUFVQyxLQUFWO0FBQ0FELGNBQVVFLE9BQVYsQ0FBa0IsRUFBRVosS0FBSyxTQUFQLEVBQWtCUyxNQUFNLFFBQXhCLEVBQWxCOztBQUVBO0FBQ0EsUUFBTUksZ0JBQWdCTixhQUFhTyxHQUFiLENBQWlCO0FBQUEsWUFBV0MsUUFBUWYsR0FBbkI7QUFBQSxLQUFqQixFQUF5Q2dCLElBQXpDLENBQThDLEdBQTlDLENBQXRCO0FBQ0EsUUFBTUMsYUFBYVAsVUFBVUksR0FBVixDQUFjO0FBQUEsWUFBV0MsUUFBUWYsR0FBbkI7QUFBQSxLQUFkLEVBQXNDZ0IsSUFBdEMsQ0FBMkMsR0FBM0MsQ0FBbkI7O0FBRUE7QUFDQSxRQUFJRSxnQkFBSjtBQUNBLFFBQUlDLG1CQUFKO0FBQ0FDLFNBQUssZUFBZUgsVUFBcEI7QUFDQUcsU0FBSyxrQkFBa0JQLGFBQXZCOztBQUVBO0FBQ0EsWUFBUVAsVUFBUjtBQUNDLFVBQUssT0FBTDtBQUNDLFVBQUluQixjQUFjK0IsT0FBZCxNQUEyQi9CLGNBQWNnQyxVQUFkLENBQS9CLEVBQTBEO0FBQ3pEQyxZQUFLSCxhQUFhLEtBQWIsR0FBcUJKLGFBQTFCO0FBQ0E7QUFDRDtBQUNBOztBQUVELFVBQUssUUFBTDtBQUNDLFVBQUkxQixjQUFjK0IsT0FBZCxNQUEyQi9CLGNBQWNnQyxVQUFkLENBQS9CLEVBQTBEO0FBQ3pEQyxZQUFLSCxhQUFhLEtBQWIsR0FBcUJKLGFBQTFCO0FBQ0EsT0FGRCxNQUVPO0FBQ04zQixnREFBdUJrQixHQUF2QiwwQ0FBK0JQLEtBQUtXLE1BQUwsQ0FBWSxFQUFFUixLQUFLSyxJQUFQLEVBQWFJLE1BQU0sUUFBbkIsRUFBWixDQUEvQjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQztBQUNBLFVBQUl0QixjQUFjK0IsT0FBZCxNQUEyQi9CLGNBQWNnQyxVQUFkLENBQS9CLEVBQTBEO0FBQ3pEQyxZQUFLSCxhQUFhLEtBQWIsR0FBcUJKLGFBQTFCO0FBQ0E7QUFDRjtBQXJCRDtBQXVCQSxJQTVDRDtBQTZDQTtBQUNELEVBNURBLG1CQTREQ3pCLEdBNURELFNBNERTUyxJQTVEVCxFQUFEOztBQThEQSxRQUFPRixPQUFQO0FBQ0EiLCJmaWxlIjoiYXBpRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBvcmlnaW5hbCB0eXBlXG4gKiBAcGFyYW0gb2JqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRPcmlnaW5UeXBlKG9iaikge1xuXHR2YXIgcmVnID0gL051bWJlcnxTdHJpbmd8T2JqZWN0fEFycmF5fE51bGx8VW5kZWZpbmVkfEJvb2xlYW4vO1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikubWF0Y2gocmVnKS50b1N0cmluZygpO1xufVxuXG4vL1x0Y2FjaGUgeW91ciByZXF1ZXN0IGFwaSBkYXRhXG5sZXQgYXBpRGF0YTtcbi8vXHRjYWNoZSB5b3VyIHByZWRlZmluZWQganNvbiBTY2hlbWFcbmxldCBzY2hlbWFEYXRhO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gb2JqIFRoZSBkYXRhIHN0cnVjdHVyZSBtb2RlbCBvZiBmaWx0ZXJpbmdcbiAqIEBwYXJhbSBhcmdzICBjYWNoZWQgYXJyYXlcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYXBpRGF0YSA9IGF3YWl0IHh4UHJveHkuZmV0Y2hEYXRhKHh4KTtcbiAqIGNvbnN0IGF3ZXNvbWVTY2hlbWEgPSB4eFByb3h5LmNvbmRpdGlvblNjaGVtYTtcbiAqIGNvbnN0IGJrRmlsdGVyRGF0YSA9IHBhcnNlQXBpRGF0YUZyb21TY2hlbWEoYXdlc29tZVNjaGVtYSwgeyB0eXBlOiAnb2JqZWN0JywgYXBpOiBhcGlEYXRhLCBzY2hlbWE6IGF3ZXNvbWVTY2hlbWEgfSk7XG4gKiBgYGBcbiAqICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUFwaURhdGFGcm9tU2NoZW1hKG9iaiwgLi4uYXJncykge1xuXG5cdCtmdW5jdGlvbihvYmosIC4uLmFyZ3MpIHtcblx0XHQvL1x0Y2FjaGVkIGRhdGEgYW5kIHNjaGVtYSBmcm9tIHBhcmFtcyBhbmQgZGVsZXRlIHRoZW1cblx0XHRpZiAoYXJnc1swXS5hcGkgJiYgYXJnc1swXS5zY2hlbWEpIHtcblx0XHRcdGFwaURhdGEgPSBhcmdzWzBdLmFwaTtcblx0XHRcdHNjaGVtYURhdGEgPSBhcmdzWzBdLnNjaGVtYTtcblx0XHRcdGFyZ3NbMF0ua2V5ID0gJ3NjaGVtYURhdGEnO1xuXHRcdFx0ZGVsZXRlIGFyZ3NbMF0uYXBpO1xuXHRcdFx0ZGVsZXRlIGFyZ3NbMF0uc2NoZW1hO1xuXHRcdH1cblxuXHRcdGNvbnN0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblx0XHRpZiAoIXByb3BzLmxlbmd0aCkge1xuXHRcdFx0Ly8gIGNvbnNvbGUubG9nKG9iaiwgJy4uLi4uLi4uLi4uLi4uLi4uLmxldmVsOiAnLCBhcmdzLm1hcChpdGVtPT5pdGVtLmtleSkuam9pbignLicpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJvcHMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdFx0Y29uc3QgdmFsID0gb2JqW2l0ZW1dO1xuXHRcdFx0XHRjb25zdCBvcmlnaW5UeXBlID0gZ2V0T3JpZ2luVHlwZSh2YWwpO1xuXG5cdFx0XHRcdGNvbnN0IHNjaGVtYVRtcEFyciA9IFsuLi5hcmdzLmNvbmNhdCh7IGtleTogaXRlbSwgdHlwZTogJ2FycmF5JyB9KV07XG5cdFx0XHRcdGNvbnN0IGFwaVRtcEFyciA9IFsuLi5hcmdzLmNvbmNhdCh7IGtleTogaXRlbSwgdHlwZTogJ2FycmF5JyB9KV07XG5cblx0XHRcdFx0YXBpVG1wQXJyLnNoaWZ0KCk7XG5cdFx0XHRcdGFwaVRtcEFyci51bnNoaWZ0KHsga2V5OiAnYXBpRGF0YScsIHR5cGU6ICdvYmplY3QnIH0pO1xuXG5cdFx0XHRcdC8vICAgZXZhbCBzdHJcblx0XHRcdFx0Y29uc3Qgc2NoZW1hRXZhbFN0ciA9IHNjaGVtYVRtcEFyci5tYXAob2JqSXRlbSA9PiBvYmpJdGVtLmtleSkuam9pbignLicpO1xuXHRcdFx0XHRjb25zdCBhcGlFdmFsU3RyID0gYXBpVG1wQXJyLm1hcChvYmpJdGVtID0+IG9iakl0ZW0ua2V5KS5qb2luKCcuJyk7XG5cblx0XHRcdFx0Ly8gIGV2YWwgcmVzXG5cdFx0XHRcdGxldCBhcGlFdmFsO1xuXHRcdFx0XHRsZXQgc2NoZW1hRXZhbDtcblx0XHRcdFx0ZXZhbCgnYXBpRXZhbCA9ICcgKyBhcGlFdmFsU3RyKTtcblx0XHRcdFx0ZXZhbCgnc2NoZW1hRXZhbCA9ICcgKyBzY2hlbWFFdmFsU3RyKTtcblxuXHRcdFx0XHQvL1x0anVkZ2UgdHlwZVxuXHRcdFx0XHRzd2l0Y2ggKG9yaWdpblR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0XHRpZiAoZ2V0T3JpZ2luVHlwZShhcGlFdmFsKSAhPT0gZ2V0T3JpZ2luVHlwZShzY2hlbWFFdmFsKSkge1xuXHRcdFx0XHRcdFx0XHRldmFsKGFwaUV2YWxTdHIgKyAnID0gJyArIHNjaGVtYUV2YWxTdHIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly9cdCBUT0RPIGRvIG90aGVyIHRoaW5nc1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0XHRcdFx0aWYgKGdldE9yaWdpblR5cGUoYXBpRXZhbCkgIT09IGdldE9yaWdpblR5cGUoc2NoZW1hRXZhbCkpIHtcblx0XHRcdFx0XHRcdFx0ZXZhbChhcGlFdmFsU3RyICsgJyA9ICcgKyBzY2hlbWFFdmFsU3RyKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHBhcnNlQXBpRGF0YUZyb21TY2hlbWEodmFsLCAuLi5hcmdzLmNvbmNhdCh7IGtleTogaXRlbSwgdHlwZTogJ29iamVjdCcgfSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly9cdG51bWJlciwgc3RyaW5nLCBudWxsLCB1bmRlZmluZWRcblx0XHRcdFx0XHRcdGlmIChnZXRPcmlnaW5UeXBlKGFwaUV2YWwpICE9PSBnZXRPcmlnaW5UeXBlKHNjaGVtYUV2YWwpKSB7XG5cdFx0XHRcdFx0XHRcdGV2YWwoYXBpRXZhbFN0ciArICcgPSAnICsgc2NoZW1hRXZhbFN0cik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly9cdGNvbnNvbGUubG9nKGl0ZW0sICcuLi4uLi4uLi4uLicsIHZhbCwgJy4uLi4uLi7lsYLnuqflhbPns7s6ICcsIGFyZ3MuY29uY2F0KGl0ZW0pLm1hcChpdGVtPT5pdGVtLmtleSkuam9pbignLicpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KG9iaiwgLi4uYXJncyk7XG5cblx0cmV0dXJuIGFwaURhdGE7XG59O1xuIl19
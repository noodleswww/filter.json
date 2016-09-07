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
	var reg = /Number|String|Object|Array|Null|Undefined/;
	return Object.prototype.toString.call(obj).match(reg).toString();
}

//	cache your request api data
var apiData = void 0;
//	cache your predefined json Schema
var schemaData = void 0;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGlGaWx0ZXIuanMiXSwibmFtZXMiOlsicGFyc2VBcGlEYXRhRnJvbVNjaGVtYSIsImdldE9yaWdpblR5cGUiLCJvYmoiLCJyZWciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJtYXRjaCIsImFwaURhdGEiLCJzY2hlbWFEYXRhIiwiYXJncyIsImFwaSIsInNjaGVtYSIsImtleSIsInByb3BzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInZhbCIsIml0ZW0iLCJvcmlnaW5UeXBlIiwic2NoZW1hVG1wQXJyIiwiY29uY2F0IiwidHlwZSIsImFwaVRtcEFyciIsInNoaWZ0IiwidW5zaGlmdCIsInNjaGVtYUV2YWxTdHIiLCJtYXAiLCJvYmpJdGVtIiwiam9pbiIsImFwaUV2YWxTdHIiLCJhcGlFdmFsIiwic2NoZW1hRXZhbCIsImV2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tCQWdDd0JBLHNCOzs7O0FBaEN4Qjs7Ozs7QUFLQSxTQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QjtBQUMzQixLQUFJQyxNQUFNLDJDQUFWO0FBQ0EsUUFBT0MsT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTCxHQUEvQixFQUFvQ00sS0FBcEMsQ0FBMENMLEdBQTFDLEVBQStDRyxRQUEvQyxFQUFQO0FBQ0E7O0FBRUQ7QUFDQSxJQUFJRyxnQkFBSjtBQUNBO0FBQ0EsSUFBSUMsbUJBQUo7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJlLFNBQVNWLHNCQUFULENBQWdDRSxHQUFoQyxFQUE4QztBQUFBLG1DQUFOUyxJQUFNO0FBQU5BLE1BQU07QUFBQTs7QUFFNUQsRUFBQyxVQUFTVCxHQUFULEVBQXVCO0FBQUEscUNBQU5TLElBQU07QUFBTkEsT0FBTTtBQUFBOztBQUN2QjtBQUNBLE1BQUlBLEtBQUssQ0FBTCxFQUFRQyxHQUFSLElBQWVELEtBQUssQ0FBTCxFQUFRRSxNQUEzQixFQUFtQztBQUNsQ0osYUFBVUUsS0FBSyxDQUFMLEVBQVFDLEdBQWxCO0FBQ0FGLGdCQUFhQyxLQUFLLENBQUwsRUFBUUUsTUFBckI7QUFDQUYsUUFBSyxDQUFMLEVBQVFHLEdBQVIsR0FBYyxZQUFkO0FBQ0EsVUFBT0gsS0FBSyxDQUFMLEVBQVFDLEdBQWY7QUFDQSxVQUFPRCxLQUFLLENBQUwsRUFBUUUsTUFBZjtBQUNBOztBQUVELE1BQU1FLFFBQVEsbUNBQTJCYixHQUEzQixDQUFkO0FBQ0EsTUFBSSxDQUFDYSxNQUFNQyxNQUFYLEVBQW1CO0FBQ2xCO0FBQ0EsR0FGRCxNQUVPO0FBQ05ELFNBQU1FLE9BQU4sQ0FBYyxnQkFBUTtBQUNyQixRQUFNQyxNQUFNaEIsSUFBSWlCLElBQUosQ0FBWjtBQUNBLFFBQU1DLGFBQWFuQixjQUFjaUIsR0FBZCxDQUFuQjs7QUFFQSxRQUFNRywwREFBbUJWLEtBQUtXLE1BQUwsQ0FBWSxFQUFFUixLQUFLSyxJQUFQLEVBQWFJLE1BQU0sT0FBbkIsRUFBWixDQUFuQixFQUFOO0FBQ0EsUUFBTUMsdURBQWdCYixLQUFLVyxNQUFMLENBQVksRUFBRVIsS0FBS0ssSUFBUCxFQUFhSSxNQUFNLE9BQW5CLEVBQVosQ0FBaEIsRUFBTjs7QUFFQUMsY0FBVUMsS0FBVjtBQUNBRCxjQUFVRSxPQUFWLENBQWtCLEVBQUVaLEtBQUssU0FBUCxFQUFrQlMsTUFBTSxRQUF4QixFQUFsQjs7QUFFQTtBQUNBLFFBQU1JLGdCQUFnQk4sYUFBYU8sR0FBYixDQUFpQjtBQUFBLFlBQVdDLFFBQVFmLEdBQW5CO0FBQUEsS0FBakIsRUFBeUNnQixJQUF6QyxDQUE4QyxHQUE5QyxDQUF0QjtBQUNBLFFBQU1DLGFBQWFQLFVBQVVJLEdBQVYsQ0FBYztBQUFBLFlBQVdDLFFBQVFmLEdBQW5CO0FBQUEsS0FBZCxFQUFzQ2dCLElBQXRDLENBQTJDLEdBQTNDLENBQW5COztBQUVBO0FBQ0EsUUFBSUUsZ0JBQUo7QUFDQSxRQUFJQyxtQkFBSjtBQUNBQyxTQUFLLGVBQWVILFVBQXBCO0FBQ0FHLFNBQUssa0JBQWtCUCxhQUF2Qjs7QUFFQTtBQUNBLFlBQVFQLFVBQVI7QUFDQyxVQUFLLE9BQUw7QUFDQyxVQUFJbkIsY0FBYytCLE9BQWQsTUFBMkIvQixjQUFjZ0MsVUFBZCxDQUEvQixFQUEwRDtBQUN6REMsWUFBS0gsYUFBYSxLQUFiLEdBQXFCSixhQUExQjtBQUNBO0FBQ0Q7QUFDQTs7QUFFRCxVQUFLLFFBQUw7QUFDQyxVQUFJMUIsY0FBYytCLE9BQWQsTUFBMkIvQixjQUFjZ0MsVUFBZCxDQUEvQixFQUEwRDtBQUN6REMsWUFBS0gsYUFBYSxLQUFiLEdBQXFCSixhQUExQjtBQUNBLE9BRkQsTUFFTztBQUNOM0IsZ0RBQXVCa0IsR0FBdkIsMENBQStCUCxLQUFLVyxNQUFMLENBQVksRUFBRVIsS0FBS0ssSUFBUCxFQUFhSSxNQUFNLFFBQW5CLEVBQVosQ0FBL0I7QUFDQTtBQUNEOztBQUVEO0FBQ0M7QUFDQSxVQUFJdEIsY0FBYytCLE9BQWQsTUFBMkIvQixjQUFjZ0MsVUFBZCxDQUEvQixFQUEwRDtBQUN6REMsWUFBS0gsYUFBYSxLQUFiLEdBQXFCSixhQUExQjtBQUNBO0FBQ0Y7QUFyQkQ7QUF1QkEsSUE1Q0Q7QUE2Q0E7QUFDRCxFQTVEQSxtQkE0REN6QixHQTVERCxTQTREU1MsSUE1RFQsRUFBRDs7QUE4REEsUUFBT0YsT0FBUDtBQUNBIiwiZmlsZSI6ImFwaUZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogb3JpZ2luYWwgdHlwZVxuICogQHBhcmFtIG9ialxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZ2luVHlwZShvYmopIHtcblx0dmFyIHJlZyA9IC9OdW1iZXJ8U3RyaW5nfE9iamVjdHxBcnJheXxOdWxsfFVuZGVmaW5lZC87XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaChyZWcpLnRvU3RyaW5nKCk7XG59XG5cbi8vXHRjYWNoZSB5b3VyIHJlcXVlc3QgYXBpIGRhdGFcbmxldCBhcGlEYXRhO1xuLy9cdGNhY2hlIHlvdXIgcHJlZGVmaW5lZCBqc29uIFNjaGVtYVxubGV0IHNjaGVtYURhdGE7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBvYmog6KaB6L+H5ruk55qE5pWw5o2u57uT5p6E5qih5Z6LXG4gKiBAcGFyYW0gYXJncyAg5qih5Z2X5YaF6YOo5Lya57yT5a2Y5LiK5LiA5qyh5omn6KGM6Kej5p6Q55qEYXBp6L295L2T5ZCN56ewXG4gKlxuICogYGBganNcbiAqIC8vIOiwg+eUqOaWueW8j1xuICogY29uc3QgYXBpQmtEYXRhID0gYXdhaXQgeHhQcm94eS5mZXRjaERhdGEoeHgpO1xuICogY29uc3QgY29uZGl0aW9uU2NoZW1hID0geHhQcm94eS5jb25kaXRpb25TY2hlbWE7XG4gKiBwYXJzZUFwaURhdGFGcm9tU2NoZW1hKGNvbmRpdGlvblNjaGVtYSwgeyBrZXk6ICdjb25kaXRpb25TY2hlbWEnLCB0eXBlOiAnb2JqZWN0JywgYXBpOiAnYXBpQmtEYXRhJyB9KTtcbiAqIGtleTogc2NoZW1h5a+56LGh5ZCN56ewOyB0eXBlOiDmlbDmja7nsbvlnos7IGFwaTog5Li05pe2YXBp6L+U5Zue5a+56LGh55qE6L295L2T5ZCN56ewXG4gKiBgYGBcbiAqXG4gKiDnu4/ov4fov4fmu6TnmoTmlbDmja7pg73kuKXmoLzmjInnhafoh6rlrprkuYlTY2hlbWHljLnphY0sIOWJjeautea4suafk+WPqumcgOimgeiAg+iZkSDmlbDnu4TlhoXpg6jnsbvlnossXG4gKiDnm67liY0g5LuF5pSv5oyB5Yiw5pWw5o2uLCDlkI7nu63lsIbooaXlhYXmlbDnu4TlhoXpg6jltYzlpZfmm7TlpI3mnYLnmoTmlbDmja7nsbvlnotcbiAqIOS+i+WmgjogPuS6jOe7tOaVsOe7hCwgW3t9XSwg5oiW6ICF5YyF6KOF5oiQ5pWw57uE55qE5pu05aSN5p2C55qE5pWw5o2u57G75Z6LLCDpgb/lhY3muLLmn5PnqbrmjIfpkohcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VBcGlEYXRhRnJvbVNjaGVtYShvYmosIC4uLmFyZ3MpIHtcblxuXHQrZnVuY3Rpb24ob2JqLCAuLi5hcmdzKSB7XG5cdFx0Ly9cdGNhY2hlZCBkYXRhIGFuZCBzY2hlbWEgZnJvbSBwYXJhbXMgYW5kIGRlbGV0ZSB0aGVtXG5cdFx0aWYgKGFyZ3NbMF0uYXBpICYmIGFyZ3NbMF0uc2NoZW1hKSB7XG5cdFx0XHRhcGlEYXRhID0gYXJnc1swXS5hcGk7XG5cdFx0XHRzY2hlbWFEYXRhID0gYXJnc1swXS5zY2hlbWE7XG5cdFx0XHRhcmdzWzBdLmtleSA9ICdzY2hlbWFEYXRhJztcblx0XHRcdGRlbGV0ZSBhcmdzWzBdLmFwaTtcblx0XHRcdGRlbGV0ZSBhcmdzWzBdLnNjaGVtYTtcblx0XHR9XG5cblx0XHRjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cdFx0aWYgKCFwcm9wcy5sZW5ndGgpIHtcblx0XHRcdC8vICBjb25zb2xlLmxvZyhvYmosICcuLi4uLi4uLi4uLi4uLi4uLi5sZXZlbDogJywgYXJncy5tYXAoaXRlbT0+aXRlbS5rZXkpLmpvaW4oJy4nKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb3BzLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdGNvbnN0IHZhbCA9IG9ialtpdGVtXTtcblx0XHRcdFx0Y29uc3Qgb3JpZ2luVHlwZSA9IGdldE9yaWdpblR5cGUodmFsKTtcblxuXHRcdFx0XHRjb25zdCBzY2hlbWFUbXBBcnIgPSBbLi4uYXJncy5jb25jYXQoeyBrZXk6IGl0ZW0sIHR5cGU6ICdhcnJheScgfSldO1xuXHRcdFx0XHRjb25zdCBhcGlUbXBBcnIgPSBbLi4uYXJncy5jb25jYXQoeyBrZXk6IGl0ZW0sIHR5cGU6ICdhcnJheScgfSldO1xuXG5cdFx0XHRcdGFwaVRtcEFyci5zaGlmdCgpO1xuXHRcdFx0XHRhcGlUbXBBcnIudW5zaGlmdCh7IGtleTogJ2FwaURhdGEnLCB0eXBlOiAnb2JqZWN0JyB9KTtcblxuXHRcdFx0XHQvLyAgIGV2YWwgc3RyXG5cdFx0XHRcdGNvbnN0IHNjaGVtYUV2YWxTdHIgPSBzY2hlbWFUbXBBcnIubWFwKG9iakl0ZW0gPT4gb2JqSXRlbS5rZXkpLmpvaW4oJy4nKTtcblx0XHRcdFx0Y29uc3QgYXBpRXZhbFN0ciA9IGFwaVRtcEFyci5tYXAob2JqSXRlbSA9PiBvYmpJdGVtLmtleSkuam9pbignLicpO1xuXG5cdFx0XHRcdC8vICBldmFsIHJlc1xuXHRcdFx0XHRsZXQgYXBpRXZhbDtcblx0XHRcdFx0bGV0IHNjaGVtYUV2YWw7XG5cdFx0XHRcdGV2YWwoJ2FwaUV2YWwgPSAnICsgYXBpRXZhbFN0cik7XG5cdFx0XHRcdGV2YWwoJ3NjaGVtYUV2YWwgPSAnICsgc2NoZW1hRXZhbFN0cik7XG5cblx0XHRcdFx0Ly9cdGp1ZGdlIHR5cGVcblx0XHRcdFx0c3dpdGNoIChvcmlnaW5UeXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdFx0aWYgKGdldE9yaWdpblR5cGUoYXBpRXZhbCkgIT09IGdldE9yaWdpblR5cGUoc2NoZW1hRXZhbCkpIHtcblx0XHRcdFx0XHRcdFx0ZXZhbChhcGlFdmFsU3RyICsgJyA9ICcgKyBzY2hlbWFFdmFsU3RyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vXHQgVE9ETyBkbyBvdGhlciB0aGluZ3Ncblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHRcdGlmIChnZXRPcmlnaW5UeXBlKGFwaUV2YWwpICE9PSBnZXRPcmlnaW5UeXBlKHNjaGVtYUV2YWwpKSB7XG5cdFx0XHRcdFx0XHRcdGV2YWwoYXBpRXZhbFN0ciArICcgPSAnICsgc2NoZW1hRXZhbFN0cik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRwYXJzZUFwaURhdGFGcm9tU2NoZW1hKHZhbCwgLi4uYXJncy5jb25jYXQoeyBrZXk6IGl0ZW0sIHR5cGU6ICdvYmplY3QnIH0pKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdC8vXHRudW1iZXIsIHN0cmluZywgbnVsbCwgdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRpZiAoZ2V0T3JpZ2luVHlwZShhcGlFdmFsKSAhPT0gZ2V0T3JpZ2luVHlwZShzY2hlbWFFdmFsKSkge1xuXHRcdFx0XHRcdFx0XHRldmFsKGFwaUV2YWxTdHIgKyAnID0gJyArIHNjaGVtYUV2YWxTdHIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vXHRjb25zb2xlLmxvZyhpdGVtLCAnLi4uLi4uLi4uLi4nLCB2YWwsICcuLi4uLi4u5bGC57qn5YWz57O7OiAnLCBhcmdzLmNvbmNhdChpdGVtKS5tYXAoaXRlbT0+aXRlbS5rZXkpLmpvaW4oJy4nKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fShvYmosIC4uLmFyZ3MpO1xuXG5cdHJldHVybiBhcGlEYXRhO1xufTtcbiJdfQ==
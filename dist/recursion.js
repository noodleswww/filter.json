'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by noodles on 16/9/6.
 * description
 */

function parseObj(obj) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	var props = (0, _getOwnPropertyNames2.default)(obj);
	if (!props.length) {
		console.log(obj, '..................: ', args.map(function (item) {
			return item.key;
		}).join('.'));
	} else {
		props.forEach(function (item, idx) {
			var val = obj[item];
			var originType = Object.prototype.toString.call(val).match(reg).toString();
			switch (originType) {
				case 'Array':
					parseArray.apply(undefined, [val].concat((0, _toConsumableArray3.default)(args.concat({ key: item, type: 'array' }))));
					break;
				case 'Object':
					parseObj.apply(undefined, [val].concat((0, _toConsumableArray3.default)(args.concat({ key: item, type: 'object' }))));
					break;
				default:
					console.log(item, '...........', val, '.......: ', args.concat(item).map(function (item) {
						return item.key;
					}).join('.'));
			}
		});
	}
}
function parseArray(arr) {
	for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		args[_key2 - 1] = arguments[_key2];
	}

	arr.length ? arr.forEach(function (item, idx) {
		var arrEleOriginType = Object.prototype.toString.call(item).match(reg).toString();

		switch (arrEleOriginType) {
			case 'Array':
				// >二维数组
				parseArray(item);
				break;
			case 'Object':
				parseObj.apply(undefined, [item].concat(args));
				break;
			//  number, string, null, undefined
			default:
				console.log(arrEleOriginType, args);
		}
	}) : console.log(arr, args.map(function (item) {
		return item.key;
	}).join('.'));
}

function parseData(obj) {
	var props = (0, _getOwnPropertyNames2.default)(obj);
	for (var i = 0, len = props.length; i < len; i++) {
		var prop = props[i];
		var val = obj[prop];
		var originType = Object.prototype.toString.call(val).match(reg).toString();
		if (originType === 'Number' || originType === 'String') {
			console.log(originType, '.............', prop, '...........', val, '...........222222 level', level2);
			//   resArr.push({ prop: prop, val: val });
		} else if (originType === 'Array') {
			+function (val) {
				for (var j = 0, lenj = val.length; j < lenj; j++) {
					var arrEle = val[j];
					var arrEleOriginType = Object.prototype.toString.call(arrEle).match(reg).toString();
					if (arrEleOriginType === 'Number' || arrEleOriginType === 'String') {
						//   resArr.push(arrEle);
						console.log(arrEleOriginType, '.............', arrEle);
					} else if (arrEleOriginType === 'Array') {
						//  二维数组
						console.log('argument.callee');
						arguments.callee(arrEle);
					} else {
						console.log('test val////////////prop', prop, '//////');
						parseData(val[j], cachedLevel);
					}
				}
			}(val);
		} else if (originType === 'Object') {
			parseData(val, originLevel);
		} else {
			console.log(originType, '.............', prop, '...........', val);
		}
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWN1cnNpb24uanMiXSwibmFtZXMiOlsicGFyc2VPYmoiLCJvYmoiLCJhcmdzIiwicHJvcHMiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwibWFwIiwiaXRlbSIsImtleSIsImpvaW4iLCJmb3JFYWNoIiwiaWR4IiwidmFsIiwib3JpZ2luVHlwZSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIm1hdGNoIiwicmVnIiwicGFyc2VBcnJheSIsImNvbmNhdCIsInR5cGUiLCJhcnIiLCJhcnJFbGVPcmlnaW5UeXBlIiwicGFyc2VEYXRhIiwiaSIsImxlbiIsInByb3AiLCJsZXZlbDIiLCJqIiwibGVuaiIsImFyckVsZSIsImFyZ3VtZW50cyIsImNhbGxlZSIsImNhY2hlZExldmVsIiwib3JpZ2luTGV2ZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7OztBQUtBLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQWdDO0FBQUEsbUNBQU5DLElBQU07QUFBTkEsTUFBTTtBQUFBOztBQUUvQixLQUFJQyxRQUFRLG1DQUEyQkYsR0FBM0IsQ0FBWjtBQUNBLEtBQUksQ0FBQ0UsTUFBTUMsTUFBWCxFQUFtQjtBQUNsQkMsVUFBUUMsR0FBUixDQUFZTCxHQUFaLEVBQWlCLHNCQUFqQixFQUF5Q0MsS0FBS0ssR0FBTCxDQUFTO0FBQUEsVUFBTUMsS0FBS0MsR0FBWDtBQUFBLEdBQVQsRUFBeUJDLElBQXpCLENBQThCLEdBQTlCLENBQXpDO0FBQ0EsRUFGRCxNQUVPO0FBQ05QLFFBQU1RLE9BQU4sQ0FBYyxVQUFTSCxJQUFULEVBQWVJLEdBQWYsRUFBb0I7QUFDakMsT0FBSUMsTUFBTVosSUFBSU8sSUFBSixDQUFWO0FBQ0EsT0FBSU0sYUFBYUMsT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTCxHQUEvQixFQUFvQ00sS0FBcEMsQ0FBMENDLEdBQTFDLEVBQStDSCxRQUEvQyxFQUFqQjtB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LEVBQWtESCxRQUFsRCxFQUF2QjtBQUNBLFNBQUlRLHFCQUFxQixRQUFyQixJQUFpQ0EscUJBQXFCLFFBQTFELEVBQW9FO0FBQ25FO0FBQ0FwQixjQUFRQyxHQUFSLENBQVltQixnQkFBWixFQUE4QixlQUE5QixFQUErQ1EsTUFBL0M7QUFDQSxNQUhELE1BR08sSUFBSVIscUJBQXFCLE9BQXpCLEVBQWtDO0FBQ3hDO0FBQ0FwQixjQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQTRCLGdCQUFVQyxNQUFWLENBQWlCRixNQUFqQjtBQUNBLE1BSk0sTUFJQTtBQUNONUIsY0FBUUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDdUIsSUFBeEMsRUFBOEMsUUFBOUM7QUFDQUgsZ0JBQVViLElBQUlrQixDQUFKLENBQVYsRUFBa0JLLFdBQWxCO0FBQ0E7QUFDRDtBQUNELElBaEJBLENBZ0JDdkIsR0FoQkQsQ0FBRDtBQWtCQSxHQW5CTSxNQW1CQSxJQUFJQyxlQUFlLFFBQW5CLEVBQTZCO0FBQ25DWSxhQUFVYixHQUFWLEVBQWV3QixXQUFmO0FBQ0EsR0FGTSxNQUVBO0FBQ05oQyxXQUFRQyxHQUFSLENBQVlRLFVBQVosRUFBd0IsZUFBeEIsRUFBeUNlLElBQXpDLEVBQStDLGFBQS9DLEVBQThEaEIsR0FBOUQ7QUFDQTtBQUNEO0FBQ0QiLCJmaWxlIjoicmVjdXJzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG5vb2RsZXMgb24gMTYvOS82LlxuICogZGVzY3JpcHRpb25cbiAqL1xuXG5mdW5jdGlvbiBwYXJzZU9iaihvYmosIC4uLmFyZ3MpIHtcblxuXHR2YXIgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuXHRpZiAoIXByb3BzLmxlbmd0aCkge1xuXHRcdGNvbnNvbGUubG9nKG9iaiwgJy4uLi4uLi4uLi4uLi4uLi4uLjogJywgYXJncy5tYXAoaXRlbT0+aXRlbS5rZXkpLmpvaW4oJy4nKSk7XG5cdH0gZWxzZSB7XG5cdFx0cHJvcHMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpZHgpIHtcblx0XHRcdHZhciB2YWwgPSBvYmpbaXRlbV07XG5cdFx0XHR2YXIgb3JpZ2luVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLm1hdGNoKHJlZykudG9TdHJpbmcoKTtcblx0XHRcdHN3aXRjaCAob3JpZ2luVHlwZSkge1xuXHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0cGFyc2VBcnJheSh2YWwsIC4uLmFyZ3MuY29uY2F0KHsga2V5OiBpdGVtLCB0eXBlOiAnYXJyYXknIH0pKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHRwYXJzZU9iaih2YWwsIC4uLmFyZ3MuY29uY2F0KHsga2V5OiBpdGVtLCB0eXBlOiAnb2JqZWN0JyB9KSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coaXRlbSwgJy4uLi4uLi4uLi4uJywgdmFsLCAnLi4uLi4uLjogJywgYXJncy5jb25jYXQoaXRlbSkubWFwKGl0ZW09Pml0ZW0ua2V5KS5qb2luKCcuJykpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5mdW5jdGlvbiBwYXJzZUFycmF5KGFyciwgLi4uYXJncykge1xuXHRhcnIubGVuZ3RoID8gYXJyLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaWR4KSB7XG5cdFx0dmFyIGFyckVsZU9yaWdpblR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkubWF0Y2gocmVnKS50b1N0cmluZygpO1xuXG5cdFx0c3dpdGNoIChhcnJFbGVPcmlnaW5UeXBlKSB7XG5cdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdC8vID7kuoznu7TmlbDnu4Rcblx0XHRcdFx0cGFyc2VBcnJheShpdGVtKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0XHRwYXJzZU9iaihpdGVtLCAuLi5hcmdzKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHQvLyAgbnVtYmVyLCBzdHJpbmcsIG51bGwsIHVuZGVmaW5lZFxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc29sZS5sb2coYXJyRWxlT3JpZ2luVHlwZSwgYXJncyk7XG5cdFx0fVxuXHR9KSA6IGNvbnNvbGUubG9nKGFyciwgYXJncy5tYXAoaXRlbT0+aXRlbS5rZXkpLmpvaW4oJy4nKSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0YShvYmopIHtcblx0dmFyIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0dmFyIHByb3AgPSBwcm9wc1tpXTtcblx0XHR2YXIgdmFsID0gb2JqW3Byb3BdO1xuXHRcdHZhciBvcmlnaW5UeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkubWF0Y2gocmVnKS50b1N0cmluZygpO1xuXHRcdGlmIChvcmlnaW5UeXBlID09PSAnTnVtYmVyJyB8fCBvcmlnaW5UeXBlID09PSAnU3RyaW5nJykge1xuXHRcdFx0Y29uc29sZS5sb2cob3JpZ2luVHlwZSwgJy4uLi4uLi4uLi4uLi4nLCBwcm9wLCAnLi4uLi4uLi4uLi4nLCB2YWwsICcuLi4uLi4uLi4uLjIyMjIyMiBsZXZlbCcsIGxldmVsMik7XG5cdFx0XHQvLyAgIHJlc0Fyci5wdXNoKHsgcHJvcDogcHJvcCwgdmFsOiB2YWwgfSk7XG5cdFx0fSBlbHNlIGlmIChvcmlnaW5UeXBlID09PSAnQXJyYXknKSB7XG5cdFx0XHQrZnVuY3Rpb24odmFsKSB7XG5cdFx0XHRcdGZvciAobGV0IGogPSAwLCBsZW5qID0gdmFsLmxlbmd0aDsgaiA8IGxlbmo7IGorKykge1xuXHRcdFx0XHRcdHZhciBhcnJFbGUgPSB2YWxbal07XG5cdFx0XHRcdFx0dmFyIGFyckVsZU9yaWdpblR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyRWxlKS5tYXRjaChyZWcpLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0aWYgKGFyckVsZU9yaWdpblR5cGUgPT09ICdOdW1iZXInIHx8IGFyckVsZU9yaWdpblR5cGUgPT09ICdTdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHQvLyAgIHJlc0Fyci5wdXNoKGFyckVsZSk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhhcnJFbGVPcmlnaW5UeXBlLCAnLi4uLi4uLi4uLi4uLicsIGFyckVsZSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhcnJFbGVPcmlnaW5UeXBlID09PSAnQXJyYXknKSB7XG5cdFx0XHRcdFx0XHQvLyAg5LqM57u05pWw57uEXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnYXJndW1lbnQuY2FsbGVlJyk7XG5cdFx0XHRcdFx0XHRhcmd1bWVudHMuY2FsbGVlKGFyckVsZSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ3Rlc3QgdmFsLy8vLy8vLy8vLy8vcHJvcCcsIHByb3AsICcvLy8vLy8nKTtcblx0XHRcdFx0XHRcdHBhcnNlRGF0YSh2YWxbal0sIGNhY2hlZExldmVsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0odmFsKTtcblxuXHRcdH0gZWxzZSBpZiAob3JpZ2luVHlwZSA9PT0gJ09iamVjdCcpIHtcblx0XHRcdHBhcnNlRGF0YSh2YWwsIG9yaWdpbkxldmVsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2cob3JpZ2luVHlwZSwgJy4uLi4uLi4uLi4uLi4nLCBwcm9wLCAnLi4uLi4uLi4uLi4nLCB2YWwpO1xuXHRcdH1cblx0fVxufVxuIl19
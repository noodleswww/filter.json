/**
 * Created by noodles on 16/9/6.
 * description
 */

function parseObj(obj, ...args) {

	var props = Object.getOwnPropertyNames(obj);
	if (!props.length) {
		console.log(obj, '..................层级关系: ', args.map(item=>item.key).join('.'));

	} else {
		props.forEach(function(item, idx) {
			var val = obj[item];
			var originType = Object.prototype.toString.call(val).match(reg).toString();
			switch (originType) {
				case 'Array':
					parseArray(val, ...args.concat({ key: item, type: 'array' }));
					break;
				case 'Object':
					parseObj(val, ...args.concat({ key: item, type: 'object' }));
					break;
				//  number, string, null, undefined
				default:
					console.log(item, '...........', val, '.......层级关系: ', args.concat(item).map(item=>item.key).join('.'));
			}
		});
	}
}
function parseArray(arr, ...args) {
	arr.length ? arr.forEach(function(item, idx) {
		var arrEleOriginType = Object.prototype.toString.call(item).match(reg).toString();

		switch (arrEleOriginType) {
			case 'Array':
				// >二维数组
				parseArray(item);
				break;
			case 'Object':
				parseObj(item, ...args);
				break;
			//  number, string, null, undefined
			default:
				console.log(arrEleOriginType, '...........数组内部元素.......层级关系: ', args);
		}
	}) : console.log(arr, '..................层级关系: ', args.map(item=>item.key).join('.'));
}

function parseData(obj) {
	var props = Object.getOwnPropertyNames(obj);
	for (let i = 0, len = props.length; i < len; i++) {
		var prop = props[i];
		var val = obj[prop];
		var originType = Object.prototype.toString.call(val).match(reg).toString();
		if (originType === 'Number' || originType === 'String') {
			console.log(originType, '.............', prop, '...........', val, '...........222222 level', level2);
			//   resArr.push({ prop: prop, val: val });
		} else if (originType === 'Array') {
			+function(val) {
				for (let j = 0, lenj = val.length; j < lenj; j++) {
					var arrEle = val[j];
					var arrEleOriginType = Object.prototype.toString.call(arrEle).match(reg).toString();
					if (arrEleOriginType === 'Number' || arrEleOriginType === 'String') {
						//   resArr.push(arrEle);
						console.log(arrEleOriginType, '.............', arrEle);
					} else if (arrEleOriginType === 'Array') {
						//  二维数组
						console.log('argument.callee');
						arguments.callee(arrEle)
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

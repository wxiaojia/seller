export function formatDate(date,fmt){
	//  /(y+)/正则：已y开头一个或多个的字符串
	//  字符串中有replace方法
	//$1,指的是与正则表达式匹配的第一个,提换成年
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
	}

	let o={
		'M+':date.getMonth()+1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes(),
		's+':date.getSeconds()
	};
	//遍历对象，
	for(let k in o){
		if(new RegExp(`(${k})`).test(fmt)){
			let str=o[k]+'';
			fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1?str:padLeftZero(str)));
		}
	}
	return fmt;
};
// 单位数时前面补零
function padLeftZero(str){
	return ('00'+str).substr(str.length);
}

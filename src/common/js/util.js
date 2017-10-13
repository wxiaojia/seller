//解析url参数，返回对象，将参数部分，如localhost：8080/?id=1234&a=b/#/ratings中的?id=12345&a=b的解析,可以用window.location.search找到
export function urlParse(){
	let url=window.location.search;
	let obj={};//解析字符串
	let reg=/[?&][^?&]+=[^?&]+/g;
	let arr=url.match(reg);//arr数组
	if(arr){
		arr.forEach((item)=>{
			let tempArr=item.substring(1).split('=');
			//decodeURLComponent:带URL参数，所以要用
			let key=decodeURIComponent(tempArr[0]);
			let val=decodeURIComponent(tempArr[1]);
			obj[key]=val;
		});
	}
	return obj;
};
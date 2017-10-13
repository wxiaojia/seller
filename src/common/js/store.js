//存储
export function saveToLocal(id,key,value){
	//存到localStorage中
	let seller=window.localStorage._seller_;
	if(!seller){
		seller={};
		seller[id]={};
	}else{
		//parse进行解析成对象
		seller=JSON.parse(seller);
		if(!seller[id]){
			seller[id]={};
		}
	}
	seller[id][key]=value;
	window.localStorage._seller_=JSON.stringify(seller);
};
//读取
export function loadFromLocal(id,key,def){
	let seller=window.localStorage._seller_;
	if(!seller){
		return def;
	}
	seller=JSON.parse(seller)[id];
	if(!seller){
		return def;
	}
	let ret=seller[key];
	return ret||def;
};

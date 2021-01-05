export function deepClone(data: any): any{
  // 基本类型
  if(!checkIsReferenceType(data)){
    return data;
  }

  // 引用类型, 需要根据类型进行初始化
  if(data instanceof Array){
    let dist = [];
    for(let key in data){
      dist[key] = deepClone(data[key]);
    }
    return dist;
  } else if(data instanceof Function){
    let dist = function() {
      return data.apply(this, arguments);
    };
    for(let key in data){
      dist[key] = deepClone(data[key]);
    }
    return dist;
  } else {
    let dist = {};
    for(let key in data){
      dist[key] = deepClone(data[key]);
    }
    return dist;
  }

}

// 判断是否是引用类型
export function checkIsReferenceType(data){
  let isReferenceTypeFlag;

  if(data === null){
    // typeof 特殊情况 1: null 返回的是 object,应该是 null 才对
    isReferenceTypeFlag = false;
    return isReferenceTypeFlag;
  } else if(typeof data === 'function'){
    // typeof 特殊情况 2: function 返回的是 function,应该是 object 才对
    isReferenceTypeFlag = true;
    return isReferenceTypeFlag;
  } else {
    // 处理完特殊情况后, 再处理正常情况
    isReferenceTypeFlag = typeof data === 'object';
    return isReferenceTypeFlag
  }
}

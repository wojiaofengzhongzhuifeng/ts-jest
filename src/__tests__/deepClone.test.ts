import { deepClone, checkIsReferenceType } from '../deepClone';


test('可以判断数据是基本类型还是引用类型', ()=>{
  let booleanData = true;
  let stringData = '12';
  let number = 1;
  let undefinedData = undefined;
  let nullData = null;
  let symbolData = Symbol();
  let arrayData = [];
  let objectData = {};
  let fnData = ()=>{};

  expect(checkIsReferenceType(booleanData)).toBe(false);
  expect(checkIsReferenceType(stringData)).toBe(false);
  expect(checkIsReferenceType(number)).toBe(false);
  expect(checkIsReferenceType(undefinedData)).toBe(false);
  expect(checkIsReferenceType(nullData)).toBe(false);
  expect(checkIsReferenceType(symbolData)).toBe(false);
  expect(checkIsReferenceType(arrayData)).toBe(true);
  expect(checkIsReferenceType(objectData)).toBe(true);
  expect(checkIsReferenceType(fnData)).toBe(true);

})

test('可以复制基本类型: string, number, undefined, null, boolean, symbol', ()=>{

  // string
  let string = '1';
  let cloneString = deepClone(string);
  expect(cloneString).toBe(string);
  string = '2';
  expect(cloneString).not.toBe(string);

  // number
  let number = 1;
  let cloneNumber = deepClone(number);
  expect(cloneNumber).toBe(number);
  number = 2;
  expect(cloneNumber).not.toBe(number);

  // undefined
  let undefinedData;
  let cloneUndefined = deepClone(undefinedData);
  expect(cloneUndefined).toBe(undefinedData);
  undefinedData = 1;
  expect(cloneUndefined).not.toBe(undefinedData);

  // null
  let nullData = null;
  let cloneNull = deepClone(nullData);
  expect(cloneNull).toBe(nullData);
  nullData = 1;
  expect(cloneNull).not.toBe(nullData);

  // boolean
  let booleanData = true;
  let cloneBoolean = deepClone(booleanData);
  expect(cloneBoolean).toBe(booleanData);
  booleanData = false;
  expect(cloneBoolean).not.toBe(booleanData);

  // symbol
  let symbolData = Symbol();
  let cloneSymbol = deepClone(symbolData);
  expect(cloneSymbol).toBe(symbolData);
  symbolData = Symbol();
  expect(cloneSymbol).not.toBe(symbolData);
})

test('可以复制普通对象 + 嵌套的对象', ()=>{
  let objData = {
    name: 'rjj',
    child: {
      name: 'rjjx'
    }
  };
  let cloneObj = deepClone(objData);
  expect(cloneObj).not.toBe(objData);
  expect(cloneObj.name).toBe(objData.name);
  objData.name = 'rjj1';
  expect(cloneObj.name).not.toBe(objData.name);

  expect(cloneObj.child).not.toBe(objData.child);
  expect(cloneObj.child.name).toBe(objData.child.name);
  objData.child.name = 'rjjx1';
  expect(cloneObj.child.name).not.toBe(objData.child.name);
})

test('可以复制普通对象 + 嵌套数据为数组', ()=>{
  let objData = {
    name: 'rjj',
    parent: [{
      name: 'ming'
    }]
  };
  let cloneObj = deepClone(objData);
  expect(cloneObj).not.toBe(objData);
  expect(cloneObj.parent[0].name).toBe(objData.parent[0].name);
  expect(cloneObj.parent).not.toBe(objData.parent);
  objData.parent[0].name = 'ming1';
  expect(cloneObj.parent[0].name).not.toBe(objData.parent[0].name);

  expect(cloneObj.parent instanceof Array).toBe(true)
})

test('可以复制数组', ()=>{
  let arrayData = [[1,2], [3, 4]];
  let cloneArray = deepClone(arrayData);

  expect(cloneArray).not.toBe(arrayData);

  expect(cloneArray[0]).not.toBe(arrayData[0]);
  expect(cloneArray[0][0]).toBe(arrayData[0][0]);

  arrayData[0][0] = 123321;

  expect(cloneArray[0][0]).not.toBe(arrayData[0][0]);

})

test('可以复制函数', ()=>{
  let fnData = {
    name: 1,
    fn: (a, b)=>{return a+b}
  };
  let cloneFnData = deepClone(fnData);

  expect(cloneFnData).not.toBe(fnData);

  expect(cloneFnData.fn).not.toBe(fnData.fn);
  expect(cloneFnData.fn(3,4)).toBe(fnData.fn(3,4));

  expect(cloneFnData.name).toBe(fnData.name);


})
import EventBus from '../index';
test('EventBus 是一个类,可以构造对象', () => {
  let eventBus = new EventBus();
  expect(typeof eventBus).toBe('object');
});

test('eventBus 对象有三个方法, 分别是 on, emit, off', ()=>{
  let eventBus = new EventBus();
  expect('on' in eventBus).toBe(true);
  expect('emit' in eventBus).toBe(true);
  expect('off' in eventBus).toBe(true);
})

test('on 函数定义的方法可以触发', ()=>{
  let mockFn = jest.fn();
  let eventBus = new EventBus();
  eventBus.on('click1', mockFn);
  eventBus.emit('click1', 'data');

  expect(mockFn).toBeCalled();
})

test('可以为一个事件定义多个函数', ()=>{
  let mockFn = jest.fn();
  let eventBus = new EventBus();
  let mockFn1 = jest.fn();

  eventBus.on('click1', mockFn);
  eventBus.on('click1', mockFn1);
  eventBus.emit('click1', 'data');

  expect(mockFn).toBeCalled();
  expect(mockFn1).toBeCalled();

})


test('on 函数定义的方法可以被触发,并且能获取到 emit 发出的数据', ()=>{
  let mockFn = jest.fn();
  let eventBus = new EventBus();
  eventBus.on('click1', mockFn);
  eventBus.emit('click1', 'data');

  expect(mockFn).toHaveBeenCalledWith('data');
})

test('off 函数生效', ()=>{
  let mockFn = jest.fn();
  let eventBus = new EventBus();
  let mockFn1 = jest.fn();
  let mockFn2 = jest.fn();


  eventBus.on('click1', mockFn);
  eventBus.on('click1', mockFn1);
  eventBus.on('click1', mockFn2);
  eventBus.off('click1', mockFn1);
  eventBus.emit('click1', 'data');

  expect(mockFn).toBeCalled();
  expect(mockFn1).not.toBeCalled();
  expect(mockFn2).toBeCalled();

})

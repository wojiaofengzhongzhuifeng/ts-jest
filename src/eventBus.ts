class EventBus {
  private map: {};
  constructor() {
    this.map = {}
  }
  on(eventName, fn){
    if(!(Object.keys(this.map).includes(eventName))){
      this.map[eventName] = [];
    }
    this.map[eventName].push(fn);
  }
  emit(eventName, data){
    let needExecFnList = this.map[eventName];
    if(needExecFnList){
      needExecFnList.forEach((fn)=>{
        fn(data)
      })
    }
  }
  off(eventName, fn){
    let fnList = this.map[eventName];
    let needRemoveIndex = fnList.indexOf(fn);

    if(needRemoveIndex !== -1){
      fnList.splice(needRemoveIndex, 1)
    }
  }
}

export default EventBus;

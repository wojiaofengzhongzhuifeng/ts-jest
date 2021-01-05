## 介绍

实现常用的 js 代码, 在分支查看不同代码

## eventBus 需求

  - 实现 on
    
  - 实现 emit
    
  - 实现 off

## deepClone 需求

  - 序列化/反序列化 => 递归克隆

  - 由于「序列化/反序列化」借用了 JSON 的 [语法](https://www.json.org/json-en.html) , 只能识别「对象, 数组, 字符串, 数字, true/false, null」,  其他数据类型都需要重新处理

## 根据配置项生成表单

### fork from：https://github.com/woai3c/vue-form-maker

### 用法：https://github.com/woai3c/vue-form-maker/blob/master/doc.md

### 改动
- 增加 componentLibMapping ，处理不同 ui 库的组件名映射
- formData 从 props-options 中独立出来，命名为 model
- props-options 中的 formItem 改成 formItems
- 增加 visible 属性，实现 formItem v-if 指令
- generateColComponent - 增加 key 属性，解决 Vue-DOM 复用的bug
  - ref：https://cn.vuejs.org/v2/api/#key
- 增加 instance 属性，提供 form 实例给父级
- formItems 从 props-options 中独立出来，命名为 formItems

### props
- model
- instance
- formItems
- options
  - formProps
  - formEvents

### 备注
- events 属性中的事件想要使用 this 作用域，必须使用在 vue-methods 中定义好的 method。出于这点考虑，不再通过支持 children 类型为函数的形式来实现表单项之间 children 的动态配置，通过 events 已经可以满足要求
- 场景 - 下拉框多级联动（provice、city、county），event-select 中直接修改 formItems-city 对应的 children
  - 初始化 formItems-city 对应的 children 为[]，对 children 操作时，变化数组方法（push、pop）、直接替换都可以
  - 初始化 formItems-city 对应的 children 为 this.attrName（data/computed），对 this.attrName 操作只能使用变化数组方法（push、pop）。直接替换 this.attrName 无效，因为替换操作只是更新了 this.attrName 的引用，children 所对应的引用还是老的，即 this.attrName 之前的引用，还是空数组
  - ref：https://vuejs.org/v2/guide/list.html#Array-Change-Detection


### Fix
1. el-input，placeholder 属性无效
```
  {
    type: "input",
    key: "accout",
    label: "账号",
    props: {
      placeholder: "请输入账号...",
    },
  },
```
原因：jsx - props vs attrs props 只接收组件声明的属性，其余属性使用 attrs 接收 ，在 utils-generateInputComponent 中属性全部通过 props 传入，el-input 的 props 声明中其实不存在该属性
方案：改造 utils-generateInputComponent，增加 attrs 属性，为了使用方便，直接将外部 attrs = obj.props 
ref：
* https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
* https://github.com/ElemeFE/element/blob/v2.13.0/packages/input/src/input.vue

### Feature
1. 支持"native"修饰符
2. 支持"stop、prevent、self、enter"修饰符
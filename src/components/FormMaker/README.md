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

### 备注
- events 属性中的事件想要使用 this 作用域，必须使用在 vue-methods 中定义好的 method。出于这点考虑，不再通过支持 children 类型为函数的形式来实现表单项之间 children 的动态配置，通过 events 已经可以满足要求
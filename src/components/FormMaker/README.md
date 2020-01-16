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

### props
- model
- options
  - formItems
  - formProps
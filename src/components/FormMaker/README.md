## 根据配置项生成表单

### fork from：https://github.com/woai3c/vue-form-maker

### 用法：https://github.com/woai3c/vue-form-maker/blob/master/doc.md

### 改动
- 增加 componentLibMapping ，处理不同 ui 库的组件名映射
- formData 从 props-options 中独立出来，命名为 model
- props-options 中的 formItem 改成 formItems

### props
- model
- options
  - formItems
  - formProps
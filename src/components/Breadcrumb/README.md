## 面包屑-核心问题

### 面包屑路由跳转 - $route.matched
方案：$route.matched 中的路由配置依次解析为面包屑，最后一个面包屑设置的 path 为空字符串，避免跳转

### 隐藏整个面包屑 - hideWholeBreadcrumb
场景：某些路径下，要求不显示整个导航栏

### 隐藏单个面包屑 - hideBreadcrumb
场景：某些面包屑不能出现在导航栏

### 动态设置面包屑 - dynamicBreadcrumb
场景：面包屑中显示的名字根据路由参数而定
## 侧边栏-核心问题

### 默认激活菜单 - activeIndex
子级不可见时，使用父级路径

### 路径解析 - normalizePath
路由配置中子级使用相对或绝对路径

### routes 路由项改造 - createRouteMap
将 routes 数组转成 map 对象，方便利用 name 或者 path 获取路由配置，并在原有属性基础上增加 parent 属性，记录父级路由配置

### menus 菜单项识别 - getMenus
routes 中的路由项由业务需要可以拆分成不同模块，每个模块需要显示的 menus 不同，利用 vue-route - $route.matched 获取到第一个可见的路由项，再从之前的 map 中找到需要显示的 menus
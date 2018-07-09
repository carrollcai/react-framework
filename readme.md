### next.js
- next/link
1. 页面间的路由跳转是客户端决定的，但是当刷新页面的时候，需要先从server-side将页面的数据返回给页面，所以服务端要先匹配。
2. 当你点浏览器回退按钮的时候，完全是由客户端的location.history控制。因为每次客户端的跳转，next都帮你做好了路由与history的绑定。
3. 默认路由与pages目录下的文件名匹配。

- Link组件是一个higher order component
引申，高阶组件只接受固定参数以及some props，不接受style。

- fetch data
next为React组件新增了一个特性，getInitialProps（有点类似getInitialState），他可以处理组件的属性值，并返回组件的默认属性，服务端获取数据可以通过这个方法。
页面刷新，会从服务端fetch数据
页面正常跳转，会从客户端fetch数据

- 页面加载
每次页面加载的时候，数据会直接写入到页面里，通过`__NEXT_DATA__`，可写入props，关联到前台的props（这件事next会帮你做好），前台就可以直接调用props。

- 样式的处理
用了一种css in js的方法，引入标签，`<style jsx>`，nextjs使用babel插件解析style-jsx，它支持样式命名空间，未来还支持变量赋值。

- 状态管理
需要集成next版的redux，next-redux-wrapper插件实现

### next优势
- 默认开启服务端渲染，以文件为系统为基础的客户端路由（路由有客户端实现）
- 代码自动分离，页面加载的更快（按需加载）
- （以页面为基础的）简洁的客户端路由（借助next的Link API）
- 以webpack为热更替为基础开发环境
- 使用react的JSX和ES6的Module
- 可以运行在express或者其他node框架的http服务器上
- 可以定制化自己的babel和webpack

```js
// install
npm install

// run app
node server.js
or `npm start`

// deploy
npm run build
npm run start
```

### 服务端页面缓存
主要用到lru-cache这个库

```js
const LRUcache = require('lru-cache');

const ssrCache = new LRUcache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1 hour
});
function getCacheUrl(ctx) { return ctx.url};


function renderAndCache(ctx, pagePath, noCache, queryParams = null) { 
  let key = getCacheUrl(req);
  // ...
  if (noCache === 'noCache') { // 如何页面不允许开启缓存
    app.render(req, res, actualPage, queryParams)
  } else {
    if (ssrCache.has(key)) {
      req.body = ssrCache.get(key);
      app.render(req, res, actualPage, queryParams)
    }
  }

  // ...
  // 如果页面允许开启缓存，且不再缓存里。
  ssrCache.set(key, res.body)
}

```

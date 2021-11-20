2021.11.20 更新

手写了一个Demo，解决了缩进嵌套的问题，nice～

Demo已更新到Demo文件夹，还有些代码需要抽离、复用一下

---

线上地址：已废弃(原域名已释放，2021.11.20才发现，不好意思)

演示、总结视频：https://upyun.hokori.online/2021-03-17/bd_markdown.mp4

### 项目基本需求（做的时候一定要记得这个，不要做偏了🔒）

- 实现一个左右结构的Markdown编辑器（左边编辑，右边实时预览）
- 完全支持 [Github 的标准Markdown语法](https://github.github.com/gfm/)
- 顶部要有快捷工具栏



### 个人理解

由于这是一次训练，所以还是不采用库去实现 `Markdown` 解析了，这里直接采用的自己写的，存留一些 bug。

同时，我认为这是一个产品，我需要负责好它完整的业务流程，所以添加了登录注册等功能，以便增强用户体验。



### 个人实现目标

> 因为是一个训练营项目，并不是在搬砖而是要发挥自由意志，所以想让自己在完成需求的同时越开心越自由越快乐越好，因此制定了像打游戏通关一样的小目标，嘿嘿😀
>
> 不好高骛远，先专注完成必须得做的，剩下的交给快乐😄



#### 第一阶段(完成基础需求)

- [x] 实现编辑器页面的完整、流畅的布局

- [x] 完成 `markdown`语法转换 `html`的功能

- [x] 实现快捷工具栏

#### 第二阶段(接后端，保证产品的完整性)

- [ ] 实现自动部署
- [x] 扩展登录注册页、所有文章页路由、文章详情展示（采用动态路由）
- [x] 实现邮箱分发注册账户的验证码
- [x] 采用 `token` 实现状态和鉴权
- [x] 实现文章存储功能（采用`Koa2`、`mongoDB`、`mongoose`）

- [x] 更改头像

- [x] 完成所有文章页
- [x] 文章详情展示

#### 第三阶段（文章共享及协同编辑，说实话这个纯粹是得尽力的挑战，有点赶，尽可能通关到这个阶段吧，快乐就完事了😎）

- [x] 完成文章的重新编辑
- [x] 完成文章的共享功能
- [x] 完成协同编辑（其实不算完成，只是实现多用户对同一个文章操作）

- [x] 添加 websocket



### 项目实现及设计

#### 规范

- Git提交：在项目初期采用分支开发，`client-develop`是前端分支，`server-develop`是后端分支，`main`分支是完整功能的更新。后期考虑到方便性和时间缘故，统一在`main`更新每一个完善版本
- CSS命名：采用 `BEM` 命名规范
- 版本提交信息规范
  - `feat`: 功能更新
  - `docs`: 文档更新
  - `fix`: 修补 bug
- 响应数据格式
  - code: 0 | 1,  0: 成功；1: 失败
  - msg: 响应信息
  - data: 响应相关业务数据
- 设置错误码

#### 技术栈

##### 前端：

- React
- react-router-dom / react-router
- react-redux
- redux
- Ant-Design
- react-router-config
- axios

##### 后端：

- Koa2及相关生态
- MongoDB
- mongoose
- nodemailer
- websocket



#### 项目结构

##### 前端

```
- src
	- modules (项目组件)
		- Article （首页组件）
		- Cooperation （协作编辑页面组件）
		- Edit （编辑页面组件）
		- Home （文章详情页面组件）
		- LoginAndRegister （登录注册页面组件）
		- NotFound （404 not found 页面组件）
	- static（静态资源）
	- store （redux管理数据逻辑）
	- util （一些封装模块）
		- fetch.js （对axios进行二次封装）
		- markdown-particle.js（手写的 markdown 解析器）
		- message.js （手写的前端数据模型）
		- token.js （前端 token 状态处理）
		- tool-bar.js (对快捷工具栏进行封装)
	- App.js （项目主组件，用于盛放路由渲染）
	- index.js （入口文件）
	- routes.js （路由集中配置，采用 react-router-config)
	- service.js （集中前端请求接口）
	- package.json （项目配置）
```

##### 后端

```
- server
	- bin
	- config (配置信息)
		- emailConfig.js （邮箱服务信息配置）
		- resultModel.js （响应接口数据模型）
	- controller (与数据库交互的逻辑层)
	- db （数据库模型、连接等操作）
	- middleware/jwt （关于 jsonwebtoken 的一些逻辑，创建、分配 token）
	- routes （后端 API）
	- app.js
```



#### 页面及鉴权

采用了 `token` 对数据进行状态管理，将 `token` 设置在了请求头中，且用 `window.localStorage` 对 `token` 进行缓存。

```js
//  client/src/util/token.js

import axios from 'axios'


const site = "BYTEDANCE_LCH"

export const storeToken = token => {
    window.localStorage.setItem(site, token)
}

export const getToken = () => {
    return window.localStorage.getItem(site)
}

export const configReq = () => {
    const token = getToken()
    console.log(token)
    if (token) {
        axios.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`
            return config
        })
        
    } 
}

export const removeToken = () => {
    return window.localStorage.removeItem(site)
}
```



- `/` : 首页，无权限限制
- `/sign`: 登录注册页面，如果判定已经登录（及携带未过期  `token ` ）则直接跳转至 `/`
- `/edit`: 编辑页面，如果判定尚未登录（及未携带 `token `或 `token` 已过期）则直接跳转至 `/`

- `/article/:id`: 文章详情页面， 无权限限制，采用动态路由，`id`代表每篇文章在数据库中存储的`id`

- `/cooperation/:id`: 协同编辑页面，只有作者分享了此篇文章，才可以进行共同编辑，同样采用动态路由。若作者分享了此页面，登录的用户可进行编辑，未登录用户则无法访问。
- `/*`: 未匹配到的页面，返回 `404 not found`



#### 接口设计

此次请求库采用 `axios`， 同时对请求进行了二次封装，能够方便地进行异步管理：

```js
//  client/src/util/fetch.js
import axios from 'axios'

export default function fetch(rootPath) {
    return function(method, path, data) {
        return new Promise((resolve, reject) => {
            if (method === 'get') {
                axios.get(rootPath + path)
                .then(res => {
                    resolve(res.data)
                })
            }

            if (method === 'post') {
                axios.post(rootPath + path, data)
                .then(res => {
                    resolve(res.data)
                })
            }
        })
    }
}
```



```js
//  client/src/service.js
import fetch from './util/fetch'

const rootPath = 'http://127.0.0.1:4000/api'
const axios = fetch(rootPath)

export async function login(data) {
    const res = await axios('post', '/user/login', data)
    return res
}

export async function captcha(data) {
    const res = await axios('post', '/user/captcha', data)
    return res
}

export async function register(data) {
    const res = await axios('post', '/user/register', data) 
    return res
}


export async function checkToken() {
    const res = await axios('get', '/user/token')
    return res
}

export async function postArticle(payload) {
    const res = await axios('post', '/user/post-article', payload)
    return res
}

export async function getArticle() {
    const res = await axios('get', '/user/article-list')
    return res
}

export async function getDetails(id) {
    const res = await axios('post', '/user/article-detail', {id})
    return res
}

export async function upDateArticle(payload) {
    const res = await axios('post', '/user/article-update', payload)
    return res
}
```



#### 响应数据模型

在服务端，设计了两种响应模型：`SuccessModel` 和 `ErrorModule`，使得响应数据统一

```js
//   server/config/resultModel.js
 class BaseModel {
    constructor(data, msg) {
        if (typeof data === 'string') {
            this.msg = data
            data = null
            msg = null
        }

        if (data) {
            this.data = data
        }

        if (msg) {
            this.msg = msg
        }
    }
}

// successful result model
class SuccessModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.code = 0
    }
}

// error result model
class ErrorModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.code = 1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
```





#### 前端数据管理

采用 `redux` 进行数据管理，使用 `react-redux` 简化对`redux`的操作。

存储的数据类型：

- 全局数据：为了减少不要的请求
- Markdown 语法解析：方便接入个人手写的解析模块，并且能够将操作集中起来，方便不同组件使用



### 资源分享及问题收集

[移步 issues 区](https://github.com/Zen-Uni/tech-training-camp-frontend/issues)

这么做的目的是：

1、伙伴们在群里讨论的时候，共享的资源没有很好的收集起来，再进行查找会非常的不方便，所以我将大家分享的资源和我个人分享的都放到 `issues`了（伙伴们分享的已征得许可，放置仓库）

2、将大家的问题集中起来，避免再次踩坑，方便大家梳理思路和完善逻辑



### 心路历程

emmmm，快乐就完事了😁

很感谢导师们在工作之余抽时间来录课💓

也很开心认识了伙伴们，好几个伙伴还加了微信，这波赚了💪

但是美中不足的就是，伙伴们太少一起讨论实际的功能细节，我真的很想体验一起协作的感觉，有些许遗憾😭

最后，希望导师们、HR小姐姐们、伙伴们，天天开心！快乐就完事啦！芜湖⭐

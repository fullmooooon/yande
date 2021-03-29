# yande
Yande.re  popular_by_month 图片爬虫

发现yande上的每月popular的图片都很棒！所以写了这个工具自动下载

# 如何使用

首先确保你安装了nodejs

电脑可以直接访问yande.re(修改hosts)或启用了代理

当然如果没有代理下载会很慢，比如v2ray下的代理可以把下面的注释给打开

```
// const globalProxyAgent = createGlobalProxyAgent()  
// globalProxyAgent.HTTP_PROXY = 'http://127.0.0.1:10809'
```

## 打开cmd，依次执行

`cd (你的路径)/yande`

`npm i`

`node .\nodeServer.js`

接下来会自动把2018-2020年每月流行的图片(包括tag:e)下载到项目下的 ./dist文件夹中

可以多次执行`node .\nodeServer.js`，每次对于已存在的图片不会重复下载

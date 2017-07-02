# boc-libaoxu-build
boc.libaoxu.cn通用build层


## 使用方式
放到父项目下, 跟package.json 同级, 执行如下命令

``` bash  

开发环境
npm run dev

生产环境
npm run build


生产环境: 测试
npm run build:test

生产环境: 灰度
npm run build:gray

生产环境: 线上
npm run build

```

### 优化

1. 将大型库外链

2. 将库预编译

3. 减少构建搜索

4. 利用缓存

5. happypack 并行打包

6. commonPluginChunk 提取公共模块

7. 优化代码丑化

8. code split
  require.ensure
  router

8. tree shaking

```
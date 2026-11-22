# Kids Learning Hub · 儿童学习知识库

Kids Learning Hub 用来整理孩子在阅读、观察和日常学习中遇到的问题。每个专题可以围绕一个孩子能问出来的问题，结合简短解释、熟悉的例子和配图或互动，帮助孩子理解概念，再用自己的话讲一遍。

内容可以从经典阅读延伸到数学、自然科学、历史地理和生活常识。家长也可以把专题当作共读、讨论和复习的材料。

## 在线访问

- 站点首页：[https://kids-learning-hub-abq.pages.dev/](https://kids-learning-hub-abq.pages.dev/)
- 《西游记》西行路线与妖怪地图：[https://kids-learning-hub-abq.pages.dev/xiyouji/](https://kids-learning-hub-abq.pages.dev/xiyouji/)

## 学习专题

| 专题 | 可以学到什么 | 线上路径 |
| --- | --- | --- |
| [《西游记》西行路线与妖怪地图](docs/xiyouji.md) | 按回目串联取经故事，通过地图比较小说地点、现代地理参照和玄奘史实路线。 | `/xiyouji/` |

站点首页为 [topics/index.html](topics/index.html)，提供专题导航。专题页面和资源放在 [topics/](topics/)，每个专题的目录名就是它的访问路径。例如 [topics/xiyouji/](topics/xiyouji/) 对应 `/xiyouji/`。专题设计文档放在 [docs/](docs/)。

## 本地预览

在项目根目录启动一个静态文件服务。

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory topics
```

在浏览器打开 [http://127.0.0.1:8000/xiyouji/](http://127.0.0.1:8000/xiyouji/)。地图需要联网加载 JavaScript 库和底图。

## 部署与维护

项目使用静态 HTML，通过 Cloudflare Pages 的 GitHub 集成发布。Cloudflare 中的部署配置如下：

- 生产分支：`main`
- 构建命令：无（留空）
- 构建输出目录：`topics`

代码推送到 GitHub 的 `main` 分支后，由 Cloudflare 自动部署。`topics/` 作为站点根目录，因此 [topics/xiyouji/](topics/xiyouji/) 的线上访问路径为 `/xiyouji/`。新增或改名专题时，需要同步检查文档链接和实际访问路径。

协作说明见 [AGENTS.md](AGENTS.md)。项目使用 [MIT 许可证](LICENSE)。

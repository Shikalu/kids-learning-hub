# 站点首页设计与素材

## 设计口径

首页入口为 `topics/index.html`。视觉样式与《西游记》专题保持一致，使用米白背景、暖金标记、细边框、系统字体和相同的信息标签。桌面端为双列专题卡片，窄屏切换为单列。

四个专题均使用摄影封面，下载后保存在 `topics/assets/home/`，页面运行时不依赖第三方图片服务。封面采用相同比例和色彩处理，保持统一的视觉效果。

## 图片来源

西游记封面使用 Wikimedia Commons 明确标记为 **Public Domain（公有领域）** 的素材；其他图片来自 Unsplash，按 [Unsplash License](https://unsplash.com/license) 使用。记录原始图片地址，便于后续核查和替换。

| 文件 | 内容 | 原始来源与授权 |
| --- | --- | --- |
| `topics/assets/home/xiyouji.jpg` | 颐和园长廊《西游记》唐僧师徒彩绘，三打白骨精场景 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Journey_to_the_West_at_Long_Corridor.JPG)；Public Domain，无需署名；摄影 Shizhao，绘画作者不详，原画创作于 19 世纪末 |
| `topics/assets/home/math.jpg` | 数学公式 | [Unsplash 原始图片](https://images.unsplash.com/photo-1509228468518-180dd4864904) |
| `topics/assets/home/english.jpg` | 书籍与阅读空间 | [Unsplash 原始图片](https://images.unsplash.com/photo-1481627834876-b7833e8f5570) |
| `topics/assets/home/history.jpg` | 长城与山岭 | [Unsplash 原始图片](https://images.unsplash.com/photo-1508804185872-d7badad00f7d) |

## 更新后核对

1. 检查 `/` 能打开首页，西游记卡片能进入 `/xiyouji/`。
2. 检查四张本地图片均能加载，并核对窄屏下的卡片比例。
3. 替换图片时保留有意义的替代文本，并同步更新来源记录。

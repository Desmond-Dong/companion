---
title: "通用链接、NFC 和 QR 标签"
id: 'universal-links'
---

对这些功能的支持正在积极开发中，可能尚未完全发布。

| 功能      | ![iOS](/assets/iOS.svg) | ![Android](/assets/android.svg) Android |
| --------- | ----------------------------- | --------------------------------------- |
| NFC 标签  | 2020.5                        | 2.2.0                                   |
| QR 标签   | 2020.5                        | 2.2.0                                   |
| 旧式     | 2019.1                        | 不支持                                   |

## NFC 标签与 QR 代码

Home Assistant 支持将标签扫描作为自动化的触发器。扫描的标签会收集到 [设置中的标签面板](https://my.home-assistant.io/redirect/tags/)。这使你可以轻松管理已用标签并为它们命名。

Home Assistant NFC 标签或 QR 代码包含一个 URL，当该标签被扫描时将触发标签扫描事件。格式为 URL `https://www.home-assistant.io/tag/<标签 ID>` 以便 Android/iOS 知道将其路由到我们的应用。应用将提取标签标识符并直接发送到你的实例。

- ![iOS](/assets/iOS.svg)将设备靠近 NFC 标签或扫描 QR 代码会显示一个通知，点击后会启动应用并触发事件。
- ![Android](/assets/android.svg) 在 Android 上，将设备靠近 Home Assistant NFC 标签或扫描 QR 代码会触发一个事件。

触发的事件在 iOS 和 Android 上是相同的：`tag_scanned`。例如，在自动化中，你可以使用 [标签触发器](https://www.home-assistant.io/docs/automation/trigger/#tag-trigger) 来处理这些事件：

```yaml
# 对于 https://www.home-assistant.io/tag/50A3C7C8-1FE7-4BE8-8DC9-06E07D41B63D
automation:
- alias: 解锁门
  trigger:
    - platform: tag
      tag_id: 50A3C7C8-1FE7-4BE8-8DC9-06E07D41B63D
  action:
    # ...
```

这两个应用都支持读取和写入 NFC 标签。你可以使用随机生成的标签值（如上所示）或自定义标签值。

:::info
某些 NFC 标签为只读，不能用作 Home Assistant NFC 标签。其他可能在第一次写入后会变为只读。
:::

## 写入 NFC 标签

你可以通过打开应用 -> [设置](https://my.home-assistant.io/redirect/config/) -> 伴侣应用 -> NFC 卡 -> 写入 来写入 NFC 标签。

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Xc120lClUgA" frameborder="0" allowfullscreen></iframe>
</div>

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/xE7wm1bxRLs" frameborder="0" allowfullscreen></iframe>
</div>

## 旧式通用链接

![iOS](/assets/iOS.svg)<br />
通用链接是 [URL 处理程序](integrations/url-handler.md) 和 [X 回调 URL](integrations/x-callback-url.md) 的替代方案。

该应用已将所有 `https://www.home-assistant.io/ios/` 下的 URL 注册为有效的通用链接。然而，目前该应用只能理解一个通用链接：

`https://www.home-assistant.io/ios/nfc/?url=<您可以使用现有 URL 处理程序的 URL>`

这使得 NFC 支持成为可能。你可以写入一个带有 NDEF URL 的 NFC 标签，如上所示，每当你的设备看到该 NFC 标签时，将出现通知，让你打开应用。

一旦你打开应用，它将执行你在 URL 中指示的任何操作。

如果多个服务器连接到 iOS 或 Mac 应用，当打开通用链接时，将提示你选择一个服务器。
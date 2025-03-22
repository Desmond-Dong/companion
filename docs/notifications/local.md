---
title: "本地推送"
id: "notification-local"
---

本地推送使用 [WebSocket API](https://developers.home-assistant.io/docs/api/websocket) 来将通知发送到您的设备，而不是使用苹果的推送通知服务或谷歌的 Firebase 云消息传递。

| 平台 | 版本 |
| -------- | ------- |
| ![iOS](/assets/iOS.svg) | 2021.7 |
| ![macOS](/assets/macOS.svg) | 2021.7 |
| ![Android](/assets/android.svg) | 2022.2 |

:::info
本地推送要求 HA core-2021.6 或更高版本，并结合上述受支持的平台。
:::

## 需求

![iOS](/assets/iOS.svg) 有一些限制：

1. 本地推送仅在通过内部 URL 连接时发生，并且需要配置 SSID 以被视为内部。这是一个操作系统限制，因为此功能旨在用于低或最小连接情况。
2. 尽管很小，但启用本地推送时，电池使用量会略有增加，因为它与您的 HA 服务器保持持续连接。您可以在服务器的连接设置中禁用它。

![macOS](/assets/macOS.svg) 只要应用程序正在运行，将始终保持本地推送连接，并且不会对电池产生额外影响。

![Android](/assets/android.svg) 将根据您的配置保持本地推送连接。为了保持此连接，应用程序需要创建一个持久通知，您可以最小化设备上的 `持久连接` 通知频道以隐藏它。根据您的设置，这可能对电池寿命产生不利影响。如果您使用的是最小版本，您将希望将此设置保持为“始终”，并考虑授予应用程序后台访问权限，以使连接更加可靠。

## 速率限制

通过本地推送发送的通知不计入 [速率限制](details.md)。

## 配置

![iOS](/assets/iOS.svg) 可以通过编辑服务器的内部连接设置来禁用本地推送。转到 [设置](https://my.home-assistant.io/redirect/config/)，然后选择“伴侣应用”，点击服务器行，然后点击内部 URL。

![macOS](/assets/macOS.svg) 没有禁用本地推送的选项，请参阅上面的要求以获取更多信息。

![Android](/assets/android.svg) 可以在 [设置](https://my.home-assistant.io/redirect/config/) 中配置本地推送设置，然后选择“伴侣应用”，点击服务器行，然后选择“持久连接”。

## 查看状态
![iOS](/assets/iOS.svg) 和 ![macOS](/assets/macOS.svg):
您可以在 [设置](https://my.home-assistant.io/redirect/config/) 中的服务器部分伴侣应用中查看本地推送的状态。这将显示几种状态之一：

* 禁用，当通过连接设置关闭或当前不在内部网络上时。
* 不支持，当 iOS 版本不支持本地推送时。
* 不可用，当核心版本不支持本地推送时。
* 正在建立，当它正在初次连接到服务器时。
* 可用，当它已连接并准备好接受推送时。后面的数字表示自连接开始以来接收到的消息数量，这在调试时可能很有用。
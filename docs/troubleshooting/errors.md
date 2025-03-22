---
title: 错误
id: 'errors'
---

以下是您可能遇到的所有错误代码的列表，并附有关于发生原因和该如何处理的进一步文档。

## 设置和连接

### "无效的客户端 ID 或重定向 URI" 以及 "查找 redirect_uri 时的操作系统错误"
检查您的 `home-assistant.log` 文件中是否有关于 `indieauth` 的错误。如果还提到了操作系统错误，您很可能有一个损坏的 IPv6 实现。您可以通过在运行 Home Assistant 的机器上执行 `curl -v6 https://home-assistant.io/iOS/beta-auth` 来确认。如果您收到与无法连接到服务器有关的错误，则您的 IPv6 栈已损坏，您应该禁用它。

### "无效的客户端 ID 或重定向 URI" 以及 "查找 redirect_uri 时的超时"
检查您的 `home-assistant.log` 文件中是否有关于 `indieauth` 的错误。如果还提到了超时，您的 DNS 可能存在异常。您可以通过在运行 Home Assistant 的机器上执行 `dig home-assistant.io` 和 `nslookup home-assistant.io` 来确认。如果看到任何错误，可能存在 DNS 问题。

修复此问题的具体方法取决于您的设置——但建议尝试使用 Google 的 DNS 服务器 `8.8.8.8` 和 `1.1.1.1`。如果您正在运行 hassOS 设置，可以使用 `ha dns options --servers dns://8.8.8.8 --servers dns://1.1.1.1` 来完成这项操作。

### 查找 redirect_uri 时的 SSL 错误 [https://home-assistant.io/iOS](https://home-assistant.io/iOS)
此错误意味着您的 Home Assistant 无法协商到 [https://home-assistant.io](https://home-assistant.io) 的加密连接。此问题曾出现在运行 MacOS 的安装中，其中安装程序关于证书的通知被跳过并忽略。从 Python 3.7.5 的 ReadMe：

>证书验证和 OpenSSL  
>这个包包含它自己的 OpenSSL 1.1.1 私有副本。由钥匙串访问应用程序和安全命令行工具管理的系统和用户钥匙串中的信任证书不会被 Python `ssl` 模块默认使用。`/Applications/Python 3.7` 中包含一个示例命令脚本，用于安装来自第三方 [certifi](https://pypi.org/project/certifi/) 包的默认根证书的策划捆绑包。双击 `Install Certificates` 以运行它。  
>捆绑的 pip 有自己的默认证书存储，用于验证下载连接。

### "依赖项设置失败: `zeroconf`"
此错误通常由以下两个问题之一引起：
* 您正在运行两个具有相同名称的 Home Assistant 实例。解决方案是重命名其中一个实例。
* 您的 `configuration.yaml` 文件中缺少 `default_config:`。可以仅将 `zeroconf:` 添加到 `configuration.yaml` 中，但添加 `default_config:` 将与 `zeroconf:` 一起添加 [几种有用的集成](https://www.home-assistant.io/integrations/default_config/)。

### 响应状态代码不可接受: 400
当在设置期间发送的数据不符合 Home Assistant 的期望时，会发生这种情况。通常在两种情况下发生：

* 当您正在运行的 Home Assistant 版本低于最低要求（当前为 0.104.0）
* 您的设备名称中包含意外字符。在设置移动应用集成时，我们会尝试移除非标准字符和表情符号（从 Home Assistant 0.112 开始）。然而，如果您遇到此错误，简化设备名称以去除这些字符是值得的。

### URLSessionTask 失败，错误信息
此错误通常由以下两个问题之一引起：
* 您已拒绝该应用的本地网络访问。在 iOS 上解决该问题，请打开系统设置中的 Home Assistant 条目并确认本地网络已启用。
* 您在实例中配置了错误的外部 URL。例如，当将外部端口 443 转发到实例的端口（通常为 8123）时，您无需在 URL 后附加端口。
* 您在没有订阅的情况下登录到 Nabu Casa 云，并试图通过反向代理访问您的实例。只需从您的 Nabu Casa 云帐户中注销即可。
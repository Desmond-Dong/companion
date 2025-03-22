---
title: 伴侣应用网络
id: 'networking'
---
无论您在何处，能够随时随地访问您的家都是重要的，无论是因为您忘记关闭炉子，还是因为您想查看摄像头视图以应对警报。

因为我们希望您的智能家居在网络上是私密和安全的，所以许多拼图的部分需要正确对齐，才能确保一切如您所愿地运行。本指南旨在帮助您了解要求、一些复杂性和我们推荐的设置网络访问到您的 Home Assistant 实例的典型解决方案：

## 基础：应用如何与您的 Home Assistant 通信
为了让应用与 HA 通信，应用需要知道其地址。在您家中的网络内，您可能知道您的 Home Assistant 的 IP 就像 `192.168.1.4` 并且监听端口 8123。如果您使用 Home Assistant OS 且未更改任何默认设置，Home Assistant 也可以通过 [http://homeassistant.local:8123](http://homeassistant.local:8123) 访问。这都很好，并且只要您从未将手机或平板带出家门，它就能完美工作，但如果您带出去了呢？
最简单的方法是每月订阅 Nabu Casa Cloud 的 [费用](https://www.nabucasa.com/pricing/)。此费用有助于支持 Home Assistant 的进一步开发。Nabu Casa Cloud 充当互联网的“智能”代理，以加密方式将您的前端从家中隧道到您的手机，无论您在哪里，并且无需打开您的家庭网络以接收来自互联网的入站流量。
如果您不想使用 Nabu Casa Cloud（这很好，但您仍然应该订阅并享受支持 Home Assistant 的良好心情），您需要让 HA 可以从互联网访问。这需要在路由器上开放一个端口，并为您的 Home Assistant 获取一个互联网上的名称。虽然您可以让 HA 在内部使用端口 8123，并让您的路由器从例如默认的 https 端口 443 转发到 8123，但我们建议您不要这样做，原因是简单性，我们稍后会解释。您还需要为您的 Home Assistant 获取一个名称，因为 homeassistant.local 是一个在互联网上不存在的私有域后缀。

## 动态 DNS
大多数非商业互联网连接至少有两个缺点：您的互联网服务提供商通常不提供静态 IP（这意味着您的调制解调器/路由器被分配的公共 IP 地址会偶尔更改，甚至可能每 24 小时更改一次），而且一些 ISP 甚至不提供“真正的” IP 地址，因为他们没有足够的地址分配。这种情况在电缆提供商中非常普遍，尤其是在亚太地区。如果您的 ISP 说他们使用运营商级 NAT（CG-NAT）或类似双栈 lite（DS-lite），您很可能会遇到这个问题。如果您受到影响，请参阅 CG-NAT 和 IPv6 附录。
对于动态公共 IP 地址，解决方案很简单：通常用户会选择一个动态 DNS 服务，例如 [duckdns.org](https://github.com/home-assistant/addons/blob/master/duckdns/README.md)，该服务将创建一个唯一名称（例如 `my-home.duckdns.org`），这个名称可以通过路由器更新，以始终指向您的公共地址。如果您已经在路由器的公共接口上创建了 TCP 8123 的端口转发到内部 Home Assistant IP（比如 `192.168.1.4`），您的 Home Assistant 现在可以在网上访问。在这个时候你可以宣布胜利并停止，但不要这样做——因为此时一切都是未加密的，我们希望您能够以私密和安全的方式享受 HA。
## Hairpin NAT
在设置的这个阶段，我们需要检查您的路由器的一个功能：Hairpin NAT（也称为 NAT 反射或 NAT 循环）。这意味着您的路由器能够将请求从其内部（局域网）接口镜像到其外部（广域网）地址，然后再返回到内部 IP 地址（在这种情况下是您的 Home Assistant），从而反射或发回流量。检查它是否工作很简单：只需在连接到家中网络的手机或 PC 上打开浏览器，并打开 `http://my-home.duckdns.org:8123` ——如果有效，您就有了工作中的 hairpin NAT，可以进入下一部分。大多数当前的路由器将支持 NAT hairpinning，但有些路由器（特别是如果您从 ISP 获取路由器）可能没有此功能或已禁用。如果是这种情况，您需要检查是否可以在路由器上启用它，或者如果不能，您需要设置 Split Brain DNS。

## 确保连接安全
我们将继续使用 DuckDNS 的示例。使用 `http://my-home.duckdns.org:8123` 可以工作，但任何人都可能在读取您的流量。让我们改变这一点！DuckDNS 附加组件将为您的 Home Assistant 创建一个免费的、受信任的有效的 LetsEncrypt SSL 证书。只需按照 [这里](https://github.com/home-assistant/addons/tree/master/duckdns) 和 [这里](https://github.com/home-assistant/addons/blob/master/duckdns/README.md) 的安装说明操作，您将获得对 Home Assistant 的安全公共访问。使用 DuckDNS 附加组件的好处在于，它使用 LetsEncrypt DNS 挑战，在请求证书时，通过创建一个临时 DNS 记录来证明“拥有”该域名。如果您使用的 DNS 提供商不是 DuckDNS，您可以使用支持通过 DNS 或 http 挑战证明名称所有权的 `Home Assistant` 的 [LetsEncrypt](https://github.com/home-assistant/addons/tree/master/letsencrypt) 附加组件。后者要求将 TCP 端口 80 的端口转发到您内部 Home Assistant IP 的 TCP 端口 80。

当 Hairpin NAT 工作并且 DNS 域上有 SSL 后，您现在可以在互联网上和家庭中安全访问 Home Assistant，您应该在 `homeassistant:` 部分的 configuration.yaml 中添加 `external_url: my-home.duckdns.org:8123`。这并不是绝对必要的，但会帮助在 iOS 应用的入门过程中进行自动检测，因为该应用会知道如何到达您的 Home Assistant。

## Split Brain DNS
那么什么是 Split Brain DNS（也称为 Split Horizon DNS、split-DNS），我为什么需要它？如果您的路由器不支持 hairpin NAT，您仍然需要通过公共 DNS 名称访问 Home Assistant，例如 `my-home.duckdns.org`。这是为什么呢？因为有效的加密通过 https 和 SSL 证书只对公共 DNS 名称有效。这意味着，您的服务器上的证书名称需要与您在浏览器或应用中输入的 DNS 名称匹配。如果 hairpin NAT 可用，这就没问题，但在不可用时就会成为问题。在这种情况下，您需要“拆分”浏览器/应用获取的 IP 地址后面的 `my-home.duckdns.org` 的答案——您需要一个指向 Home Assistant 内部 IP 地址的答案（例如 `192.168.1.4`），以及一个在外出时使用的答案（例如 `104.25.25.31`）。
最简单的解决方案是使用 `Home Assistant` 的 [AdGuard Home](https://github.com/hassio-addons/addon-adguard-home) 附加组件。这也可以在某些路由器上设置（例如 pfSense 或 UniFi Security Gateways），但我们将继续使用 Home Assistant 提供的工具进行示例指南：因此您现在已经安装了 AdGuard Home 附加组件，并将路由器 DHCP 设置中的 DNS 服务器更改为您的 Home Assistant 地址。您现在应该访问 AdGuard Home 设置页面，在 [附加组件面板](https://my.home-assistant.io/redirect/supervisor/) 中，转到 `设置` -> `过滤器` 并选择：`DNS 重写`。

在这里，您点击 `添加 DNS 重写`，输入 `my-home.duckdns.org` 及 Home Assistant 的内部 IP `192.168.1.4`，然后点击 `保存`。此时，来自您家庭网络内的所有对 `my-home.duckdns.org` 的 DNS 查询将通过 AdGuard 的重写表答复，从而指向 Home Assistant 的内部地址，而不是询问公共 DNS 服务器，后者将返回路由器的公共 IP。
即使您不需要 Split Brain DNS，您可能也希望设置它，因为它将使您能够通过公共名称访问 Home Assistant，即使您的互联网连接中断并且 hairpin NAT 不可用。这减少了对云的依赖！

## 设置应用
如果您遵循了我们的所有建议，当连接到家庭 Wi-Fi 网络时，您的应用应在入门过程中自动发现您的 Home Assistant 实例。您还可以通过手动输入 `https://my-home.duckdns.org:8123` 在任何连接到互联网的地方完成入门，设置将以该地址作为应用连接设置中的 `External URL` 字段完成。无需输入内部 URL，因为无论您的手机连接到何处，相同的地址都能正常工作。

如果您希望（或必须）使用 Nabu Casa Cloud 或根据所连接的网络使用其他 URL，则需要更多步骤：

-   在系统设置中，将 Home Assistant 的位置访问权限设置为 iOS 上的“始终”或 Android 上的“始终允许”。这是必需的，因为 iOS 13 及更高版本和所有 Android 版本仅允许具有此权限的应用访问 Wi-Fi SSID，而该 SSID 被应用用于确定使用内部还是外部 URL。
-   一旦获得权限，将您的 Home Assistant 地址添加到内部 URL（如果您从本文开头进入，这可能是 `http://homeassistant.local:8123`）
-  ![iOS](/assets/iOS.svg) 如果您在 Home Assistant 中设置了 Nabu Casa Cloud，则“通过云连接”的复选框现在应变为可用状态。一旦您激活该复选框，外部 URL 将被禁用。
-  ![Android](/assets/android.svg) 手动将 Home Assistant 的外部 URL 更改为您的 Nabu Casa Cloud URL。

:::note 使用 BSSID 而不是 SSID
![Android](/assets/android.svg) 如果您有多个具有相同 SSID 的接入点，并且只希望在连接到特定接入点时使用内部 URL，您还可以在应用设置中输入 Wi-Fi 网络 BSSID。为此，请添加一个新 SSID，名称为 `BSSID:` 后跟 BSSID（例如：`BSSID:1A:2B:3C:4D:5E:6F`）。
:::

## 附录：CG-NAT
如果您的 ISP 不提供公共 IPv4 地址，您基本上仅有两个解决方案：您可以拨打 ISP 电话，询问他们是否可以为您提供真实地址或您的连接是否可升级（奇怪的是，礼貌地询问对许多 ISP 有用），或者使用 Nabu Casa Cloud。

## 附录：IPv6
由于 IPv6 已经推出20年，您的家庭网络很可能在提供 IPv4 地址的同时也获得了来自 ISP 的 IPv6 地址。因此，您的 Home Assistant 主机可能具有其 IPv4 地址 `192.168.1.4` 和 IPv6 地址 `2001:db8:1042::51c1:28d8:3bdc:6724`。这是我们建议不更改 TCP 端口的原因：
-   Home Assistant 将在 `192.168.1.4:8123` *和* `[2001:db8:1042::51c1:28d8:3bdc:6724]:8123` 上监听流量
-   如果您确实想要使您的设置具有未来保障，您将有两个 DNS 记录指向 `my-home.duckdns.org`：一个 A 记录指向您的路由器公共 IPv4 地址，该地址将被端口转发到您的 HA 主机内部地址，另一个 AAAA 记录，直接指向您的 HA 主机的 IPv6 地址。现在，当您远程访问 HA 时，可以使用任何协议，因为您输入的将是 `https://my-home.duckdns.org:8123`。如果您将路由器上的端口更改为 https 默认的 443，则在您突然拥有可工作的 IPv6 设置时，连接将失败，因为没有监听 `[2001:db8:1042::51c1:28d8:3bdc:6724]:443`。

## 附录：通过 NGINX 进行反向代理
在某些情况下，让 Home Assistant 提供 https 是不可能的，或者与某些设备不兼容。这对于通过 RestAPI 通信、且没有足够的性能进行 SSL 加密的基于 ESP 的低功耗 IoT 硬件尤其如此。例如，[konnected.io 集成](https://www.home-assistant.io/integrations/konnected/) 要求 Home Assistant 必须通过 http 可访问。
因此，为了适应这一点并仍然实现外部访问的加密，我们使用反向代理，例如 [NGINX](https://www.home-assistant.io/docs/ecosystem/nginx/)。反向代理的作用是作为您的客户端（浏览器或应用）的中介。客户端通过 https 安全地与反向代理通信，代理则将此流量通过未加密的 http 连接传递给 Home Assistant。延续我们的 Home Assistant 示例，我们假设您已经设置了 DuckDNS 和 LetsEncrypt。您现在应安装 [NGINX Home Assistant SSL 代理](https://www.home-assistant.io/addons/nginx_proxy/) 附加组件，并根据文档进行配置。

在您的 configuration.yaml 文件中，需要进行以下更改：
```
homeassistant:
  external_url: https://my-home.duckdns.org # 注意我们不再有 :8123 端口

http:
  use_x_forwarded_for: true     # 确保 HA 理解客户端请求是通过反向代理而来
  trusted_proxies:
    - 172.30.32.0/23            # 在 Home Assistant 中，我们需要添加 Docker 子网
    - 127.0.0.1                 # 添加本地主机的 IPv4 地址
    - ::1                       # 添加本地主机的 IPv6 地址
  # 注释或删除 SSL 证书行：
  # ssl_certificate: /ssl/fullchain.pem
  # ssl_key: /ssl/privkey.pem
```
完成后，路由器的端口转发应为 `TCP 443` 到您的 Home Assistant 内部 IP `192.168.1.4 Port 443`。请勿创建转发到 `192.168.1.4 Port 8123`，因为那是未加密的 http，只应在本地网络中访问。
您现在可以在内部和外部通过 `https://my-home.duckdns.org` 访问您的 Home Assistant，同时可使用 `http://192.168.1.4:8123` 作为未加密的端点供 `konnected.io` 等使用。
注意：如果您不使用 NGINX Home Assistant 附加组件，而是自己配置，请确保启用了 WebSockets 支持。

### TLS 客户端认证

![Android](/assets/android.svg)

如果您的 Home Assistant 需要 TLS 客户端认证（因为它在配置为执行 TLS 客户端认证的反向代理后面），则应用会要求您提供证书。
请参考您的设备和 Android 版本文档以安装证书，像 Pixel 手机的示例可以在这里找到 [添加和删除证书](https://support.google.com/pixelphone/answer/2844832?hl=zh-Hans)。

Wear OS 不支持使用已安装证书进行身份验证。应用无法将证书自动转移到 Wear OS 应用，因此在 Wear OS 应用的入门过程中会要求您提供证书。如果需要新的证书，您必须通过从 Wear OS 应用注销重新启动入门过程。证书（和密钥）必须作为 PKCS12 容器提供。当前默认 PKCS12 加密方法的支持有限，但如果您的手机和手表足够新, 可能会首先成功尝试此方法。仅当使用这种新格式的入门失败时，您可以尝试使用旧版 PKCS12 容器。使用例如 OpenSSL，可以通过在生成容器文件时使用 `-legacy` 标志来实现。

自 2024 年 2 月起，[Let's Encrypt 已开始迁移到提供未由 IdenTrust 的根 CA 证书交叉签名的密钥](https://letsencrypt.org/2023/07/10/cross-sign-expiration.html)，而是使用他们自己现在广泛信任的根 CA 证书。较旧的客户端如果没有获得更新的受信任证书颁发机构列表，将认为更新的 Let's Encrypt SSL 密钥是无效的，这包括 Android 7.1.1 之前的版本。这将导致 Chrome 或伴侣应用显示 SSL 错误。一个简单的解决方案是使用 Firefox 访问 Home Assistant，因为它与自己的更新信任的证书颁发机构列表一起分发。另一个解决方案是手动安装 Let’s Encrypt 的活跃 ISRG 根 X1 自签名 PEM（而不是 DST 根 X3）到 Android 凭证存储。

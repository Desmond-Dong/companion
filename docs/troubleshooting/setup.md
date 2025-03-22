---
title: 故障排除
id: 'faqs'
---

下面是常见问题及其故障排除建议的列表。如需更多支持，请查看[更多帮助页面](more-help.md)。

## 应用在设置时崩溃

如果您运行的是 Home Assistant 0.110，并且在设置过程中点击“继续”后应用崩溃，则需要为 `internal_url` 和 `external_url` 添加值。这可以通过用户界面在您的[常规设置](https://my.home-assistant.io/redirect/general/)中完成。如果您未看到此部分，您可能需要先在您的个人资料页面上启用“高级模式”。如果这些字段被禁用，可能是因为您的配置存储在 `configuration.yaml` 中，在这种情况下，请在 `homeassistant:` 下添加以下条目：

```yaml
homeassistant:
  ...
  external_url: URL
  internal_url: URL
```

将 `URL` 替换为您用于访问 Home Assistant 实例的地址。`internal_url` 和 `external_url` 的值可以相同，并且应与您在 `configuration.yaml` 的 `http:` 中的 `url:` 相同。

保存这些更改后，重启 Home Assistant，并在 Home Assistant 完成重启后重新打开该应用。

## 我在我的 `dev-services` 面板中没有看到设备的 `notify.mobile_app` 操作

一旦您[设置](https://my.home-assistant.io/redirect/getting_started/)了 Companion 应用，您需要重启 Home Assistant 以注册 `notify.mobile_app` 操作。在 iOS 上，如果在设置期间授予了通知权限，则会创建 `notify.mobile_app_<Device_ID>` 操作，在 Android 上，操作将在重启后出现。如果您看不到这一点，请在 iOS 上[强制退出](https://support.apple.com/HT201330)或在 Android 上强行停止。然后重新启动 Companion 应用，最后重新启动您的 Home Assistant 实例。该操作现在应该在 `开发工具 > 操作` 面板中列出。

![iOS](/assets/iOS.svg) 如果您在 iOS 上不见该操作，请检查应用中的通知设置（向右滑动以打开侧边栏，然后点击“[设置](https://my.home-assistant.io/redirect/config/)”，然后点击“Companion App”，再点击“通知”）。如果“推送 ID”框为空，请点击下面的重置按钮。

![Android](/assets/android.svg) 如果您在 Android 上仍然不见该操作，请按照步骤[重新开始](#starting-fresh-with-the-android-app)。

## 我有一个 `notify.mobile_app_<Device_ID>` 操作但没有收到通知

首先，检查您的消息有效负载是否有效。查看[通知文档](../notifications/basic.md)中的示例，或者尝试在 `开发工具 > 服务` 页面上向您的 `notify.mobile_app_<Device_ID>` 服务发送下面的简单示例。
```JSON
{"message": "Hello World"}
```

如果该通知已送达，问题很可能出在您的负载上。

如果上述方法无效，请尝试以下方法：

1.  _检查您的消息限制：_ 为了让我们提供免费通知服务，每个应用目标每天限制 500 次通知。[位置更新](../notifications/notification-commands#request-location-updates)和其他特殊通知不计入此限制。 ![iOS](/assets/iOS.svg) 在 iOS 中，您可以通过在 Companion 应用中向右滑动打开侧边栏并点击“[设置](https://my.home-assistant.io/redirect/config/)”，然后点击“Companion App”再点击“通知”并向下滚动到页面底部来检查您剩余的通知。该限制将在 UTC 凌晨重置。

2.  _重置您的推送 ID 令牌：_ ![iOS](/assets/iOS.svg) 如果您确认仍有剩余通知，您可以在[设置](https://my.home-assistant.io/redirect/config/)的“Companion App”页面的“通知”页面顶部重置您的通知。在此之后，您可能需要[强制退出](https://support.apple.com/HT201330) iOS Companion 应用，然后重新打开应用并最终重启您的 Home Assistant 实例。

3.  _检查您的系统设置：_
    - ![iOS](/assets/iOS.svg) 在 iOS 设置应用中，导航到通知，然后选择 Home Assistant，确保“允许通知”被切换为启用。
    - ![Android](/assets/android.svg) 在 Android 设置应用中，导航到应用程序，然后选择 Home Assistant，再选择通知，确保“所有 Home Assistant 通知”被切换为启用。如果您仅收到某些通知，请检查您使用的[通知通道](../notifications/notifications-basic#notification-channels)是否被切换为启用。

4. _使用 Android 应用重新开始：_ ![Android](/assets/android.svg) 如果您仍无法在 Android 应用中接收通知，请尝试[重新开始](#starting-fresh-with-the-android-app)。

## 我收到 SSL 错误并且在外出时无法连接到我的 Home Assistant 实例

这通常发生在您启用了 [Home Assistant Cloud](https://www.home-assistant.io/cloud/) 但没有开启 [Remote UI](https://www.nabucasa.com/config/remote/) 时。要解决此问题，您可以启用 [Remote UI](https://www.nabucasa.com/config/remote/)，或者向右滑动以打开侧边栏然后点击“设置”，接着点击“Companion App”，在“设置”下点击“连接”。确保“通过云连接”旁边的开关关闭，并在“外部 URL”字段中输入您的 Home Assistant 实例的远程地址。该地址必须用于加密连接，关于设置到您的 Home Assistant 实例的加密远程连接的说明，请参见 [Home Assistant 文档](https://www.home-assistant.io/docs/configuration/remote/)或[设置 Let's Encrypt 和 Duck DNS 的指南](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/)。

如果您完全没有设置 [Home Assistant Cloud](https://www.home-assistant.io/cloud/)，问题可能是远程连接没有安全保障。Companion 应用要求远程连接必须是加密的。请参见 [Home Assistant 文档](https://www.home-assistant.io/docs/configuration/remote/)或[设置 Let's Encrypt 和 Duck DNS 的指南](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/)以获取设置安全连接的说明。

## Home Assistant 中的某些功能与我的桌面不工作

这可能不是 Companion 应用的问题，更可能是 Home Assistant 或特定组件未按预期正常工作。要测试原因，请尝试以下步骤。

1.  首先，在 iOS Companion 应用中向下滑动以刷新您的视图。在 Android 应用中强行停止应用程序然后重新启动它。
2.  如果问题仍然存在，请在 Safari/Chrome 浏览器中打开您的 Home Assistant 实例（您可能需要登录）。如果问题出现在 Safari/Chrome 中，请在 [Home Assistant Frontend GitHub](https://github.com/home-assistant/frontend/issues) 中提出问题，或者如果是自定义组件问题，请与该组件的开发者联系。在您的问题报告中，说明在移动浏览器上查看时存在此问题，而不一定是 Companion 应用。
3.  如果在 Safari 中没有发生该问题，请在 [iOS Companion App GitHub](https://github.com/home-assistant/iOS/issues) 或 [Android Companion App GitHub](https://github.com/home-assistant/android/issues) 中提出问题。请说明您遵循了这些步骤且问题仅在 Companion 应用中发生。

## 状态栏（包含蜂窝/Wi-Fi 信号强度的顶部条）与我的主题不匹配

如果您使用的是 2020.2 之前的 iOS 应用或 Android 应用，请使用 [`frontend.set_theme`](https://www.home-assistant.io/components/frontend/#theme-automation) 操作，而不是 Home Assistant 个人资料页面中的下拉菜单来更改状态栏的颜色，以匹配您的 Home Assistant 主题。使用该操作将生成一个事件，允许 Companion 应用检测主题变化并将正确的颜色应用于状态栏。有关使用的键的详细信息，请参见 [主题](../integrations/theming.md) 文档。请注意，颜色必须在您的主题中以十六进制值（例如 `#0099ff`）指定，并且不支持通过变量名称指定元素颜色。

## 我在多个设备上运行 Companion 应用，`sensor` 名称太相似且令人困惑，我该怎么办？

从 Home Assistant Core 0.106 开始，默认传感器名称将与您在 iOS 设置应用或 Android Companion 应用配置页面中设置的设备名称配对。现在，您需要通过以下步骤，从 Home Assistant 配置页面的 [集成仪表板](https://my.home-assistant.io/redirect/integrations/) 中重命名每个传感器。

1.  转到 [集成仪表板](https://my.home-assistant.io/redirect/integrations/) 的配置。
2.  找到与您希望重命名传感器的设备相对应的“移动应用：_设备名称_”集成并打开它
3.  对于每个您希望重命名的传感器，单击或点击传感器名称，然后点击齿轮图标。
4.  在“实体 ID”下，根据需要更改实体 ID。 **不要**更改 ID 的 `sensor.` 或 `device_tracker.` 部分。
5.  对于您希望重命名的每个传感器，重复步骤 4 和 5。

## 手动下拉刷新应用/更新位置时出现 `kCLError`

要解决此问题，请将 Home Assistant 应用的位置信息许可更改为“始终”在 iOS 设置 > 隐私 > 位置服务中。

## 人员实体未更新最近位置

如果您使用的是 `person` 实体，而不是提供的 `device_tracker` 实体，您可能会注意到 `person` 实体的状态没有按预期更新。默认情况下，您使用应用登录时，任何新的设备都将作为跟踪器添加到登录的人员中，这可能会导致此问题。您可以按照以下步骤检查 `person` 实体：

1.  转到 [人员](https://my.home-assistant.io/redirect/people/)
2.  选择遇到跟踪问题的人
3.  查看属于此人的设备
4.  移除任何留在家中或不再使用的设备。仅保留随您旅行的设备。
5.  保存更改

## 使用Android应用重新开始
![Android](/assets/android.svg) 有时您可能需要在 Android 应用中重新开始，因为某个新功能可能未正常工作或发生了奇怪的事情。确保精确遵循每个步骤而不跳过任何内容。

:::info
并非所有但有些问题可以通过简单地注销应用并重新登录来解决。如果您在服务器中设置了[受信网络](https://www.home-assistant.io/docs/authentication/providers/#trusted-networks)，请确保在应用中登录时输入您的凭据，以使应用在不在受信网络下时继续工作。如果在您尝试注销和重新登录后问题仍然存在，请继续执行下面的步骤。
:::

1.  检查 Home Assistant Core、[Android 应用](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android)和[Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)是否是最新的。
2.  在 Android 应用中清除存储或应用数据。不要假设卸载和重新安装是安全的，因为这会触发自动备份，而我们在这里试图避免。
3.  在 Home Assistant 中转到[集成仪表板](https://my.home-assistant.io/redirect/integrations/)。移除相关设备的移动应用条目。如果您看到多个，请全部移除。
4.  重启 Home Assistant。
5.  重新登录到 Android 应用。如果您有多个设备，请确保在入职时重命名设备。请记住使用您的凭据而不是受信网络进行登录。

## 设备跟踪器在 Android 应用中未更新
![Android](/assets/android.svg) 如果您发现设备跟踪器没有按预期更新，请按照以下步骤确保设置最佳。

1.  确保您的设备和服务器满足位置跟踪的先决条件：
    - 为您的服务器启用[远程访问](https://www.home-assistant.io/docs/configuration/remote/)。
    - 在[设置](https://my.home-assistant.io/redirect/config/) > Companion app > 管理传感器中，启用以下 **位置传感器**：后台位置、位置区域和单一准确位置。
      - 如果您使用多个服务器，请确保正确的服务器为每个传感器启用。
    - 如果您没有从 Play 商店安装应用，请验证您正在使用[`full`版本](../core/android-flavors.md)。
    - 如果您使用 `person` 实体进行跟踪，请再次检查它是否[正确设置](#person-entity-is-not-updated-with-recent-location)。
2.  确保应用已获得位置权限，始终允许。（在 Android 12 及更新版本中，提示时允许精确位置）
3.  确保您的设备启用了位置 (GPS)。
4.  允许后台访问并关闭该应用的“电池优化”。
    - 您可以在 [设置](https://my.home-assistant.io/redirect/config/) > Companion app 中检查后台访问。该设置应显示一个对勾 ✔️。
    - 一些制造商可能会增加额外的省电功能（例如：省电），确保禁用它们。您通常可以在系统设置应用中访问这些功能。
5.  为该应用开启不受限制的数据。
    - 如果数据节省模式开启，Home Assistant 可能无法正确发送/接收数据。

有时，以上步骤仍然不会导致位置更新到达您的服务器。该应用可以接收大量位置更新，并且可能会跳过其中一些。要确定原因，请查看应用位置历史记录日志。

转到 [设置](https://my.home-assistant.io/redirect/config/) > Companion app > 故障排除 > 位置跟踪并启用位置历史。该应用现在将保留过去 48 小时内接收到的所有位置更新的日志。

 - 每个更新将显示来源（例如，“后台位置”）和结果（例如，“已发送”）。该应用验证位置有效后才会发送，并且由于时间、准确性、重复或其他原因，更新可能会被跳过。
 - 该应用应多个小时接收更新。如果您在启用历史记录后没有看到更新，请确保遵循之前提到的步骤。没有位置历史通常是由于对 Home Assistant 应用的后台访问受限，或者 Android 系统杀死了该应用。
 - 如果由于准确性跳过了多个更新，那么请检查 GPS 坐标以确保它们是正确的，并考虑增加[传感器的准确性设置](../core/location.md#location-sensor-settings)。例如，如果您看到一个有效位置被跳过，准确性在 `350` 附近，则应将最小准确性设置为 `400` 作为缓冲。较大的值也可能导致不一致的结果，因此请参考日志中的有效报告。

<details>
<summary>手动审核步骤</summary>

您还可以通过使用[崩溃日志](#android-crash-logs)手动检查位置历史记录以确定发生了什么。这些日志包含更多详细信息，但仅在应用打开时保存。整个位置决策过程打印到日志，以帮助您了解发生了什么。当您查看日志时，请注意包含 `LocBroadcastReceiver` 的行以跟踪决策。请记住，您希望获得大约 10 分钟的日志，因此您可能需要保持应用打开以在发生问题时生成更长的日志。

以下是您可以期待看到的内容，以确保位置更新到达手机。该应用在发送之前将验证位置是否有效。如果您收到重复的位置更新，您将会看到这些日志。该应用在与服务器保持连接时，如果自上次发送更新以来的 15 分钟内位置没有变化，应用将不会将相同的位置更新发送到服务器。

```
2021-02-03 09:03:00.900 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 4.663
    Bearing: 86.759346
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Received location that is 74 milliseconds old, 1612371780829 compared to 1612371780903 with source fused
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Duplicate location received, not sending to HA
```

以下是您可以期待看到的成功位置结果的日志。如果您未见到这些行，请确保遵循之前提到的步骤。

```
2021-02-03 09:06:34.241 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 13.279
    Bearing: 0.0
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Received location that is 1126 milliseconds old, 1612371993119 compared to 1612371994245 with source fused
2021-02-03 09:06:34.309 7306-7430/? D/LocBroadcastReceiver: Location update sent successfully
```

日志将指示报告是否因时间、准确性、重复或其他原因而被跳过。
</details>

如果您在遵循上述步骤后仍未收到位置更新并认为这是错误的，请提交 GitHub [问题](https://github.com/home-assistant/android/issues/new?assignees=&labels=bug&template=Bug_report.md&title=)。如果可能，请附上至少 10 分钟的日志，以便其他人更容易提供帮助（可能会被要求）。

## 使用自签名证书会导致 Android 中出现空白页面

![Android](/assets/android.svg) 如果您在 Android 上使用自签名证书，则在输入和/或选择您的 Home Assistant 实例后，可能会停留在空白屏幕。为了解决此问题，您需要确保 URL 有效，并将证书导入到 Android 的受信任证书中。执行此操作的步骤可以在[此处](https://support.google.com/nexus/answer/2844832?hl=en)找到。这些步骤是为 Android 9+ 设备编写的，但对于较旧的受支持设备也非常接近。

## Android 小部件无法正常工作

![Android](/assets/android.svg) 如果您发现小部件不再工作，那么这些步骤可能会帮助您解决该问题。

1.  检查设备上的数据节省模式是否禁用，小部件在启用时将无法工作。
2.  检查 Home Assistant 应用程序的后台数据是否启用。
3.  移除并重新创建小部件。

## 通知操作过于相似或未在 Android 中显示

如果您有多个相同型号的设备，并且在登录后未在 Companion App 配置中重命名设备，则可能发生冲突。

1.  在侧边栏中导航到[设置](https://my.home-assistant.io/redirect/config/)。
2.  点击“Companion App”
3.  更改设备注册下的设备名称。
4.  重启 Home Assistant 以注册新的通知操作。（即 `notify.mobile_app_<device_name>`）

## 传感器缺失或未更新

![iOS](/assets/iOS.svg) 当应用不在前台时，传感器更新与位置更新相关，因此您需要确保在 iOS 设置中将位置权限设置为“始终允许”。

该应用还会尝试在后台发送更新，但这些更新的频率由 iOS 决定，并且为了保护电池寿命，频率受到严格限制。iOS 使用一种内部度量标准，这是应用开发人员无法看到的，来优先处理应用的后台活动。您使用得越多，Companion 应用越重要，iOS 将允许更频繁的后台更新。

如果您想确保在设备开始充电或电池电量超过或低于特定限制时更新传感器，最可靠的方法是在 iOS 的[快捷方式](/integrations/siri-shortcuts.md)应用中使用自动化。将“当”部分设置为所需条件，在“执行”部分选择 Home Assistant 的“更新传感器”操作。您可能希望关闭“运行前询问”以避免在发送更新之前提示。由于 iOS 的限制，当发送这些更新时，您仍会从快捷方式应用收到通知。

![Android](/assets/android.svg) 在 Android 上，传感器将在更新时显示。有些在启用时会立即显示，其他则会在授予权限并检索状态后显示。如果您未见到传感器，则可能需要等待该传感器获取状态更新，以便将其发送到您的 Home Assistant 服务器。

## 文字转语音通知无法正常工作

![Android](/assets/android.svg) 请检查[语音识别与合成](https://play.google.com/store/apps/details?id=com.google.android.tts)是否已更新。请确保将其设置为默认的文字转语音引擎，这可能是某些制造商所需的。

## Android 崩溃日志

![Android](/assets/android.svg) Android 应用利用 Google 的 ADB [Logcat](https://developer.android.com/studio/command-line/logcat) 功能记录错误。您可能会不时希望检查日志，或者开发人员可能会要求您提供崩溃日志以修复您的问题。您可以在[设置](https://my.home-assistant.io/redirect/config/) Companion App > 故障排除 > 显示并共享日志中找到一个选项。该功能使刷新、分享和查看日志变得更加简单。然后，日志可以在您想要创建问题时或当开发人员要求时用于排查问题。需要注意的是，设备日志可能包含有关您的 Home Assistant URL 的敏感信息，因此请确保在共享之前删除敏感信息。

## Android 应用耗电

![Android](/assets/android.svg) Android 应用提供许多功能，其中某些功能可能比其他功能更耗电。该应用的默认设置力求尽可能友好于电池。可能会出现您启用的某个功能导致电池耗电超出预期的时候。本节将列出在您决定[重新开始](#starting-fresh-with-the-android-app)之前需检查的所有应用程序设置。对于以下选项，您需要转到 Companion App 设置中逐个检查并禁用它们。

1.  如果使用完整版本，请检查高准确度模式是否始终启用。
2.  如果使用完整版本，请检查单一准确位置传感器是否未启用“包含在传感器更新中”选项。
3.  检查持久连接是否设置为“从不”。
4.  如果启用了蓝牙发射器传感器，请检查发射器是否始终开启，仅在您希望使用时启用。
5.  检查传感器更新频率是否设置为“正常”。
6.  检查没有任何通知传感器在其各自设置中禁用了允许列表。您始终希望定义一个允许列表，以防止严重的电池耗费。
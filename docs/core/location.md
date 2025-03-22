---
title: "位置"
id: "location"
---

## 概述

位置更新会在多种情况下从您的设备发送到 Home Assistant：
* 当您进入或退出 Home Assistant 中定义的 [区域](https://www.home-assistant.io/components/zone/)。对于 Android，请确保在 [配置](https://my.home-assistant.io/redirect/config/) 中的 Companion App 部分启用了基于区域的跟踪切换。
* 当检测到或丢失 iBeacon 时（见 [下文](#ibeacons)）。 ![iOS](/assets/iOS.svg)
* 当应用程序打开且之前未在后台打开时。
* 通过自动的后台获取。
* 当通过 [特殊通知](/docs/notifications/notification-commands#request-location-updates) 请求更新时。
* 当打开一个 [URL 处理程序](integrations/url-handler.md) 链接时。 ![iOS](/assets/iOS.svg)
* 当通过 [X-Callback-URL](integrations/x-callback-url.md) 调用应用程序时。 ![iOS](/assets/iOS.svg)
* 当您的设备检测到 [_重要位置变化_](#location-tracking-when-outside-a-home-assistant-zone)。
* 手动当应用程序被刷新（在页面顶部向下滑动）或从 3D 按压应用图标打开的快捷菜单中。 ![iOS](/assets/iOS.svg)
* 当通过 [发送意图](#sending-an-intent) 请求更新时。 ![Android](/assets/android.svg)

您可以通过检查 `sensor.last_update_trigger` 的值来查看最近位置更新的原因。 ![iOS](/assets/iOS.svg)

根据您的设置，位置信息直接从您的手机发送到您的 Home Assistant 实例或通过 Home Assistant Cloud 服务发送。这将根据 [配置](https://my.home-assistant.io/redirect/config/) 中 Companion App 部分连接部分指定的 URL 而有所不同。位置数据不会通过任何其他服务器或组织发送。当然，如果您决定不授予 Home Assistant Companion App 位置权限，或者如果您随后移除了位置权限 (![iOS](/assets/iOS.svg) 设置>隐私>位置服务或 ![Android](/assets/android.svg) 设置>隐私>权限)，则不会从您的设备将位置数据发送到 Home Assistant。 **重要的是要注意，如果在 iOS 上禁用了位置，任何 [传感器](sensors.md) 都将无法工作！![iOS](/assets/iOS.svg) 在 Android 上 ![Android](/assets/android.svg) 您仍然可以期待看到一些不与位置权限相关的传感器**。另一种选择是在 [实体注册表](https://www.home-assistant.io/integrations/config/#entity-registry) 中禁用 `device_tracker.<device_name>` 实体。

## 入门

一旦您首次安装并打开 Home Assistant Companion App，将创建一个新的 `device_tracker.` 实体。默认情况下，该实体的名称格式为 `device_tracker.<device_ID>`，其中 `<device_ID>` 是您设置的设备名称 (![iOS](/assets/iOS.svg) 设置>常规>关于或 ![Android](/assets/android.svg) 设置>关于手机)。您可以通过访问侧边栏的 [集成仪表板](https://my.home-assistant.io/redirect/integrations/) 来检查 Home Assistant 中的实体名称，然后单击或点击您设备的移动应用集成，并滚动查看实体列表。如果需要，您可以根据需要编辑实体的 `name` 属性。

以下是一个基本示例，当您在黑暗中进入 _家庭_ 区域时打开灯光。

```yaml
automation:
  - alias: "回到家时打开门灯"
    trigger:
      - platform: state
        entity_id: device_tracker.<device_ID>
        to: "home"
    condition:
      - condition: sun
        after: sunset
    action:
      - action: light.turn_on
        data:
          entity_id: light.frontdoor
```

## 实体属性

新创建的 `device_tracker` 实体可能会根据您的操作系统提供以下一些属性。

| 名称                | 单位                           |
| ------------------- | ------------------------------ |
| `source`            | _无_                         |
| `battery_level`     | 百分比                     |
| `latitude`          | 度                        |
| `longitude`         | 度                        |
| `gps_accuracy`      | 米                         |
| `altitude`          | 米                         |
| `course`            | 度                        |
| `speed`             | 每秒米                        |
| `vertical_accuracy` | 米                         |
| `floor`             | 楼层 ![iOS](/assets/iOS.svg) |

如果您想了解有关这些属性的更多细节，请参考您操作系统的相关文档：

[Android](https://developer.android.com/reference/android/location/Location) 或
[iOS](https://developer.apple.com/documentation/corelocation/cllocation)

## 管理位置跟踪级别

使用核心 2022.2 或更高版本时，可以在 Companion App 设置中配置位置发送方式：

 - ![iOS](/assets/iOS.svg) 设置可以按每个服务器管理。打开服务器的设置并在隐私下更改位置发送设置。
 - ![Android](/assets/android.svg) 启用位置跟踪可以按每个服务器管理，精确/区域名称仅适用于所有服务器。转到管理传感器 > 背景位置并更改位置发送设置。

可用选项：

- **精确** 发送您设备的 GPS 坐标。
- **仅区域名称** 仅发送区域名称（或 `not_home`），这对于在不暴露位置的情况下进行存在检测非常有用。仅考虑该服务器的区域。
- **![iOS](/assets/iOS.svg) 从不** 或 **![Android](/assets/android.svg) 已禁用** 将既不发送 GPS 坐标，也不发送区域信息。

## 当在 Home Assistant 区域外进行位置跟踪时

![iOS](/assets/iOS.svg)

Home Assistant Companion App 从 iOS 接收 _重要位置变化_。每当收到更新时，它会发送到 Home Assistant。大致上，每当您的设备转移到新的蜂窝塔时，经过了一段较长的时间（通常几个小时），或者连接状态发生变化并且系统注意到您的位置最近发生了变化时，就会收到更新。

苹果 [定义](apple-location-programming-guide) 重要的重大位置更新为：

> 重大变化位置服务仅在设备位置发生重大变化时提供更新，例如500米或更远。

他们还在 [能效指南](apple-energy-guide) 中表示：

> 重大变化位置更新每 15 分钟唤醒一次系统和您的应用，即使没有发生位置变化。

最后，我认为来自 [Stack Overflow](stackoverflow) 的这一回答说得最好：

> 重要位置变化是所有位置监控类型中最不准确的。只有在存在基站转移或变化时，它才会获取更新。这可能意味着用户所在位置的准确性和更新水平不同。城市地区，更多的更新，更多的塔。在城外，高速公路，塔较少，变化较少。

关于重要变化位置更新的真实情况是什么？谁知道，因为苹果对此保密。

## Home Assistant 区域中的位置跟踪

在启动时，Home Assistant for iOS 为您 Home Assistant 配置中的所有区域设置了地理围栏。进入和退出通知会发送到 Home Assistant。对于 Android，您需要确保在应用配置页面启用了基于区域的跟踪。

### 配置

将 `track_ios: false` 添加到您的 [区域配置](https://my.home-assistant.io/redirect/zones/) 中，以禁用所有连接的 iOS 应用的区域位置跟踪。 ![iOS](/assets/iOS.svg)

### iBeacons

![iOS](/assets/iOS.svg)

该应用程序对使用 iBeacons 触发进入/退出更新提供基本支持。要配置它们，请将您的 iBeacon 详细信息添加到区域，如下所示：

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

重启 Home Assistant 然后重启 iOS 应用。然后，它将开始使用 iBeacons _而不是您的位置_ 来触发您区域的进入（但不退出）。要将 iBeacon 添加到 `zone.home` 中，请在 `customize` 下添加上述内容。

[apple-energy-guide]: https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4
[apple-location-programming-guide]: https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9
[stackoverflow]: http://stackoverflow.com/a/13331625/486182

## 发送意图

![Android](/assets/android.svg) 发送意图是一个高级功能，面向熟悉 Android 自动化应用的用户。用户可以通过使用 Tasker 或任何其他允许用户发送意图的自动化应用发送意图从而请求位置更新。您需要确保该应用在 [后台](https://docs/troubleshooting/faqs#device-tracker-is-not-updating-in-android-app) 运行，并且启用了单一准确位置传感器，以便更新能够正确触发。

以下步骤是如何使用 Tasker 发送意图的示例：

1. 创建新任务
2. 向任务添加步骤
3. 选择“发送意图”
4. 在操作下输入 `io.homeassistant.companion.android.background.REQUEST_ACCURATE_UPDATE`
5. 在包下输入 `io.homeassistant.companion.android`
6. 保存任务
7. 使用任何 Tasker 配置文件通过该任务请求位置更新

## Android 位置传感器

![Android](/assets/android.svg) Android 用户可以在 [设置](https://my.home-assistant.io/redirect/config/) > Companion App > 管理传感器 > 位置传感器 下找到自定义传感器设置。这些传感器都要求应用具有适当的位置信息权限，并且设备启用了位置，如果未满足这些要求，则传感器将被禁用。

* 第一个传感器是 `Background Location`，该传感器负责使用 [Google 的融合位置 API](https://developers.google.com/location-context/fused-location-provider) 注册频繁的后台更新。更新通常在 1-3 分钟之间，但在您使用 Google Maps 等导航时，可能会频繁达到每 30 秒一次。
* `Background Location` 还提供 [高精度模式](#high-accuracy-mode)，因此您可以获得更快的更新。该模式的状态可以通过下一个位置传感器 `High Accuracy Mode` 来决定，该传感器仅报告模式是否启用。此传感器与您从 Google 获得的位置更新无直接关系。
* 第三个位置传感器是 `Location Zone`，当启用时，该传感器将获取所有配置的 [`zones`](https://www.home-assistant.io/integrations/zone/) 的列表，并将使用 Google 的位置服务创建包含 `zone` 数据的地理围栏。这将允许更快的进入和退出检测，同时仍然对电池友好。

:::info <span class='beta'>测试版</span>
Android 应用最多可以创建 100 个地理围栏。如果您有超过 100 个区域，Home Assistant 只会为前 100 个区域创建地理围栏并接收事件。

当与高精度模式 [触发范围约束的区域](/docs/core/location#zone-when-using-the-high-accuracy-mode-trigger-range-for-zone-meters-option-value-greater-than-0) 结合时，每个包含在约束中的区域将创建 2 个地理围栏。例如，如果您有 2 个区域，触发范围配置为 1 个区域，则应用将创建 3 个地理围栏。
:::

* 最后一个位置传感器是 `Single Accurate Location`，只有在 reported accuracy 未达到在 [传感器设置](#location-sensor-settings) 中设置的标准时，才会使用此传感器。此传感器也会在接收到 [通知命令](/docs/notifications/notification-commands#request-location-updates) 或 [意图](#sending-an-intent) 时使用。

### 位置传感器设置

设置允许您调整为报告给 Home Assistant 的位置所需的准确度。来自 Google 的每个位置报告都包含报告的准确度，有时这个数字可能会因某些环境条件而非常高或非常低。通常，数字越高，报告越不准确。您可以独立于后台位置、位置区域和单一准确位置调整此设置。这将使您在应用程序处于后台时获得更快的区域检测，同时也能保持准确度。默认值为 `200`，在大多数使用情况下无需更改，但在 [故障排除](https://docs/troubleshooting/faqs#device-tracker-is-not-updating-in-android-app) 中，您可能会发现某些报告被跳过。在这些情况下，您可以将该数字调整得更高，以捕获这些跳过的报告。

单一准确位置传感器允许您调整发送到服务器的更新之间的最小时间，默认设置为 1 分钟（60000 毫秒）。单一准确位置传感器还具有一个设置，允许您将位置更新包含在传感器更新中，请注意，这在启用时可能导致过量的位置信息结果。通常，您不会想调整这些设置。

### 高精度模式

![Android](/assets/android.svg)
:::caution
请注意，当启用此选项时，您的电池会比正常情况下更快地消耗，因为会持续使用 GPS。
:::

后台位置传感器也可以选择在高精度模式下运行。启用 `高精度模式（可能会快速耗电）` 选项时，位置每 X 秒通过 GPS 更新（使用 `高精度间隔` 选项定义。默认 5 秒，最小 5 秒）。

您可以定义蓝牙和/或区域约束，以限制高精度模式的使用。

:::info
如果您同时使用这两种约束（蓝牙、区域），则只需满足其中一个约束即可默认启用高精度模式。

您可以通过启用相应选项来启用两种约束的组合。请参阅 [组合](/docs/core/location#combination-of-zones-constraint-and-bluetooth-constraint)。
:::

#### 蓝牙约束

您还可以仅在连接到特定蓝牙设备时启用高精度模式，选项为 `仅在连接到 BT 设备时启用高精度模式`。请确保也启用了 `高精度模式（可能会快速耗电）` 选项。

#### 区域约束

此外，您可以在进入特定区域时启用高精度模式，选项为 `仅在进入区域时启用高精度模式`。如果您希望在进入区域之前启用高精度模式，可以使用选项 `针对区域的高精度模式触发范围（米）`。启用此选项后，将在原始区域周围创建一个扩展区域（仅为应用内部）。如果您到达该扩展区域，将启用高精度模式，直到您到达原始区域时再禁用。请查看区域示例。

这两个选项都要求您启用 `Location Zone` 传感器。

##### 区域示例

![Zones](/assets/Zone.png)

###### 使用 `高精度模式触发范围（米）` 选项（值大于 0）的区域

在这种情况下，该区域由扩展区域（zone.home_expanded）减去原始区域（zone.home）定义。图中以蓝色显示。

到达家庭区域：

- 进入 `zone.home_expanded` -> 高精度模式 **启用**
- 进入 `zone.home`，因此退出 `zone.home_expanded` -> 高精度模式 **禁用**

离开家庭区域：

- 退出 `zone.home`，因此进入 `zone.home_expanded` -> 高精度模式 **启用**
- 退出 `zone.home_expanded` -> 高精度模式 **禁用**

###### 不使用 `高精度模式触发范围（米）` 选项（值等于 0）的区域

在这种情况下，仅使用原始区域（zone.home）。图中以橙色显示。

到达家庭区域：

- 进入 `zone.home` -> 高精度模式 **启用**

离开家庭区域：

- 退出 `zone.home` -> 高精度模式 **禁用**

###### 区域约束和蓝牙约束的组合

可以通过两种方式组合。默认选项是简单或组合，这在相关开关关闭时使用。如上面的信息框中所述，仅需满足一个约束即可启用高精度模式。

但是如果组合开关开启，两个约束都必须适用才能启用高精度模式。

启用状态的示例是：您通过蓝牙连接到汽车，并且当您的设备识别到您进入特定区域或其周围半径时，高精度模式被打开。如果您离开该区域，但保持与汽车连接（例如，继续开远），高精度模式将被禁用。如果您在家附近走动，但未连接汽车，高精度模式将保持禁用。

#### 通知

如果启用了高精度模式，您将看到一条包含有关位置的详细信息的通知。由于安卓系统的要求，该通知是永久的。但您可以通过系统的通知设置隐藏/最小化位置通知。
该通知将显示您当前的地址，如果地理编码传感器也启用的话。否则，它将显示您当前的坐标。此外，它还会显示最后找到的位置的准确性。

高精度模式也可以通过通知命令启用/禁用。 [此处查看](/docs/notifications/notification-commands#high-accuracy-mode)以获取更多详细信息。

高精度模式的状态可以通过启用 [传感器](sensors.md#high-accuracy-mode) 来查看。

高精度模式的更新间隔也可以通过启用 [传感器](sensors.md#high-accuracy-mode) 来查看。
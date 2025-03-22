---
title: 触觉反馈
id: 'haptics'
---

Home Assistant Companion 提供触觉反馈功能，在与用户界面交互时提供物理反馈。您将在切换按钮（灯光、开关、输入布尔值）和输入选择中感受到触觉反馈。某些场景，例如无效操作错误，也会生成触觉反馈。

![iOS](/assets/iOS.svg)<br />

支持触觉反馈的 iPhone 型号包括 iPhone 7 和 7 Plus、iPhone 8 和 8 Plus、iPhone X、XR、XS、XS Max、iPhone 11 和 11 Pro。

![Android](/assets/android.svg)

支持触觉反馈和/或振动马达的 Android 设备可以期待感受到某种类型的反馈。

## 禁用触觉反馈
Home Assistant Companion 尊重操作系统级别的禁用触觉反馈设置。在 iOS 设置中，导航到“声音与触觉”，然后在屏幕底部切换关闭“系统触觉”。有关更多信息，请参见 [Apple 支持文档](https://support.apple.com/guide/iphone/change-the-sounds-and-vibrations-iph07c867f28/ios)。在 Android 上，您可以在 Home Assistant 用户配置文件页面禁用震动以禁用此功能。

## 开发者：将触觉反馈集成到自定义卡片
正在进行中：有关将触觉反馈集成到自定义卡片的说明将在此处发布。当您的自定义卡片被交互时，可以触发一个事件，iOS 应用将监听该事件并重新解释为触觉反馈。

Home Assistant Companion 支持由 [Apple 的人机界面指南](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/feedback/) 定义的所有七个触觉强度级别。Android 将尽力将这些与现有的 [触觉反馈常量](https://developer.android.com/reference/android/view/HapticFeedbackConstants#constants_1) 和/或 [振动效果](https://developer.android.com/reference/android/os/VibrationEffect.html#constants_1) 进行匹配。

| 触觉 | 描述 |
| ------ | ------ |
| `success` | 表示任务或操作已完成。 |
| `warning` | 表示任务或操作产生了某种警告。 |
| `failure` | 表示任务或操作失败。 |
| `light` | 提供与视觉体验相辅相成的物理隐喻。 |
| `medium` | 提供与视觉体验相辅相成的物理隐喻。 |
| `heavy` | 提供与视觉体验相辅相成的物理隐喻。 |
| `selection` | 表示选择正在主动变化。 |

**使用触觉反馈的自定义卡片：**
*   [Button Card](https://github.com/custom-cards/button-card) 由 RomRider 提供
*   [Radial Menu](https://github.com/custom-cards/radial-menu) 由 Ian Richardson 提供
*   [Harmony Card](https://github.com/sbryfcz/harmony-card) 由 Sam Bryfczynski 提供
*   [Simple Thermostat Card](https://github.com/nervetattoo/simple-thermostat) 由 Raymond Julin 提供
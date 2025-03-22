---
title: "Android 变种"
id: 'android-flavors'
---

![Android](/assets/android.svg) Android 应用程序提供两种不同的变种，分别为 `full` 或 `minimal`。`full` 版本的应用程序通过 [Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) 提供，拥有完整的功能集，因为它需要 Google Play 服务。`full` 版本同时提供生产和 [beta 版本](https://play.google.com/apps/testing/io.homeassistant.companion.android)。

`minimal` 版本的应用程序不需要 Google Play 服务，可以在 GitHub 的 [releases](https://github.com/home-assistant/android/releases) 部分找到 APK。也可以从 [F-Droid](https://f-droid.org/en/packages/io.homeassistant.companion.android.minimal) 安装。然而，由于 F-Droid 自行构建新版本，更新可能会延迟。该版本的应用程序不提供位置跟踪。唯一不可用的传感器是：[Activity](/core/sensors.md#activity-sensors) 和 [Geocoded](/core/sensors.md#geocoded-location-sensor)。

除了这两种变种，用户还可以在每个提交到 GitHub 的拉取请求的 [actions](https://github.com/home-assistant/android/actions) 部分找到 `debug` APK。应用程序的 `debug` 版本可以与生产或测试版应用程序并行安装。这使用户能够帮助测试即将推出的功能和修复。`minimal` 和 `full` 版本均提供 `debug` 版本。
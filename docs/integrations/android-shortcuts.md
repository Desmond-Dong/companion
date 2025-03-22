---
title: "Android快捷方式"
id: 'android-shortcuts'
---

![Android](/assets/android.svg)

Android 应用程序支持动态和固定的 [快捷方式](https://developer.android.com/guide/topics/ui/shortcuts)。快捷方式允许用户直接从主屏幕导航到特定的仪表板页面或实体，而无需先启动应用程序。支持的设备将在 [设置](https://my.home-assistant.io/redirect/config/) 中的伴随应用部分看到“管理快捷方式”选项。在那里，用户必须提供显示在启动器中的标签（Google 推荐使用 10 个字符）。描述也必须提供，因为某些启动器可能更喜欢显示它（Google 推荐使用 25 个字符）。

当前支持两种快捷方式类型：仪表板或实体。默认快捷方式类型是仪表板，您必须输入仪表板路径（例如：`/dashboard-name/viewname`、`/lovelace/default_view` 或 `/lovelace-dashboardname/viewname`）以创建快捷方式。如果您选择了实体，则会看到一个新的实体字段，其中包含来自您的 Home Assistant 服务器的所有实体列表供选择。选择后，您将能够创建快捷方式。

动态快捷方式支持 Android 7.1 及更高版本的设备。这些快捷方式需要从 [设置](https://my.home-assistant.io/redirect/config/) 中的伴随应用添加，因此用户可以在长按应用图标后将它们拖到主屏幕上。重要的是要注意，Android 仅支持在长按菜单下显示 5 个动态快捷方式，然而，大多数启动器只支持显示 4 个。所有 5 个快捷方式都可以更新，也可以从应用长按菜单中删除。

固定快捷方式支持 Android 8.0 及更高版本的设备。这些快捷方式只能在 [设置](https://my.home-assistant.io/redirect/config/) 中的伴随应用中创建，可以手动拖动或从此屏幕自动添加。它们不会出现在应用长按菜单下，而是直接出现在主屏幕上。用户可以添加的快捷方式数量没有限制。固定快捷方式可以随时更新。
---
title: "概述"
id: "android-auto"
---

![Android](/assets/android.svg)

Home Assistant 提供了 Android Auto (AA) 和 Android Automotive OS (AAOS) 的体验。这将允许您在驾驶汽车时安全地与各种实体进行交互。它还将允许您导航到任何具有位置关联的 `zone`、`person`、`sensor` 或 `device_tracker`*。

\* 被认为是 `home` 的设备跟踪器实体将不会显示在导航屏幕上。

### 设置

为了在您的车辆中使用应用程序，您需要登录到手机（如果使用 AA）或车辆（如果使用 AAOS）。一旦您登录后，就可以在车辆的主屏幕上使用 Home Assistant 图标。

### 支持的可操作领域

- `alarm_control_panel` 如果不需要代码则允许 `arm_away` 和 `disarm`，否则无操作
- `button`
- `cover`
- `fan`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`

:::note
显示的实体数量将取决于车辆设置的限制。
:::

### 收藏夹

如果您希望快速访问某些实体，可以选择一些实体在应用中显示。当您停车时，只需前往 [设置](https://my.home-assistant.io/redirect/config/) > 伴随应用 > Android Auto 收藏夹（或驾驶收藏夹），然后选择您希望查看的实体。一旦您添加了收藏夹，下次在车辆中启动 Home Assistant 应用时，将显示您的收藏实体。从那里您可以切换实体、导航到实体、查看所有实体，以及更改您的服务器。

除了添加上面支持的领域外，您还可以将 `binary_sensor` 和 `sensor` 实体添加到收藏夹，以便在驾驶界面查看它们的状态。

:::info
如果您是在 AAOS 车辆上从 Google Play 商店安装的应用程序，那么目前您将无法设置您的收藏实体。在此期间，您可以自由使用 AA 应用程序。
:::

### 通知

默认情况下，Home Assistant 的通知不会出现在 AA 界面中。要在 AA 中显示 Home Assistant 通知，请在通知数据中添加 [`car_ui: true`](../notifications/basic.md#android-auto-visibility)。现在通知将在您的手机 _和_ AA 中显示。从 AA 打开通知将打开 Home Assistant 的驾驶界面。

AA 中的通知与您的手机共享设置，且不支持所有通知功能。例如，为了让通知显示在 AA 当前屏幕的顶层，通知频道也需要设置为在您的手机上弹出。为了获得最佳体验，建议使用特定的 [频道](../notifications/basic.md#notification-channels) 来显示应该在 AA 中可见的通知。例如：

```yaml
  - alias: 发送门未锁警报
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "门未锁"
          message: "大家都离开家了，但门仍是未锁定的"
          data:
            car_ui: true
            notification_icon: "mdi:door-open"
            channel: "门未锁"
            importance: high
```

### 传感器

可用于 AA 和 AAOS 的传感器在主 [传感器](../core/sensors.md#android-sensors) 页面上进行了描述。以下传感器列表是 AA 和 AAOS 独有的：

*  [Android Auto 连接](../core/sensors.md#android-auto)
*  [汽车传感器](../core/sensors.md#car-sensors)

启用或禁用传感器仅在车辆停放时可用。更改您的启用传感器的方法取决于您如何安装该应用程序：

 - 从 Play 商店安装
   1. 在另一台设备上，前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) > **设备**，并选择您的车辆。
   2. 选择想要更改的传感器，点击齿轮图标，然后打开或关闭 **启用**。
   3. 在您的车辆中启动应用程序以更新传感器。
   4. 如果您启用了任何需要特殊权限的传感器，该应用会发布通知以完成启用。点击通知打开应用，重新启用传感器并授权任何请求的权限。
 - 从汽车制造商的商店安装
   1. 点击屏幕右上角的 **原生模式**。
   2. 前往 **设置** > **伴随应用** > **管理传感器**，启用或禁用您的传感器。
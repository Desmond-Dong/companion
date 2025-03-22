---
title: "beta测试：在构建之间清理"
id: 'resetting'
---

![iOS](/assets/iOS.svg) 参与2.0版本beta测试的用户可能经历了许多构建，并拾取了现在冗余的多个传感器。 ![Android](/assets/android.svg) 已安装 [Play Store beta构建](https://play.google.com/apps/testing/io.homeassistant.companion.android) 的Android用户可能也需要从新的集成开始以清理一些问题。以下步骤将允许您对Home Assistant实例中的以前构建进行_焦土_删除，并让您再次运行。

:::tip
在大多数情况下，可以通过从Home Assistant中删除相关的“移动应用”集成来完全移除Home Assistant和伴随应用之间的连接。可以在“配置”中找到，然后是“集成”。完成此操作后，您可以从设备中卸载伴随应用（如果需要，可以重新安装）。如果您有Apple Watch，值得检查一下在重新安装之前Home Assistant伴随应用是否已从您的手表上卸载。
:::

如果上述方法无效，您可以按照下面的步骤从Home Assistant中完全删除伴随应用的所有痕迹。步骤假设您在测试期间仅使用了一个设备，或者希望从所有设备中删除以前beta版本的所有痕迹。

0.  **对您的Home Assistant进行备份或快照。不要跳过此步骤！**
1.  前往Home Assistant配置页面上的[集成](https://my.home-assistant.io/redirect/integrations/)。
2.  选择移动应用：`<设备ID>`（设备ID是您的设备名称）。
3.  点击右上角的垃圾桶图标删除集成。如果您在上一页有多个移动应用条目，请对每一个重复此步骤。
4.  返回Home Assistant配置页面并打开[实体注册表](https://my.home-assistant.io/redirect/entities/)。
5.  删除右侧列出`mobile_app`的所有条目，这一步可能不是必要的，因为它们可能在上面的第3步中已经被删除。
6.  使用您偏好的方式在Home Assistant实例中编辑文件，打开`.storage`文件夹并删除`mobile_app`文件。
7.  打开`known_devices.yaml`，删除由一个32字符唯一ID组成的条目，代表您设备的`device_tracker`。这一步可能不是必要的，因为实体可能在第3步后已经被删除。
8.  重启Home Assistant。
9.  从您的设备中删除Home Assistant应用。如果您有Apple Watch，请在手表应用中检查Home Assistant Companion是否也已从中卸载。
10. 从TestFlight（在beta测试期间）、AppStore、Google Play Store或Firebase重新安装Home Assistant应用。
11. 打开应用并按照设置过程进行操作。
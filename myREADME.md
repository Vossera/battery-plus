## 怎么使用这个项目？
1. 对于普通用户来说，直接插电使用mac，然后enable limit就好。
2. 对于高级用户，在advanced setting里面，先放电到你认为合适的电量，然后再插充电器，关闭Battery Charging。 每周放电一次。

## 写这个项目的原因：
如果长时间使用Mac，插电使用比不插电使用对电池寿命更好。因为插电使用可以设置不给电池充电，而适配器直接给电脑供电。
从了解了MAC电源管理后，去找了对应的软件：Aldente，这个软件收费（免费版也能用，但是我看见提示更新到Pro就很不爽😕）
后来了解到Battery 这个项目，发现自带的CLI工具非常强大，但是GUI界面比较简单，只支持一个最简单的Battery Limit功能
Battery源项目不接受GUI更改，因为要给用户提供一个最小的可用集

## 这个项目增加了什么？
Battery Limit：20%-80%
Battery Charging: On/Off
Force-Discharging: On/Off
Calibration
## 为什么这么增加？
Battery Limit：20%-80% 能够更方便的控制电源的值，支持自定义，默认80%
Battery Charging: On/Off 决定电源是否能充上电
Force-Discharging: On/Off 决定是谁来供电（电源还是电源适配器），如果打开,那么就是电源供电，这在Clamshell，desptop closed with 外接显示器 的时候可能不起作用。（合盖模式下使用外接显示器通常需要更高的功耗,如果强制使用电池供电可能导致电源压力太大。 MacOS可能从硬件上阻止这种操作。:）
Calibration： 这个是校准电源的，因为使用电源管理工具，系统电量会停止更新，而电池是存在自动放电的，因此需要校准，这个校准可能会耗时几个小时。
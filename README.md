# Battery charge limiter for Apple Silicon Macbook devices

<img width="300px" align="right" src="./screenshots/tray.png"/>This tool makes it possible to keep a chronically plugged in Apple Silicon Macbook at `80%` battery, since that will prolong the longevity of the battery. It is free and open-source and will remain that way.

## 怎么使用这个项目？

1. 对于普通用户来说，直接插电使用mac，然后enable limit就好。
2. 对于高级用户，在advanced setting里面，先放电到你认为合适的电量，然后再插充电器，关闭Battery Charging。 每周放电一次。

## 写这个项目的原因：

如果长时间使用Mac，插电使用比不插电使用对电池寿命更好。因为插电使用可以设置不给电池充电，而适配器直接给电脑供电。
从了解了MAC电源管理后，去找了对应的软件：Aldente，这个软件收费（免费版也能用，但是我看见提示更新到Pro就很不爽😕）
后来了解到Battery 这个项目，发现自带的CLI工具非常强大，但是GUI界面比较简单，只支持一个最简单的Battery Limit功能
Battery源项目不接受GUI更改，因为要给用户提供一个最小的可用集。

## 这个项目增加了什么？

- Battery Limit：20%-80%
- Battery Charging: On/Off
- Force-Discharging: On/Off
- Calibration

## 为什么这么增加？

- **Battery Limit：20%-80%** 能够更方便的控制电源的值，支持自定义，默认80%
- **Battery Charging: On/Off** 决定电源是否能充上电
- **Force-Discharging: On/Off** 决定是谁来供电（电源还是电源适配器），如果打开,那么就是电源供电，这在Clamshell，desktop closed with 外接显示器 的时候可能不起作用。（合盖模式下使用外接显示器通常需要更高的功耗,如果强制使用电池供电可能导致电源压力太大。 MacOS可能从硬件上阻止这种操作。）
- **Calibration**： 这个是校准电源的，因为使用电源管理工具，系统电量会停止更新，而电池是存在自动放电的，因此需要校准，这个校准可能会耗时几个小时。



--—
下面是原仓库的README.md

> Want to know if this tool does anything or is just a placebo? Read [this excellent article](https://batteryuniversity.com/article/bu-808-how-to-prolong-lithium-based-batteries). TL;DR: keep your battery cool, keep it at 80% when plugged in, and discharge it as shallowly as feasible.

### Requirements

This is an app for Apple Silicon Macs. It will not work on Intel macs. Do you have an older Mac? Consider the free version of the [Al Dente](https://apphousekitchen.com/) software package. It is a good alternative and has a premium version with many more features.

### Installation

- Option 1: install the app through brew with `brew install battery`
- Option 2: [download the app dmg version here](https://github.com/actuallymentor/battery/releases/)
- Option 3: install ONLY the command line interface (see section below)

When installing via brew or dmg, opening the macOS app is required to complete the installation.

The first time you open the app, it will ask for your administator password so it can install the needed components. Please note that the app:

- Discharges your battery until it reaches 80%, **even when plugged in**
- Disables charging when your battery is above 80% charged
- Enables charging when your battery is under 80% charged
- Keeps the limit engaged even after rebooting
- Keeps the limit engaged even after closing the tray app
- Also automatically installs the `battery` command line tool. If you want a custom charging percentage, the CLI is the only way to do that.

Do you have questions, comments, or feature requests? [Open an issue here](https://github.com/actuallymentor/battery/issues) or [Tweet at me](https://twitter.com/actuallymentor).

---

## 🖥 Command-line version

> If you don't know what a "command line" is, ignore this section. You don't need it.

The GUI app uses a command line tool under the hood. Installing the GUI automatically installs the CLI as well. You can also separately install the CLI.

The CLI is used for managing the battery charging status for Apple Silicon Macbooks. Can be used to enable/disable the Macbook from charging the battery when plugged into power.

### Installation

One-line installation:

```bash
curl -s https://raw.githubusercontent.com/actuallymentor/battery/main/setup.sh | bash
```

This will:

1. Download the precompiled `smc` tool in this repo (built from the [hholtmann/smcFanControl](https://github.com/hholtmann/smcFanControl.git) repository)
2. Install `smc` to `/usr/local/bin`
3. Install `battery` to `/usr/local/bin`

### Usage

Example usage:

```shell
# This will enable charging when your battery dips under 80, and disable it when it exceeds 80
battery maintain 80

# This will maintain your battery between 70-80%, letting it rest in that range
battery maintain 70-80
```

After running a command like `battery charging off` you can verify the change visually by looking at the battery icon:

![Battery not charging](./screenshots/not-charging-screenshot.png)

After running `battery charging on` you will see it change to this:

![Battery charging](./screenshots/charging-screenshot.png)

For help, run `battery` without parameters:

```
Battery CLI utility v1.0.1

Usage:

  battery status
    output battery SMC status, % and time remaining

  battery maintain LEVEL[1-100,stop] or RANGE[lower-upper]
    reboot-persistent battery level maintenance: turn off charging above, and on below a certain value
    eg: battery maintain 80           # maintain at 80%
    eg: battery maintain 70-80        # maintain between 70-80%
    eg: battery maintain stop

  battery charging SETTING[on/off]
    manually set the battery to (not) charge
    eg: battery charging on

  battery adapter SETTING[on/off]
    manually set the adapter to (not) charge even when plugged in
    eg: battery adapter off

  battery calibrate
    calibrate the battery by discharging it to 15%, then recharging it to 100%, and keeping it there for 1 hour

  battery charge LEVEL[1-100]
    charge the battery to a certain percentage, and disable charging when that percentage is reached
    eg: battery charge 90

  battery discharge LEVEL[1-100]
    block power input from the adapter until battery falls to this level
    eg: battery discharge 90

  battery visudo
    ensure you don't need to call battery with sudo
    This is already used in the setup script, so you should't need it.

  battery update
    update the battery utility to the latest version

  battery reinstall
    reinstall the battery utility to the latest version (reruns the installation script)

  battery uninstall
    enable charging, remove the smc tool, and the battery script
```

## FAQ & Troubleshooting

### Why does this exist?

I was looking at the Al Dente software package for battery limiting, but I found the [license too limiting](https://github.com/davidwernhart/AlDente/discussions/558) for a poweruser like myself.

I would actually have preferred using Al Dente, but decided to create a command-line utility to replace it as a side-project on holiday. A colleague mentioned they would like a GUI, so I spend a few evenings setting up an Electron app. And voila, here we are.

### "It's not working"

If you used one of the earlier versions of the `battery` utility, you may run into [path/permission issues](https://github.com/actuallymentor/battery/issues/8). This is not your fault but mine. To fix it:

```
sudo rm -rf ~/.battery
binfolder=/usr/local/bin
sudo rm -v "$binfolder/smc" "$binfolder/battery"
```

Then reopen the app and things should work. If not, [open an issue](https://github.com/actuallymentor/battery/issues/new/choose) and I'll try to help you fix it.

### A note to Little Snitch users

This tool calls a number of urls, blocking all of them will only break auto-updates.

1. `unidentifiedanalytics.web.app` is a self-made app that tracks app installations, I use it to see if enough people use the app to justify spending time on it. It tracks only how many unique ip addresses open the app.
1. `icanhazip.com` is used to see if there is an internet connection
1. `github.com` is used both as a liveness check and as the source of updates for the underlying command-line utility
1. `electronjs.org` hosts the update server for the GUI

All urls are called over `https` and so not leak data. Unidentified Analytics keeps track of unique ip addresses that open the app, but nothing else.

### What distinguishes this project from Optimized Charging?

Optimized Charging, a feature that is built into MacOS, aims to ensure the longevity and health of your battery. It does so by "delaying charging the battery past 80% when it predicts that you’ll be plugged in for an extended period of time, and aims to charge the battery before you unplug," as explained in [Apple's user guide](https://support.apple.com/en-ca/guide/mac-help/mchlfc3b7879/mac#:~:text=Optimized%20Battery%20Charging%3A%20To%20reduce,the%20battery%20before%20you%20unplug.).

Additionally, Optimized Charging uses machine learning to decide when the battery should be held at 80%, and when it should become fully charged. If your Mac is not plugged in on a regular schedule, optimized charging will not work as intended.

This app is a similar alternative to Optimized Charging, giving the user control over when it is activated, what percentage the battery should be held at, and more.

### How do I support this project?

Do you know how to code? Open a pull-request for a feature with the label [help wanted (PR welcome)](https://github.com/actuallymentor/battery/labels/help%20wanted%20%28PR%20welcome%29).

Do you have an awesome feature idea? [Add a feature request](https://github.com/actuallymentor/battery/issues/new/choose)

Do you just want to keep me motivated to update the app? [Tweet at me](https://twitter.com/actuallymentor)

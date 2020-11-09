---
title: Enabling WiFi Connection on Ubuntu Server 20.04.1 LTS
excerpt: Servers are supposed to connect to the network with the plain-old copper cables. No doubt about that, but what if your home router stands on an unreachable position at your hallway and you have only 2 meters of network cable?
tags:
  - ubuntu-server-20-04-1-lts
  - wifi
  - netplan
  - network-manager
---

![Post Featured - Enabling WiFi on Ubuntu Server 20.04.1 LTS](/assets/uploads/post-featured-enabling-wifi-on-ubuntu-server.jpg "Post Featured - Enabling WiFi on Ubuntu Server 20.04.1 LTS")

Hello from one of my other needless topic. :) You may ask, why do I need a wifi connection on a server computer? Here is why: Quarantine is boring! I need to distract myself from the pandemic, endless recession in the country, future anxiety, etc.

Joking aside, I needed a home server to run a simple back-end application. Previously, I was using my "*Raspberry Pi 3 Model B*" for such cases, but this time I needed some more resources. So, I unearthed my old laptop computer from some drawer and started to install Ubuntu Server 20.04.1 LTS in it. That is how it began.

## Before You Begin

- This post doesn't have an answer for "setting up wifi with `systemd-networkd` and `wpasupplicant` together". I couldn't manage to setup wifi connection with this combination.

The post consists of 2 parts.

- [Seting up WiFi with NetworkManager](/2020/enabling-wifi-connection-on-ubuntu-server-20-04-1-lts#seting-up-wifi-with-networkmanager "Seting up WiFi with NetworkManager")  
  The first one is "*I've a lot of time to read*" part. By default, I'm debug-mode enabled, that means the content written by me is story-rich in the first place.

- [Step-by-Step Summary](/2020/enabling-wifi-connection-on-ubuntu-server-20-04-1-lts#step-by-step-summary "Step-by-Step Summary")  
  The second one is "*Just give me the recipe*" part. If you're chasing for a quick "how-to" answer.

## Seting up WiFi with NetworkManager

> Before we start, I assume you've already installed Ubuntu Server 20.04.1 LTS without having an internet connection. Here is the notes for installation steps:  
> - Install **Ubuntu Server 20.04.1 LTS** from a bootable disk.  
> - Ethernet auto configuration should fail and you should continue with selecting **Continue without network** at Network connections step.  
> - Setup a user account.  
> - Accept installing of OpenSSH server.  
> - Then login with your user credentials.  
> - **In short**, select all defaults and additionally, select **Install Select OpenSSH** option to enable remote access by SSH.  

------

For the starters, I'll get my server's network interfaces and their assigned IP addresses, if there are any. There are tons of ways to do the same thing in Linux terminal environment. To get the assigned IP addresses to the network interfaces, we may use `ip address` command:

```shell
ip address
ip addr
ip a
# they are all the same
```

For a basic laptop computer, expected network interfaces are, an active loopback interface (*which controls your* `localhost`) and two passive interfaces; one for **ethernet** device and one for **wifi** interface. Here is my result:

1. **lo** `up` `127.0.0.1/8`
2. **enp1s0** `down` `no-ip-assigned`
3. **wlp2s0** `down` `no-ip-assigned`

Now we know our network interfaces. It is predictable that **wlp2s0** is the wireless interface and **enp1s0** is the ethernet interface. To be sure you may list hardware devices with:

```shell
sudo lshw -class network -short
# lists hardware by filtering network devices
```

Next step is configuring server networking with **Netplan** utility. **Netplan** is the helper tool to configure networking on Linux servers with text-based description files in YAML-syntax. I'll skip definitions for the utility. You can check utility webpage at [netplan.io](https://netplan.io/ "netplan website"). This page is also the primary source for most of this writing.

Netplan has a default configuration file at the **/etc/netplan/** directory. To edit its content in the terminal window, run:

```shell
sudo nano /etc/netplan/00-installer-config.yaml
# this will open up config file with nano editor
# you may use another "your-config.yaml" file here, higher number prefixes "00-*" will override lower ones. (in fact aphhabetically later prefixes)
```

Initially, you should have an empty configuration like below:

```shell
# This is the network config written by 'subiquity'
network:
  ethernets: {}
  version: 2
```

With these configuration files, you won't have a persistent network configuration object for your system. It will be auto-generated dynamically at system boot time or when you call one of these commands,`sudo netplan apply` or `sudo netplan try` from these YAML configuration files.

**Netplan** supports two renderers, **networkd** (*default*) and **NetworkManager**. We'll change default renderer. It is possible to set renderer globally, at device-type level or to a specific device configuration.

I'll use **NetworkManager** as renderer, and add it at **device-level** to my wireless interface which is **wlp2s0**.

This is how the updated configuration file is supposed to look like:

```shell
# This is the network config written by 'subiquity'
network:
  ethernets: {}
  version: 2
  # this is the wifi configuration to enable wireless connection with "network-manager" renderer
  # you need to update access point name and its password
  # use two spaces for indentation (not tabs or any number of spaces)
  # netplan disables dynamip IP assignment both for dhcp4 and dhcp6,
  #   you should enable it explicitly to get a valid public IP from your router
  # you can delete "ethernets: {}" if you want, it does nothing for us in this case
  wifis:
    wlp2s0:
      renderer: NetworkManager
      dhcp4: true
      access-points:
        "Name-of-Your-Access-Point---keep-quotes":
          password: "WiFi-Password---keep-quotes"
```

Update **access-points** details (*name and password*) with yours, save file and exit from the editor. Then you'll run this to complete set-up:

```shell
sudo netplan --debug apply
# to apply generated configuration object to the system
# "--debug" flag is for verbose outputs
# SPOILER: this command will not work :)
```

**Note on Netplan commands**: Even if it is enough to run `sudo netplan apply` command alone, you may use `sudo netplan generate` to create configuration object before applying it to the system or `sudo netplan try` to apply it with a user confirmation.

```shell
sudo netplan generate
# to generate network configuration object from YAML config files
# generate command will also check validity of YAML syntax and definitions (configuration will be written into the disk but it will be activated on the next boot)
sudo netplan apply
# to apply generated configuration object to the running system
sudo netplan try
# to apply generated configuration object to the running system (with user confirmation)
```

When you call `sudo netplan --debug apply` command you'll get an error like this:

```shell
# ...
Failed to start NetworkManager.service: Unit NetworkManager.service not found.
# ...
```

We got the error because, unlike the **networkd** (*default*) renderer, **NetworkManager** is not shipped with **Ubuntu Server 20.04.1 LTS**. And it should be installed explicitly. And we hit our main problem:

> So we need to install an APT package and, we do not have an internet connection.

Ok, now we solve this. Switch to another computer with an internet connection, head to the [network-manager](https://packages.ubuntu.com/focal/net/network-manager "network-manager package page") package page (*for focal*) and find **Download network-manager** table at the bottom of the page.

Find and click your server device's architecture from the table (`amd64` *for me*). This will move you to the downloads page. Download Debian package (`network-manager_***.deb`) for the `network-manager` from any mirror.

Now, we copy this debian package to a USB disk and move it to the server and try to install it manually.

Switch to the server and insert the USB disk with the **network-manager** debian package, then list block devices with:

```shell
lsblk --paths
# lists block devices with full paths
```

Find your USB device in the list. (`/dev/sdb1` *for me*) Then, create a temporary folder for USB disk mount target, mount USB disk to this folder. (`usbdisk` *for me*)

```shell
mkdir usbdisk
sudo mount /dev/sdb1 usbdisk
ls -lh usbdisk
# you should see "network-manager" deb package listed here
# network-manager_***.deb
```

Then try installing `network-manager` with Debian package manager tool:

```shell
sudo dpkg --install usbdisk/network-manager_***.deb
# try to install debian package
# SPOILER: this will not work :)
```

The install operation will interrupt with dependency errors, and here comes the boring part. **You should install every missing dependency manually and recursively**. First, missing packages for the **network-manager** package, then missing packages for the initial missing packages, etc. Here is the error message and my missing dependencies:

```shell
# ...
dpkg: dependency problems prevent configuration of network manager:
# ...
```

```shell
# missing packages for manual "network-manager" installation
# better if you start installing from deepest level
# this list is for "network-manager"
# after installing initial "network-manager" dependencies, 
#  "wpasupplicant" will throw the same for its dependencies,
#  so you ned to install them after finishing the first turn :(
network-manager_***.deb
  - libbluetooth3_***.deb
  - libjansson4_***.deb
  - libmm-glib0_***.deb
  - libndp0_***.deb
  - libnm0_***.deb
  - libteamdctl0_***.deb
  - wpasupplicant_***.deb
    - libnl-route-3-200_***.deb
    - libpcsclite1_***.deb
```

Extract all missing packages from the error messages, switch back and forth to the internet available computer and download all to the USB drive. Then install each downloaded with `sudo dpkg --install` command.

Here are the links again for the download, [network-manager](https://packages.ubuntu.com/focal/net/network-manager "network-manager package page") and [wpasupplicant](https://packages.ubuntu.com/focal/wpasupplicant "wpasupplicant package page").

Here is the command to unmount USB disk safely which you will need for USB exchanges:

```shell
sudo umount usbdisk
# unmounts disk from the mount path, it is "umount" not unmount
sudo umount /dev/sdb1
# this does the same
```

After installing all missing packages, retry installing **network-manager** with:

```shell
sudo dpkg --install usbdisk/network-manager_***.deb
# this is the retry after fixing missing dependencies
```

This time the "**network-manager**" package install operation will succeed.

------

Now we have our `NetworkManager` renderer installed to the server. Re-run related netplan command again to check if the error is gone:

```shell
sudo netplan --debug apply
# this is the retry after fixing missing dependencies
```

If everything configured correctly, we should have a wifi connection already. List IP addresses again and validate `wlp2s0` wifi interface is now `UP` and it has an IP address assigned automatically from your local network IP range.

```shell
ip address
# re-check network interfaces
# you should get an IP belongs to "192.168.0.0/24" Subnet Mask
```

Alternatively, you can use simpler `hostname` command to list the IP addresses of the active network interfaces:

```shell
hostname -I
hostname --all-ip-addresses
# does the same, display all network addresses
```

To check the internet connection run `curl --head mozilla.org`. It must return some HTTP headers belongs to the queried public domain.

```shell
curl --head mozilla.org
curl -I mozilla.org
# does the same, fetch HTTP request headers only
```

If we set-up as expected, we should have an internet connection, and we can update apt packages with:

```shell
sudo apt update
sudo apt upgrade
# this might update "network-manager" and "wpasupplicant" packages that might break your internet connection :)
# so, re-check internet connection after update
curl --head mozilla.org
```

**Congrats!** Now we have a wifi connection for our Ubuntu Server 20.04.1 LTS. Eventually, you can move your home server laptop out-of your sight and SSH into it from your development environment to continue.

Next part is the same content with this, but this time in a condensed form, you may skip it to the **Troubleshooting** section or **Fin!**.

## Step-by-Step Summary

If you're familiar with basic terminal interaction, here is the quick recipe for you.

```shell
# ------------------------------------------
# 1. FIND LOGICAL NAME OF THE WIFI INTERFACE
# ------------------------------------------
# List network interfaces and ensure that they are not connected to the internet.
# Get your wifi interface's logical name for the next step. (it is something like "wlp2s0")
ip address
# -----------------------------
# 2. EDIT NETWORK CONFIGURATION
# -----------------------------
# Add "wifis" device type to the default Netplan configuration file at "/etc/netplan/*.yaml". Save and exit.
sudo nano /etc/netplan/00-installer-config.yaml
# update config file with "wifis" configuration below
# |~~~~~~
# | # This is the network config written by 'subiquity'
# | network:
# |   ethernets: {}
# |   version: 2
# |   # this is the wifi configuration to enable wireless connection with "network-manager" renderer
# |   wifis:
# |     wlp2s0:
# |       renderer: NetworkManager
# |       dhcp4: true
# |       access-points:
# |         "Name-of-Your-Access-Point---keep-quotes":
# |           password: "WiFi-Password---keep-quotes"
# |~~~~~~
# ---------------------------------------------------
# 3. DOWNLOAD AND COPY MISSING PACKAGES TO A USB DISK
# ---------------------------------------------------
# You need another computer with internet connection fot this step.
# We've selected "NetworkManager" as the renderer, but we don't have it installed in our system.
# We'll install it manually by downloading "network-manager" package and all its dependencies.
# Download all packages below to a USB disk.
# |~~~~~~
# | # missing dependencies
# | network-manager_***.deb
# |   - libbluetooth3_***.deb
# |   - libjansson4_***.deb
# |   - libmm-glib0_***.deb
# |   - libndp0_1.7-0ubuntu1_***.deb
# |   - libnm0_***.deb
# |   - libteamdctl0_***.deb
# |   - wpasupplicant_***.deb
# |     - libnl-route-3-200_***.deb
# |     - libpcsclite1_***.deb
# |~~~~~~
# https://packages.ubuntu.com/focal/net/network-manager
# https://packages.ubuntu.com/focal/wpasupplicant
# ---------------------------
# 4. INSTALL MISSING PACKAGES
# ---------------------------
# Install all packages inside USB disk to the server machine
lsblk --paths                   # find your USB disk path, i.e. /dev/sdb1
mkdir usbdisk                   # create a temporaty disk mount target
sudo mount /dev/sdb1 usbdisk    # mount disk to temporary target
ls -lh usbdisk                  # ensure downloaded packages are in your usb directory
cd usbdisk                      # switch to the package directory to write less :)
# first "wpasupplicant" dependencies
sudo dpkg --install libnl-route-3-200_***.deb
sudo dpkg --install libpcsclite1_***.deb
# then "wpasupplicant" itself
sudo dpkg --install wpasupplicant_***.deb
# second "network-manager" dependencies
sudo dpkg --install libbluetooth3_***.deb
sudo dpkg --install libjansson4_***.deb
sudo dpkg --install libmm-glib0_***.deb
sudo dpkg --install libndp0_***.deb
sudo dpkg --install libnm0_***.deb
sudo dpkg --install libteamdctl0_***.deb
# lastly "network-manager" itself
sudo dpkg --install network-manager_***.deb
# HINT: you may combine all package installs into a single liner
# --------------------------------------
# 5. APPLY NETWORK SETTING TO THE SYSTEM
# --------------------------------------
# Now we have NetworkManager installed. Generate the system configuration object and apply it to the system.
# This will throw an error if NetworkManager isn't installed correctly
sudo netplan --debug apply
# --------------------------
# 6. TEST NETWORK CONNECTION
# --------------------------
# That's all. If everything is in-place DHPC server should auto-assign a valid IP for four wireless network interface.
ip address             # re-run to get network interface info
curl -I mozilla.org    # check network connection
# -------------------------
# 7. UPDATE SYSTEM PACKAGES
# -------------------------
# OPTIONAL: Update system packages before continuing to be sure that current setup is not interfering with initial updates.
sudo apt update
sudo apt upgrade
```

## Troubleshooting

- `NO-CARRIER` device state - Double-check your access-points' name (SSID) and password. Keep double quotes around them. They should be kept to keep YAML syntax valid in case your credentials break syntax with some reserved phrase. They I got this message for a single time, but I couldn't manage to reproduce it. It prevented almost everything, and I had to start over with re-installing Ubuntu Server 20.04.1 LTS. You may try turning off and on auto `dhcp4: true` assignment in your configuration.

## A Note on "networkd" (default) renderer

Netplan's default renderer `systemd-networkd` doesn't support **wifi** out-of-the-box. It requires **wpasupplicant** package to be installed on your system.

I've tried really hard to make it work with Netplan but I couldn't manage to connect to the wifi over default renderer. It was my intention in the first place to write a tutorial for both renderers but, this will be all for now. I hope I'll find a default renderer solution soon and add it to the post.

## Fin!

I'm sure there are easier ways out there to overcome this problem, and from a network admin's perspective, it might be redundant to solve it. This post isn't intended to solve "real-world" problems. Keep that in mind! Just take the parts that you think useful for you from the post. And continue to challenge yourself.
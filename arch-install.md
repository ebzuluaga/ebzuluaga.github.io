---
tags:
  - oslinux
  - os
---
# Installing the system

Steps:
1. Obtain an installation image and burn it into the USB drive. you can
	simply do `cp archlinux.iso /dev/sdx`.
	_Alternatively_ you can do the following:
	1. Determine the optimal buffer size of the installation media device:
		`lsblk -o NAME,LABEL,SIZE,OPT-IO`
	2. Write the installation image to the installation media with the following command
		`dd if=archlinux.iso of=/dev/sdx bs=your_buffer_size`

2. Boot from the installation media.
3. Partition the discs with something like `fdisk` or `parted`
	-  One EFI partition (of around 1G) (prefferably fat32) 5
	-  One Root partition (ext4, btrfs, etc.)
	-  (optionally) one 'home' partition
	-  (optionally) one SWAP partition

4. Format the partitions.
```sh
mkfs.fat -F 32 /dev/efi_partition # EFI partition should be FAT32
mkfs.ext4 /dev/root_partition     # root can be anything
mkswap /dev/swap_partition
```

5. Mount the partitions.
```sh
mount --mkdir /dev/root_partition /mnt      # root goes first
mount --mkdir /dev/efi_partition /mnt/efi   # This is supposed to be the
											# recommended mount point.
mount --mkdir /dev/home_partition /mnt/home # optional
swapon /dev/swap_partition
```

6. Update the mirrorlist file
```sh
reflector --latest 20 \
		  --country US,CO, \
		  --sort rate \
		  --save /etc/pacman.d/mirrorlist
```

## Install and configure the new system

1. Install packages with `pacstrap`. Below is a list of packages that you'd want to install.
	-  Required: `base`, `linux`, `linux-firmware`
	-  Essentials:
		- Networking
			- `networkmanager`
			- (some DHCP server)
		- compiling/developing software
			- `base-devel`
			- `git`
		- Misc system administration
			- `sudo`
			- `openssh`
			- `reflector`
			- `rsync` 
		- text editing
			- `nano`
			- `micro`
			- `vi`
			- `vim`
			- `emacs`
		- documentation
			- `man`
			- `man-db`
			- `man-pages`
			- `texinfo`
		- console fonts
			- `terminus-font`
```sh
# dont forget the -k :P
pacstrap -k mnt base linux linux-firmware networkmanager git sudo micro nvim openssh rsync
```

2. generate and copy the fstab file
```sh
genfstab -U /mnt >> /mnt/etc/fstab
```
3. Change root
```sh
arch-chroot /mnt
```
4. Set the timezone and sync the hardware clock
```sh
ln -sf /usr/share/zoneinfo/America/Bogota /etc/localtime
hwclock --systohc
```
5. Edit `/etc/locale.gen`, uncommenting the line with `en_US.UTF-8 UTF-8`
6. run:
```sh
locale-gen
echo 'LANG=en_US.UTF-8' >> /etc/locale.conf
echo 'FONT=ter-120n' >> /etc/vconsole.conf
```
7. Set the system hostname and enable the network manager daemon
```sh
echo 'arch-btw' > /etc/hostname
systemctl enable NetworkManager
```
8. Change the root password
```sh
passwd
```
9. Create a user, add it to the `wheel` group and change their password
```sh
useradd -m -G wheel yourname 
passwd yourname
```
10. Edit the sudoers file, uncomment the line with `%wheel ALL=(ALL:ALL) ALL`
```sh
visudo
```
11. install a bootloader and reboot
### Bootloader Installation
#### GRUB
For GPT partition tables: There must be a 'BIOS Boot' type partition where grub can be installed. 
For MBR partition tables: You don't need extra partitions
Now that you have the partitions thing sorted out, install grub and run the installation
```sh
pacman -S grub
grub-install
```
Next generate the configuration. It is not recommended to manually edit the resulting configuration file, instead, you should edit it through the system's configuration such as the `/etc/default/grub` and scripts inside `/etc/grub.d/` 
Once you are ready to generate the config, make sure to either be booted or chrooted into the system and run: 
```sh
grub-mkconfig -o /boot/grub/grub.cfg
```

The installation is done and you can now reboot 

#### Systemd Boot 
1. make sure you are chrooted 
2. make sure the boot partition is set to `/boot`
3. run `bootctl install`
#todo: add the installation steps, and the loader and entries configuration examples
I'll probably need information about the drives for configuring systemd
```sh
sudo blkid -s UUID -o value /dev/sda1 # outputs the UUID of /dev/sda1
```
Example of an entry in `/boot/loader/entries/2025-07-03_23-10-35_linux.conf`:
```txt
# Created by: archinstall
# Created on: 2025-07-03_23-10-35
title   Arch Linux (linux)
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=PARTUUID=e3d79530-83df-462f-9943-da776a3e42b7 zswap.enabled=0 rw rootfstype=ext4
```
## Post Installation
1. Log in as root, install `sudo` and `vim`, then edit the sudoers file and then add a user with `wheel` as a secondary group if it isn't done in creation.
```sh
pacman -S --needed sudo vim
useradd -mG wheel yourname
# or this if you already have a user with a home dir
usermod --append --groups wheel yourname # same as -a -G
visudo # here uncomment the line that contains `%wheel ALL=(ALL:ALL) ALL`
```
2. Install useful packages (e.g. `man-doc`, `micro`, `bat`, or anything from [[#Cool programs|here]])
3. Enable `systemd-resolved` to use mDNS and find computers on your local LAN through their hostname.
```sh
systemctl enable --now systemd-resolved.service
# now you can ping machines on your network
ping rpi.local # this should work
```
4. Pacman eye-candy: in the `[options]` section of your `/etc/pacman.conf` file, add the options `Color` and `ILoveCandy`.
## Misc

### Mount ntfs drives with correct unix permissions

Inside `fstab`, use the following mount options:
```
uid=1000,gid=1000,dmask=022,fmask=133,windows_names,nofail,exec
```
Example `/etc/fstab` from my current system
```
# Static information about the filesystems.
# See fstab(5) for details.

# <file system> <dir> <type> <options> <dump> <pass>
# /dev/sda2
UUID=3e4c8041-f2cd-4f91-a03e-e52f49a055af   /               ext4   rw,relatime                                                                                             0 1

# /dev/sda1
UUID=DE85-8853                              /boot           vfat   rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro   0 2

UUID=4289FA0220A3A689                       /media/data     ntfs   nofail,users,dmask=022,fmask=133,uid=1000,gid=1000,windows_names,exec                                   0 0
UUID=F0C07D94C07D6230                       /media/win-c    ntfs   nofail,users,dmask=022,fmask=133,uid=1000,gid=1000,windows_names,exec                                   0 0
UUID=889E68EC9E68D3EA                       /media/backup   ntfs   nofail,users,dmask=022,fmask=133,uid=1000,gid=1000,windows_names,exec                                   0 0
```

> [!note]+
> the `1000` corresponds to the user and group `id`, check your user's `id` by running the `id` command

# Cool programs

just some fun and cool programs 
- Aesthetics
	- `lolcat`: rainbow text on the terminal
	- `colortest` (my script)
	- cool scripts to show people how the 1337 hackers do
		- `cmatrix`/`unimatrix`
		- `cbonsai`
		- `maze.py`
		- `pipes.sh`
		- `snakes.pl`
	- `neofetch`/`pfetch`/`fastfetch` / `nofetch`
	- 
- Somewhat useful (sorta)
	- nerd fonts
	- Starship prompt
	- `tt`: typing test written in rust
	- `git-prompt.sh`: first-party repo information on the terminal
- very useful
	- `yt-dlp`
	- `qmk` 
- Le minimalist computing lifestyle
	- `bspwm` + `sxhkd`: Window manager and hotkey daemon
	- `alacritty`: terminal emulator
	- `nsxiv`: image viewer
	- `maim`: screen capture
	- `weechat`: multi-protocol chat client
- "work"
	- Godot IDE
	- Krita
	- GIMP
	- OBS Studio
	- VSCode/VSCodium
		- if using codium you may want to do ` sudo ln -s /usr/bin/codium /usr/bin/code`. 
		- if using the flatpak version of codium, add the following lines to the shell configuration:
			- `alias codium='flatpak run com.vscodium.codium'`
			- `alias code='codium'`
		- if using the flatpak version of VSCode: 
			- `alias code='flatpak run com.visualstudio.code'`
		- Remember to add the configuration option for using a regular system shell when opening the terminal. 
	- LibreOffice
	- Discord
	- Element or some other matrix client
- KDE: Arch meta packages for various KDE applications:
	-  `kde-applications-meta` or, if you _don't_ want every single KDE program known to man:
	-  `kde-{system,multimedia,office,utilities,graphics}-meta`


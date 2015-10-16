---
layout: post
title: Computer Network Chapter1
categories: notes
tags: Computer-Network
---

## **Chapter1 Introduction**

### > Network Architecture

- host / end system
- communication link</br>Different link holds different bandwidth.(transmission rate)
- packet switch (router)

* * *

### > Network Edge
Hosts sometimes are divided into 2 categories: **client host** and **server host**. They combine together and form a model called **CS Model**. CS Internet application is a kind of **distributed application**.

Another model is **P2P model（对等网络模型）**. For each host, it not only plays the role of client, but also the role of server. There are many P2P applications such as Internet phone, P2P file system...

**Access Network**
- residential access (dial up modem, DSL, HFC)
- company access (LAN)
- wireless access

* * *

### > Network Core

==**circuit switching**==

==**packet switching**==

Message is divided into several packets. Packets get through the link in max speed of that communication link.

**Store and forward transmission（存储转发机制）**

cause transmission delay

**output buffer or output queue**

cause packet lost and queuing delay

**statictical multiplexing(统计多路复用)**

分组交换使用按需的方式分配链路，从而提高了链路的利用效率。
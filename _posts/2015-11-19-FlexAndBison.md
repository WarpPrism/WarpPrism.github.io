---
layout: post
title: Flex + Bison 实现语法分析
categories: tech-post
tags: compile-principle
---

###关于Flex###
Flex(Fast lexical analyzer generator)快速词法分析器，它是lex的开源版本，通常与GNU Bison协同运作，共同完成编译过程中的语法分析。其主要功能是生成一个分析器的C源码，描述规则采用正则表达式，其文件的后缀名一般为.l或.lex，经过flex编译之后生成lex.yy.c文件，经gcc编译生成a.out可执行程序。然后运行该程序即可将input stream转化为相应的标识符token。

###相关链接###
[Yacc与Lex快速入门](http://www.ibm.com/developerworks/cn/linux/sdk/lex/)

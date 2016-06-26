---
layout: post
title: JavaScript中的排序算法
tags: [JavaScript]
categories: tech-post
excerpt: 对于JavaScript来说，推荐快速排序算法，其执行效率比较高。
---

三种常用的简单排序算法（JavaScript描述），默认从小到大排列，下面是code：

~~~javascript
function quickSort(arr) {
    if (Object.prototype.toString.call(arr) != '[object Array]') {
        return 'Error: Not Array Object';
    }
    if (arr.length <= 1) {
        return arr;
    }

    var middle = Math.floor(arr.length / 2);
    var pivot = arr.splice(middle, 1)[0];
    var left = [], right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return (quickSort(left).concat([pivot], quickSort(right)));
}
~~~

~~~javascript
function selectSort(arr) {
    if (Object.prototype.toString.call(arr) != '[object Array]') {
        return;
    }
    if (arr.length <= 1) return arr;

    for (var i = 0; i < arr.length - 1; i++) {
        var min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        var temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
~~~

~~~javascript
function bubbleSort(arr) {
    if (Object.prototype.toString.call(arr) != '[object Array]') {
        return;
    }
    if (arr.length <= 1) return arr;

    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i; j < arr.length; j++) {
            if (arr[j + 1] < arr[j]) {
                // swap
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
~~~

对于Javascript来说，推荐快速排序算法，其执行效率比较高。

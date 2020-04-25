---
title: Measure performance using console.time
date: "2019-04-10T22:40:32.169Z"
lastModified: "2019-04-10T22:40:32.169Z"
---

We write several implementations of a computer program, but sometimes confuse about performance and which one to choose. 
In Javascript, console has a `time` and `timeEnd` methods which can be used to measure the execution time of a code block. 
It starts a timer which you can use to track how long an operation takes.

*A good programmer looks both ways before crossing a one-way street.*

## Example

We have a function which calculates the number of keys in the window object. 

So which one will you choose ?

**One way**

```js
function amISlow() {
	const windowLength = Object.keys(window).length;
	return windowLength;
}

console.time('execution time');
amISlow();
console.timeEnd('execution time');
// execution time: 0.102783203125ms
```

**The other way**

```js
const windowLength = Object.keys(window).length;

function amISlow() {
	return windowLength;
}

console.time('execution time');
amISlow();
console.timeEnd('execution time');
// execution time: 0.030029296875ms
```

You can clearly see that **The other way** is pretty fast but it does not give any strong reason to use, because, it is polluting the global scope of program. So I shall prefer to go with **One way**.

## But, what if we execute the `amISlow` several times eg. loop or keypress?

**One way**
```js
console.time('execution time');
for(let i = 0; i < 100; i+=1) {
	amISlow();
}
console.timeEnd('execution time');
// execution time: 5.300048828125ms
```

**The other way**
```js
console.time('execution time');
for(let i = 0; i < 100; i+=1) {
	amISlow();
}
console.timeEnd('execution time');
// execution time: 0.02490234375ms
```

But, now you can see the performance boost of almost 5ms. You can also justify use of `windowLength` as a global variable; 

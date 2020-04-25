---
title: Memory leaks and how to find them using Chrome Dev Tools
date: "2019-08-31T22:00:00.000Z"
lastModified: "2019-09-01T22:00:00.000Z"
---

The memory leaks are very hard to find in an application and they can be avoided during writing the code by taking some precautions. Every developer should be aware of the most common memory leak patterns.

In this article, I'll try to cover the memory lifecycle pattern in applications, the most common causes of memory leaks and how you can identify them in Chrome Dev Tools.

#### The Memory Lifecycle Patterns

The memory lifecycle pattern says that **some memory is allocated to your code**, **The allocated memory is being used by your code** and then **it is released (freed) when your code is executed**. 

![Alt Text](/odv6bz1z5w0ctjck13fy.jpeg)



#### Causes of the Memory Leaks

**1. The Accidental Global** in `non-strict` mode

```javascript
function iCauseMemoryLeak() {
  temp = 1;
}
```

Here, you are assigning a value to `temp` variable which is not available in any of the scopes of the `iCauseMemoryLeak` function. The Javascript compiler sets the variable in the `global` scope and variable `temp` is not garbage collected in future. It stays there forever during your application lifecycle. 


**2. The Forgotten Timers**

```javascript

setTimeout(() => {
  /** Perform a task here.. */
}, 1000);

// OR

setInterval(() => {
  /** Perform a task here.. */
}, 1000);
```

The *timers* allocates dynamic memory to perform the task and if you forget to clear the *timers*, then it will cause a memory leak. 

You can clear the `setTimeout` using `clearTimeout` and `setInterval` using `clearInterval`

```javascript

var a = setTimeout(() => {
  /** Perform a task here.. */
}, 1000);

clearTimeout(a);

// OR

var b = setInterval(() => {
  /** Perform a task here.. */
}, 1000);

clearInterval(b);
```

**3. The DOM manipulations**

Just imagine, you have two buttons and when you click on *buttonOne* then it will remove the *buttonTwo* from the DOM. 

```javascript

const buttonOne = document.querySelector('#button-a');
const buttonTwo = document.querySelector('#button-b');

buttonOne.addEventListener('click', () => {
    document.body.removeChild(buttonTwo);
});
```

In the above code, you remove the `buttonTwo` from DOM by clicking `buttonOne`, but we never remove the reference of `buttonTwo` which is stored in the variable `buttonTwo`. This kind of memory leak can be very dangerous.

We can avoid this by storing the reference of `buttonTwo` inside the `click` event listener. 

```javascript
const buttonOne = document.querySelector('#button-a');

buttonOne.addEventListener('click', () => {
    const buttonTwo = document.querySelector('#button-b');
    document.body.removeChild(buttonTwo);
});

```

Here, We remove the `buttonTwo` from the *DOM* by clicking on `buttonOne` and it is *Garbage collected*.


#### Identification in Chrome Dev Tools

- Open Chrome dev tools.
- Load your website.
- Select **Memory** checkbox in the performance panel and the click on **Reload** icon.

![Alt Text](/m5d8o6wa9e623tjxo9x1.png)
- Load the profile and memory graphs.


#### Analysing the Memory Graphs

**Image A**
![Alt Text](/li94mzf1kqifok9r485y.png)


**Image B**
![Alt Text](/4shikummcyopgsvxtq1s.png)

*What do you think? Which image does represent memory leak?*

Let's find the answer by following the *Memory Lifecycle Pattern*.

> Allocate memory, Use memory and Release memory. 

In *image A*, The application starts, it uses some memory and then releases it and this nature follows until the application is in loading state. In the end, when the application is loaded, you can notice that the graphs stay almost linear and flat. It indicates that application with image A needs that reserved memory for the application run time and the required memory is constant. 

While, on the other hand, In *image B*, The memory graphs are always increasing till the end, they are a step function and these graphs represent the increase in memory over time. 

Now, we can say that *image B* represents the memory leak. 


I hope you enjoy reading this article. Happy learning. 

*P.S. Can you guess the website in Image A of which I generated the memory graphs?*




#### References:

1. [Garbage collection in Javascript](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Internals/Garbage_collection)
2. [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) and [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
3. [Chrome Dev Tools Documentaion](https://developers.google.com/web/tools/chrome-devtools/)

---
title: Is your code fast enough? Find out in Chrome Dev Tools
date: "2019-09-03T22:00:00.000Z"
lastModified: "2019-09-03T22:00:00.000Z"
---

We all have that curiosity to find out that is my code fast enough, when is it loaded in the application lifecycle, and what is the execution time, or what happens in the application when you just add a function block.


Chrome dev tool is really powerful enough to find out answers of all these questions. You can use the [performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance) API to analyse the role of a code block inside your application. 


##  Let's find out the execution time of `for` loop to perform `1000000000` iterations. 

```javascript 
  performance.mark("start"); // start marker 
  
  for(let i = 0; i < 1000000000; i += 1){}

  performance.mark("end"); // end marker 
  performance.measure("for loop performance report", "start", "end");

  const measurements = performance.getEntriesByType("measure");
  console.log(measurements);
```

When you run the above code in the browser, you can find the performance in chrome dev tools. 
- Load your application. 
- Open Chrome developer tools.
- Select the `Performance` tab. 
- Record the new profiling by clicking on the `reload` icon. ![Alt Text](/9dmniwpoz0jeund3734x.jpeg)
- Check the execution time inside the timing section. ![Alt Text](/ylb9h4r3iskvk4z4xipq.png)


You can clearly notice that `for` loop is executed for `544ms` before the `FMP(First meaningful paint)` and after the `onload` events. 


I hope you find the article useful. Happy learning.  ☺️


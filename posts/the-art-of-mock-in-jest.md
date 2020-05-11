---
title: the art of mocking in Jest
date: "2019-03-27T22:40:32.169Z"
lastModified: "2019-03-27T22:40:32.169Z"
---

Jest is a very simplistic framework for Javascript testing. Though, the initial setup and documentation is 
really helpful, But I have faced a difficulty to understand the concept of mocking. 

I am using Jest from last 2 years at work and in personal projects. After my time with Jest and I can recommend to 
learn folloing Jest's APIs to learn mocking in an efficient way.

- jest.mock
- jest.doMock
- jest.spyOn


Note: I am using Lodash in the examples.


## `jest.mock`

When the mock of a dependency does not change in the test scenarios, jest.mock is really helpful. The mocks are 
globally hosted in the test file. After setting a mock with `jest.mock`, the mock can not be changed.  


```javascript

	jest.mock('lodash', () => ({
		isEqual(a,b){
			return false;
		}
	}));

```

In the above mock, isEqual always returns false. It also means that the return value of isEqual does not change in the
test scenarios. 

#### when not to use:

- Testing expecation are different in test cases.

```javascript
	// case 1
	test('isEqual returns false' () => {
		expect(isEqual(4,4)).toBeFalsy();
	});

	// case 2
	test('isEqual returns true' () => {
		expect(isEqual(4,4)).toBeTruthy();
	});

```

In Case 1, the test expecation passes successfully, On the other  hand, if we want to pass the test expectation for 
Case 2, then we need to change the value of our mock.  The value of mock is globally hoisted and can not be changed 
when using `jest.mock`.

- Only few methods / parts are required to mock. 

## `jest.spyOn`

jest.spyOn is good to use when the individual dependencies of a package / module need to mock. In my case, I want to
mock `isEqual` from lodash. 

I prefer to use spyOn in following situations:

- Package / module returns an object of methods. 

eg. 

```javascript
{
	doSomething: () => {},
	doOtherThing: () => {}
}

```
- Mock changes in test expecations. In my case, isEqual returns true for some cases, and returns false for some cases.
- Only some dependecies to be mocked.

 

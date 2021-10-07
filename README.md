# abstract-method

A tiny utility for creating abstract methods.



## Install

```sh
npm i --save abstract-method
```



## Usage

```js
import abstract from 'abstract-method';

class MyClass {
  /* ... */
}

// this creates 2 abstract methods 'foo' and 'bar'
abstract(MyClass, 'foo', 'bar');
```



### Getter & Setter

```js
abstract.getter(MyClass, 'foo');
abstract.setter(MyClass, 'bar');
```



### Static Method

```js
abstract.static(MyClass, 'foo');
```



### Static Getter & Setter

```js
abstract.static.getter(MyClass, 'foo');
abstract.static.setter(MyClass, 'bar');
```



### Error

```js
class Animal {}
abstract(Animal, 'walk');

var animal = new Animal();
animal.walk(); // throws NoImpl error
```

```js
class Snake extends Animal {}
var snake = new Snake();
snake.walk(); // throws NoImpl error
```

```js
class Dog extends Animal {
  walk() {
    // implementation
  }
}
var dog = new Dog();
dog.walk(); // OK
```



---

- Author: Satoshi Soma ([amekusa.com](https://amekusa.com))
- License: MIT


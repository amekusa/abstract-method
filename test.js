import assert from 'assert';
import abstract from './index.js';

describe(`Abstract`, () => {
	let c;

	beforeEach(() => {
		c = {};
		c.Animal = class Animal {};
		c.Snake = class Snake extends c.Animal {};
		c.Dog = class Dog extends c.Animal {
			walk() {
				return true;
			}
		};
	});

	it(`method`, () => {
		abstract(c.Animal).method('walk');
		assert.equal(c.Animal.walk, undefined);
		assert.equal(typeof c.Animal.prototype.walk, 'function');

		let animal = new c.Animal();
		assert.throws(() => {
			animal.walk();
		}, {
			name: 'NoImpl',
			info: {
				class: 'Animal',
				method: 'walk',
				declared_in: 'Animal'
			}
		});

		let snake = new c.Snake();
		assert.throws(() => {
			snake.walk();
		}, {
			name: 'NoImpl',
			info: {
				class: 'Snake',
				method: 'walk',
				declared_in: 'Animal'
			}
		});

		let dog = new c.Dog();
		let r;
		assert.doesNotThrow(() => {
			r = dog.walk();
		});
		assert.ok(r);
	});
});

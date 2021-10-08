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
			get legs() {
				return 4;
			}
			set sex(x) {
				this._sex = x;
			}
		};
	});

	it(`method`, () => {
		abstract(c.Animal).method('walk');
		assert.equal(c.Animal.walk, undefined);
		assert.equal(typeof c.Animal.prototype.walk, 'function');

		let r;

		let animal = new c.Animal();
		assert.throws(() => {
			r = animal.walk();
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
			r = snake.walk();
		}, {
			name: 'NoImpl',
			info: {
				class: 'Snake',
				method: 'walk',
				declared_in: 'Animal'
			}
		});

		let dog = new c.Dog();
		assert.doesNotThrow(() => {
			r = dog.walk();
		});
		assert.ok(r);
	});

	it(`getter`, () => {
		abstract(c.Animal).getter('legs')
		assert.equal(c.Animal.legs, undefined);

		let legs = 0;

		let animal = new c.Animal();
		assert.throws(() => {
			legs = animal.legs;
		}, {
			name: 'NoImpl',
			info: {
				class: 'Animal',
				method: 'legs',
				declared_in: 'Animal'
			}
		});

		let snake = new c.Snake();
		assert.throws(() => {
			legs = snake.legs;
		}, {
			name: 'NoImpl',
			info: {
				class: 'Snake',
				method: 'legs',
				declared_in: 'Animal'
			}
		});

		let dog = new c.Dog();
		assert.doesNotThrow(() => {
			legs = dog.legs;
		});
		assert.equal(legs, 4);
	});

	it(`setter`, () => {
		abstract(c.Animal).setter('sex');
		assert.equal(c.Animal.sex, undefined);

		let animal = new c.Animal();
		assert.throws(() => {
			animal.sex = 'male';
		}, {
			name: 'NoImpl',
			info: {
				class: 'Animal',
				method: 'sex',
				declared_in: 'Animal'
			}
		});

		let snake = new c.Snake();
		assert.throws(() => {
			snake.sex = 'mail';
		}, {
			name: 'NoImpl',
			info: {
				class: 'Snake',
				method: 'sex',
				declared_in: 'Animal'
			}
		});

		let dog = new c.Dog();
		assert.doesNotThrow(() => {
			dog.sex = 'male';
		});
		assert.equal(dog._sex, 'male');
	});

});

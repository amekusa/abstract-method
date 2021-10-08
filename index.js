/*!
 * abstract-method
 * author: Satoshi Soma (https://amekusa.com)
 * license: MIT
 */

class NoImpl extends Error {
	static format(str, data) {
		let r = str;
		for (let i in data) r = r.replaceAll(`%${i}%`, data[i]);
		return r;
	}
	constructor(msg, info) {
		super(new.target.format(msg, info));
		this.name = new.target.name;
		this.info = info;
	}
}

class Abstract {
	constructor(cls) {
		this._class = cls;
	}
	get class() {
		return this._class;
	}
	_declare(names, type, isStatic) {
		let abs = this._class;
		let absName = 'name' in this._class ? this._class.name : '<anonymous class>';
		let map = {
			method: 'value',
			getter: 'get',
			setter: 'set'
		};
		for (let i = 0; i < names.length; i++) {
			let name = names[i];
			Object.defineProperty(isStatic ? this._class : this._class.prototype, name, {
				enumerable: false,
				configurable: true,
				[map[type]]: function () {
					let cls = isStatic ? this : this.constructor;
					let msg = `'${name}' is an abstract ${isStatic ? 'static ' : ''}${type} ` +
						(cls === abs ? `and cannot be invoked directly` : `declared in %declared_in% and must be implemented in %class%`);
					let info = {
						class: 'name' in cls ? cls.name : '<anonymous class>',
						method: names[i],
						declared_in: absName
					};
					throw new NoImpl(msg, info);
				}
			});
		}
		return this;
	}
	method(...names) {
		return this._declare(names, 'method', false);
	}
	getter(...names) {
		return this._declare(names, 'getter', false);
	}
	setter(...names) {
		return this._declare(names, 'setter', false);
	}
	static(...names) {
		return this._declare(names, 'method', true);
	}
	staticMethod(...names) {
		return this._declare(names, 'method', true);
	}
	staticGetter(...names) {
		return this._declare(names, 'getter', true);
	}
	staticSetter(...names) {
		return this._declare(names, 'setter', true);
	}
}

function X(cls) {
	return new Abstract(cls);
}

export default X;

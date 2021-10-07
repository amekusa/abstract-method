/*!
 * abstract-method
 * author: Satoshi Soma (https://amekusa.com)
 * license: MIT
 */

class NoImpl extends Error {
	constructor(msg, info) {
		super(msg);
		this.name = new.target.name;
		this.info = info;
	}
}

function _abstract(cls, names, opts) {
	let map = {
		method: 'value',
		getter: 'get',
		setter: 'set'
	};
	for (let i = 0; i < names.length; i++) {
		let name = names[i];
		Object.defineProperty(opts.static ? cls : cls.prototype, name, {
			enumerable: false,
			configurable: true,
			[map[opts.type]]: function () {
				let c = opts.static ? this : this.constructor;
				let msg = `'${name}' is an abstract ${opts.static ? 'static ' : ''}${opts.type} ` +
					(c === cls ? `and cannot be invoked directly` : `declared in '${cls.name}' and must be implemented in '${c.name}'`);
				let info = {
					class: (opts.static ? this : this.constructor).name,
					method: names[i],
					declared_in: cls.name
				};
				throw new NoImpl(msg, info);
			}
		});
	}
};

function X(cls, ...names) {
	_abstract(cls, names, { type: 'method', static: false });
}
X.getter = function (cls, ...names) {
	_abstract(cls, names, { type: 'getter', static: false });
};
X.setter = function (cls, ...names) {
	_abstract(cls, names, { type: 'setter', static: false });
};
X.static = function(cls, ...names) {
	_abstract(cls, names, { type: 'method', static: true });
}
X.static.getter = function (cls, ...names) {
	_abstract(cls, names, { type: 'getter', static: true });
}
X.static.setter = function (cls, ...names) {
	_abstract(cls, names, { type: 'setter', static: true });
}

export default X;

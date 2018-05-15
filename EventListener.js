'use strict';

/**
 * The event listener class to listen and trigger events.
 */
class EventListener {
	constructor() {
		['addListener', 'addTempListener', 'removeListener', 'triggerEvent'].map(method => this[method] = this[method].bind(this));
		this.mListeners = [];
		this.mTempListeners = [];
	}

	addListener(listener, isTempListener) {
		if (isTempListener) {
			this.mTempListeners.push(listener)
		} else {
			this.mListeners.push(listener);
		}
	}

	addTempListener(listener) {
		return this.addListener(listener, true);
	}

	removeListener(listener) {
		let index = this.mListeners.indexOf(listener);
		if (index > -1) {this.mListeners.splice(index, 1);}
	}

	// Trigger the listeners with the received params.
	triggerEvent(...params) {
		this.mListeners.map(listener => listener && listener(...params));
		const temp = this.mTempListeners;
		this.mTempListeners = [];
		temp.map(listener => listener && listener(...params));
	}
}

module.exports = EventListener;

'use strict';

/**
 * The event listener class to listen and trigger events.
 */
export class EventListener {
	private mListeners: Function[] = [];
	private mTempListeners: Function[] = [];

	constructor() {
		['addListener', 'addTempListener', 'removeListener', 'triggerEvent'].map(method => this[method] = this[method].bind(this));
	}

	addListener(listener: Function, isTempListener?: boolean) {
		if (isTempListener) {
			this.mTempListeners.push(listener);
		} else {
			this.mListeners.push(listener);
		}
	}

	addTempListener(listener: Function) {
		return this.addListener(listener, true);
	}

	removeListener(listener: Function) {
		let index = this.mListeners.indexOf(listener);
		if (index > -1) {this.mListeners.splice(index, 1);}
	}

	// Trigger the listeners with the received params.
	triggerEvent(...params: any[]) {
		this.mListeners.map(listener => listener && listener(...params));
		const temp = this.mTempListeners;
		this.mTempListeners = [];
		temp.map(listener => listener && listener(...params));
	}
}

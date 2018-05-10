import jsdom from 'jsdom';
import chai from 'chai';

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const win = dom.window;

global.document = win.document;
global.window = win;

Object.keys(window).forEach((key) => {
	if(!(key in global)) {
		global[key] = window[key];
	}
});

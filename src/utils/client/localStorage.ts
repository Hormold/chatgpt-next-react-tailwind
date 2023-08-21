"use client"

const localMemory = {} as Record<string, any>;

export const set = (key: string, value: any): void => {
	if(typeof localStorage === "undefined") {
		localMemory[key] = value;
		return;
	}
	localStorage.setItem(key, JSON.stringify(value));
};

export const get = (key: string, defaultValue: any = null): any => {
	if(typeof localStorage === "undefined") {
		return localMemory[key] || defaultValue;
	}
	if(localStorage.getItem(key) === null) {
		return defaultValue;
	}
	const value = localStorage.getItem(key);
	if(value === null)
		return defaultValue;
	
	try {
		return JSON.parse(value);
	} catch(e) {
		return defaultValue;
	}
};

export const remove = (key: string): void => {
	if(typeof localStorage === "undefined") {
		delete localMemory[key];
		return;
	}
	localStorage.removeItem(key);
}
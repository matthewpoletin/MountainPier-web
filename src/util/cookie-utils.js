"use strict";

import {getEnvironment} from "./environment-utils";
const config = require("../../config");
const mode = getEnvironment();

/**
 * setCookie - Set cookie
 * @param {object} cookie - Cookie data
 * @param {string} cookie.name - Name
 * @param {string} cookie.value - Value
 * @param {string} [cookie.domain] - Domain
 * @param {string} [cookie.path] - Path
 * @param {number} [cookie.expires] - Expires
 * @param {boolean} [cookie.secure] - Secure
 * @return {*}
 */
export function setCookie(cookie) {
	if (!(cookie.name || cookie.value)) {
		return undefined;
	}
	const expires = new Date();
	expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
	cookie.expires = cookie.expires || expires;
	cookie.value = cookie.value || "";
	cookie.domain = cookie.domain || config[mode].cookieDomain;
	cookie.path = cookie.path || "/";
	cookie.secure = cookie.secure || false;
	const cookieString = `${cookie.name}=${encodeURIComponent(cookie.value)};
        expires=${cookie.expires.toUTCString()};
        domain=${cookie.domain};
        path=${cookie.path};
        ${cookie.secure ? "secure;" : ""}`;
	document.cookie = cookieString.replace(/\n/gi, " ").replace(/\s+/gi, " ");
	return cookie.value;
}

/**
 * getCookie - Get cookie by name
 * @param {string} name - Name of a cookie
 * @return {string}
 */
export function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * deleteCookie - Delete cookie
 * @param {object} cookie - Cookie data
 * @param {string} cookie.name - Name
 * @param {string} [cookie.value] - Value
 * @param {string} [cookie.domain] - Domain
 * @param {string} [cookie.path] - Path
 * @param {number} [cookie.expires] - Expires
 * @param {boolean} [cookie.secure] - Secure
 * @return {boolean}
 */
export function deleteCookie(cookie) {
	const expires = new Date().setTime(0);
	return Boolean(setCookie(Object.assign(cookie, {expires: expires, value: ""})));
}
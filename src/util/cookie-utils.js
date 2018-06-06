"use strict";

export function setCookie(cookie) {
	if (!cookie.name || !cookie.value) {
		return undefined;
	}
	const expires = new Date();
	expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
	cookie.expires = cookie.expires || expires;
	cookie.domain = cookie.domain || process.env["COOKIE_DOMAIN"];
	cookie.path = cookie.path || "/";
	cookie.secure = cookie.secure || false;
	const cookieString = `${cookie.name}=${encodeURIComponent(cookie.value)};
    expires=${cookie.expires.toUTCString()};
    domain=${cookie.domain};
    path=${cookie.path};
    ${cookie.secure ? "secure;" : ""}`;
	console.log(cookieString.replace(/\n/gi, " ").replace(/\s+/gi, " "));
	document.cookie = cookieString.replace(/\n/gi, " ").replace(/\s+/gi, " ");
	return cookie.value;
}

export function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(cookie) {
	if (!cookie.name || !cookie.value) {
		return false;
	}
	const expires = new Date();
	expires.setTime(0);
	setCookie(Object.assign({}, cookie, {expires}));
}

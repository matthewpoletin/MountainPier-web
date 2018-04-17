const BASE_URL = "http://localhost:8549";
const USERNAME = "3";
const PASSWORD = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXR0aGV3UG9sZXRpbiIsImV4cCI6MTUyMDg3ODczMn0.FFwqOM5DmLznlUXdlzQDE5An1fuStZxCahdA58ra67Um6SL5QxyYUnO0mfHydcPJAyydi0OAAjbIE1bLm4XuAQ";

class UserService {
	/**
	 * UserService API Middleware
	 * @param {object} [option]
	 * @param {string} [option.url]
	 * @param {string} [option.username]
	 * @param {string} [option.password]
	 * @return {UserService}
	 * @constructor
	 */
	constructor(option) {
		if (!option || typeof option === "undefined") {
			option = {};
		}
		this.url = option.url || BASE_URL;
		this.username = option.username || USERNAME;
		this.password = option.password || PASSWORD;
		this.authorization = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXR0aGV3UG9sZXRpbiIsImV4cCI6MTUyMzQ1NDQ1NH0.naMppZandY5Vx_dpwHlZlsjEojeFXjFM0HmxLDn8fIkAGs4AOi667vA8nL9bzWPsIo4kuorDeqeXWRA_0lFsYw";
		this.accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXR0aGV3UG9sZXRpbiIsImV4cCI6MTUyMzk2MTAwMH0.kdHrq5ogYXe0sRSzP2sNTEijN47tYIqR0P3Yf7d_c0X3i9Mi5HvFEyQcqgfNLv3wngz8zo2K0kqU3xGlZdWKcg";
	}

	/**
	 * Получить список пользователей
	 * @param {object} option
	 * @param {number} option.size - количество пользователей
	 * @param {number} option.page - номер страницы
	 * @return {Promise<object>}
	 */
	getUsers(option) {
		return new Promise((resolve, reject) => {
			option = typeof option === "object" ? option : {page: 0, size: 20};

			const headers = new Headers();
			headers.append("Authorization", this.authorization);
			headers.append("Access-Token", this.accessToken);

			return fetch(this.url + "/users", {method: 'GET', headers: headers, mode: "cors"})
				.then(response => {
					if (response.status !== 200) {
						console.error("GET request to " + this.url + " , option " + JSON.stringify(option) + " failed, status " + response.status);
						return reject(new Error("")) // Здесь должен быть какой-нибудь понятный объект
					}
					return response.json();
				})
				.then(body => resolve(body))
				.catch(error => reject(error));
		});
	}
}

export default UserService;

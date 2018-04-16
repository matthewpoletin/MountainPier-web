// // import * as rp from "request-promise";
//
// const apiUrl = "http://localhost:8551";
//
// function getOptions(method, path, params, body, headers) {
// 	return {
// 		body,
// 		// auth: {
// 		// 	user: "1",
// 		// 	password
// 		// }
// 		// headers,
// 		headers: {
// 			'Authorization': "Basic MzpxVUxFVFMybVNqUktNZ05wcE1TdXRUUGI0eGIxSXpxeG1iTm9XdjlISFlvSUZNdVpVWg==",
// 		},
// 		json: true,
// 		method,
// 		qs: params,
// 		uri: apiUrl + path,
// 	};
//
// 	// return {
// 	// 	method: method,
// 	// 	uri: 'http://localhost:8550' + path,
// 	// 	qs: params,
// 	// 	// qs: {
// 	// 		// access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
// 	// 	// },
// 	// 	headers: {
// 	// 		'User-Agent': 'Request-Promise',
// 	// 		'Authorization': "Basic MzpxVUxFVFMybVNqUktNZ05wcE1TdXRUUGI0eGIxSXpxeG1iTm9XdjlISFlvSUZNdVpVWg==",
// 	// 	},
// 	// 	json: true,
// 	// };
// }
//
//
// class UserService {
//
// 	static async getUsers(page, size) {
// 		// const options = getOptions('GET', `api/social/users`, {page, size}, null, null);
// 		return fetch(`${apiUrl}/api/social/users?page=${page}`);
// 		// return rp(options);
// 	}
//
// 	static async createUser(userRequest) {
// 		const options = {};
// 		return rp(options);
// 	}
//
// 	static async getUserById(userId) {
// 		const options = getOptions('GET', `/users/${userId}`, null, null, null);
// 		return rp.get(options);
// 	}
//
// 	static async getUserByUsername(username) {
// 		const options = {};
// 		return rp.get(options);
// 	}
//
// 	static async updateUserById(userId, userRequest) {
//
// 	}
//
// 	static async deleteUserById(userId) {
//
// 	}
//
// 	static async getFriendsOfUserById(userId, page, size) {
//
// 	}
//
// }
//
// export default UserService;

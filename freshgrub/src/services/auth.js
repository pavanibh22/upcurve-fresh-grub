import { myAxios } from "./helper";

export const addTokenToHeaders = () => {
	let data = JSON.parse(localStorage.getItem("data"));

	if (data.token) {
		console.log("token: ", data.token);
		myAxios.defaults.headers["Authorization"] = `Bearer ${data.token}`;
	}
};

import { myAxios } from "../helper.js";

export const getAllFoodItems = async (categoryName) => {
	try {
		const response = await myAxios.get(`/menu/${categoryName}`);
		return response;
	} catch (err) {
		throw err;
	}
};

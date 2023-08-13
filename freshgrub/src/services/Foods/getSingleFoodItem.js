import { myAxios } from "../helper.js";

export const getSingleFoodItems = async (categoryName, foodId) => {
	try {
		const response = await myAxios.get(`/menu/${categoryName}/${foodId}`);
		return response;
	} catch (err) {
		throw err;
	}
};

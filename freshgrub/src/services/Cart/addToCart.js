import { myAxios } from "../helper.js";

const addToCart = async (userId, cartDetails) => {
	try {
		const response = await myAxios.post(
			`/cart/${userId}/add`,
			{},
			{
				params: {
					itemId: cartDetails.itemId,
					qty: cartDetails.qty,
					isOrdered: cartDetails.isOrdered,
				},
			}
		);
		return response;
	} catch (err) {
		throw err;
	}
};

export default addToCart;

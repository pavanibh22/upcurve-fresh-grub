import { myAxios } from "../utils/axiosAuth.js";

const getAllOrders = async (userId) => {
  try {
    const response = await myAxios.get(
      `/user/checkout/${userId}/ordersForVendor`
    );
    console.log(response.data + " from vendor orderr call");
    console.log(userId + "from GetAllOrders for vednor");
    return response;
  } catch (err) {
    throw err;
  }
};

export default getAllOrders;

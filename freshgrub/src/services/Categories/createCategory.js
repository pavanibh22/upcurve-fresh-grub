import { myAxios } from "../utils/axiosAuth.js";

// export const createCategory = async (categoryData) => {
//   console.log("Hello from cartcategory 1");
//   try {
//     const response = await myAxios.post("/foodStall/create", {
//       name: categoryData.name,
//       description: categoryData.description,
//       image: categoryData.picture[0].split(",")[1],
//     });
//     console.log("Hello from cartcategory 2");
//     return response;
//   } catch (err) {
//     throw err;
//   }
// };

export const createCategory = async (categoryData) => {
  console.log("Hello from cartcategory 1");
  try {
    const response = await myAxios.post("/foodStall/create", {
      name: categoryData.name,
      description: categoryData.description,
      image: categoryData.picture[0].split(",")[1],
    });
    console.log("Hello from cartcategory 2");
    return response;
  } catch (err) {
    throw err;
  }
};

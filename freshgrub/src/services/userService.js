// contains all things needed for server calling

import { myAxios } from "./helper";

//change the post api call according to backend
export const signUp = (signupData) => {
  return myAxios
    .post("/api/auth/register", signupData)
    .then((response) => response.data);
};

//change the post api call according to backend
export const login = (loginData) => {
  return myAxios
    .post("/api/auth/login", loginData)
    .then((response) => response.data);
};

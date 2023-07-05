import axios from "axios";

const BASE_URL = "http://localhost:8080/users";
export const findAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const save = async ({ username, email, password }) => {
  try {
    return await axios.post(BASE_URL, {
      username,
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};

export const update = async ({ id, username, email }) => {
  try {
    return await axios.put(`${BASE_URL}/${id}`, {
      username,
      email,
      //password: "nothing",
    });
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
};

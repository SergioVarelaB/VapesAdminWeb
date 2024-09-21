import axiosInstance from '../axios.js';

const src = 'user'

async function login(body) {
    try {
      const response = await axiosInstance.post(`${src}/login`, body);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
}


async function getUsers() {
  try {
    const response = await axiosInstance.post(`${src}/getUsers`, {});
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export { getUsers, login }
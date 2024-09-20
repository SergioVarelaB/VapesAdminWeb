import axiosInstance from '../axios.js';

const src = 'user'

async function getUsers(body) {
    try {
      const response = await axiosInstance.post(`${src}/login`, body);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
}

export default getUsers;
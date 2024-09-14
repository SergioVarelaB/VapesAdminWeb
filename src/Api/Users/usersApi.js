import axiosInstance from '../axios.js';

const loginApi = {
  async getUsers() {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
};

export default usersApi;
import axiosInstance from '../axios.js';

const srcOrders = 'orders'


async function getOrders() {
  try {
    const response = await axiosInstance.post(`${srcOrders}/get_sales`, {});
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export {getOrders};
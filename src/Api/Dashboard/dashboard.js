import axiosInstance from '../axios.js';

const srcOrders = 'orders'


async function getOrders(body) {
  try {
    const response = await axiosInstance.post(`${srcOrders}/get_sales`, body);
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

async function getOrdersByUser(user_id) {
  try {
    const response = await axiosInstance.post(`${srcOrders}/get_sales_by_user`, { user: user_id});
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

async function createSale(body) {
  try {
    const response = await axiosInstance.post(`${srcOrders}/create_order`, body);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {getOrders, getOrdersByUser, createSale};
import axiosInstance from '../axios.js';

const srcOrders = 'orders'
const srcInventory = 'inventory'


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
    const response = await axiosInstance.post(`${srcOrders}/get_sales_by_user`, { vendor: user_id});
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

async function getProductList() {
  try {
    const response = await axiosInstance.post(`${srcOrders}/get_products`, {});
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const response = await axiosInstance.post(`${srcOrders}/delete_product`, {id: productId});
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function updateProduct(productId, productUpdate) {
  try {
    const response = await axiosInstance.post(`${srcOrders}/update_product`, {id: productId, productUpdate: productUpdate});
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function createProduct(product) {
  try {
    const response = await axiosInstance.post(`${srcOrders}/create_product`, product);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function createInventory(inventory) {
  try {
    const response = await axiosInstance.post(`${srcInventory}/create_inventory`, {inventory: inventory});
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function getInventory(vendor) {
  try {
    const response = await axiosInstance.post(`${srcInventory}/get_inventory`, {vendor: vendor});
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


async function deleteUserInventory(vendor) {
  try {
    const response = await axiosInstance.post(`${srcInventory}/delete_inventory`, {vendor: vendor});
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function modyfyInventory(body) {
  try {
    const response = await axiosInstance.post(`${srcInventory}/modyfy_inventory`, body);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export {
  getOrders, 
  getOrdersByUser, 
  createSale, 
  getProductList,
  deleteProduct,
  updateProduct,
  createProduct,
  createInventory,
  getInventory,
  deleteUserInventory,
  modyfyInventory
};
import axiosInstance from "./axiosInstance";

const getAllProducts = async () => {
  const res = await axiosInstance.get('produtos/');
  return res.data;
}

const getProduct = async (id) => {
  const res = await axiosInstance.get(`produto/${id}`);
  return res.data;
}

const requestsService = {
  getAllProducts,
  getProduct,
}

export default requestsService;
import axiosInstance from "./axiosInstance";

const getAllProducts = async () => {
  const res = await axiosInstance.get('produtos/');
  console.log(res);
  return res;
}

const requestsService = {
  getAllProducts,
}

export default requestsService;
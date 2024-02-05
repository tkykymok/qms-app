import axiosInstance from "../config/axiosInstance";

const getStore = async (latitude: number, longitude: number) => {
  try {
    const response = await axiosInstance.get(`/store/search`, {
      params: {
        latitude: latitude,
        longitude: longitude,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getStore };

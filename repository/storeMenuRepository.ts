import axiosInstance from "../config/axiosInstance";

const getStoreMenu = async () => {
  try {
    const response = await axiosInstance.get("store-menu/list"); // ToDoのエンドポイント
    return response.data;
  } catch (error) {
    // エラー処理
    console.error(error);
    throw error;
  }
};

export { getStoreMenu };

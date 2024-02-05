import * as StoreRepository from "../repository/storeRepository";

const getStore = async (latitude: number, longitude: number) => {
  return await StoreRepository.getStore(latitude, longitude);
};

export default { getStore };

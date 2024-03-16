import * as TestRepository from "../repository/storeMenuRepository";

const storeMenuUsecase = async () => {
  return await TestRepository.getStoreMenu();
};

export { storeMenuUsecase };

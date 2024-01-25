import * as TestUsecase from "../usecase/testUsecase";

export const todoFetcher = (): Promise<any> => {
  return TestUsecase.getTodos();
};

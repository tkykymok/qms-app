export type Store = {
  storeId: number;
  companyId: number;
  storeName: string;
  postalCode: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  homePageUrl: string;
  isClosed: boolean;
  weekdayHours: string;
  holidayHours: string;
  regularHolidays: string[];
};

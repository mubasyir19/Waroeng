export interface StoreForm {
  store_name: string;
  address: string;
  phoneNumber: string;
  email: string;
  owner_id: string;
}

export interface Store {
  id: string;
  store_name: string;
  address: string;
  phoneNumber: string;
  email: string;
  owner: {
    id: string;
    name: string;
  };
}

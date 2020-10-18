export interface AddressItem {
  id: number;
  name: string;
  code: string;
}

export type Address = {
  province?: AddressItem;
  district?: AddressItem;
  ward?: AddressItem;
  street?: string;
};

export type AddressRequest = {
  province_id?: number | undefined;
  district_id?: number | undefined;
  ward_id?: number | undefined;
  street?: string | undefined;
};

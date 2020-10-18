export interface Province {
  id: string;
  name: string;
  code: string;
  districts?: District[];
}

export interface District {
  id: string;
  name: string;
  code: string;
  wards?: Ward[];
}

export interface Ward {
  id: string;
  name: string;
  code: string;
}

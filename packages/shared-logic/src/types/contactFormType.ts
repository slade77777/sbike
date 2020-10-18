export interface ContactFormType {
  type?: string;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  project_id?: string;
  scheduled_date?: string;
  agent_id?: string;
  note?: string;
  apartment_id?: string;
  address?: {
    province_id?: string;
    district_id?: string;
    ward_id?: string;
    address?: string;
  };
  financing_info_included?: boolean;
  owned?: boolean; // owner of this apartment (for sell)
  needs?: string; // BUYING, SELLING
  event_id?: string; // event of selling (not yet)
}

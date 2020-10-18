export interface Event {
  id: string;
  name: string;
  short_description: string;
  description: string;
  address: string;
  event_time: string;
  price: number;
  currency_code: string;
  project: {
    id: string;
    code: string;
    name: string;
    address: string;
  };
}

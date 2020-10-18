import {AddressRequest, Address} from './address';
import {Gender, BankType, LeadProject, Apartment} from './opportunity';

export enum PaymentMethod {
  TransferMoney = 'TRANSFER_MONEY',
  Cash = 'CASH',
}

export enum OrderCancelReason {
  PriceAndPolicy = 'PRICE_AND_POLICY',
  Location = 'LOCATION',
  DesignAndAmenities = 'DESIGN_AND_AMENITIES',
  Legal = 'LEGAL',
  Finance = 'FINANCE',
  Developer = 'DEVELOPER',
  OtherDemand = 'OTHER_DEMANDS',
  Others = 'OTHERS',
  TimeOut = 'TIME_OUT',
}

export interface CreateBookingOrderRequest {
  opportunity_id: number;
  project_id: number;
  payment_method: PaymentMethod;
  name: string;
  phone_number: string;
  email: string;
  identify_number: string;
  issued_date: string;
  issued_place: string;
  permanent_address: AddressRequest;
  current_address: AddressRequest;
  bank_id: number;
  bank_account_number: string;
  account_holder: string;
}

export interface CompleteBookingOrderRequest {
  agent_id: number;
  apartment_id: number;
  legal_document_name: string;
  legal_document_number: string;
}

export interface CompleteBookingOrderResponse {
  order_id: number;
}

export enum DocumentLawNameType {
  DepostAgreement = 'DEPOSIT_AGREEMENT',
  ESCowForm = 'ESCROW_FORM',
  ConfirmationOfApartmentBooking = 'CONFIRMATION_OF_APARTMENT_BOOKING',
  CreditContract = 'CREDIT_CONTRACT',
  SalePurchaseAgreement = 'SALE_PURCHASE_AGREEMENT',
}

export enum OrderState {
  Reservation = 'RESERVATION',
  Booking = 'BOOKING',
}

export enum OrderStatus {
  NotPaidYet = 'NOT_PAID_YET',
  Paid = 'PAID',
  WaitForBooking = 'WAIT_FOR_BOOKING',
  BookingSent = 'BOOKING_SENT',
  Success = 'SUCCESS',
  Cancel = 'CANCEL',
}

export enum MonetaryStatus {
  NotPaidYet = 'NOT_PAID_YET',
  Paid = 'PAID',
  WaitForRefund = 'WAIT_FOR_REFUND',
  Refunded = 'REFUNDED',
}

export type PaymentInformationResponse = {
  bank?: BankType;
  bank_account_number?: string;
  account_holder?: string;
};

export interface OrderListRequest {
  state: OrderState;
}
export interface BookingEvent {
  id: number;
  title: string;
  content: string;
  time: string;
}
export interface BookingOrderHistory {
  status: OrderStatus;
  description: string;
  update_time: number;
}

export interface BookingOrderResponse {
  id?: number;
  code?: string;
  opportunity_id?: number;
  opportunity_name: string;
  agent_id?: number;
  status?: OrderStatus;
  state?: OrderState;
  reservation_fee?: number;
  monetary_status: MonetaryStatus;
  payment_method?: PaymentMethod;
  name?: string;
  phone_number?: string;
  email?: string;
  identify_number?: string;
  issued_date?: string;
  issued_place?: string;
  permanent_address?: Address;
  current_address?: Address;
  payment_information?: PaymentInformationResponse;
  project?: LeadProject;
  gender?: Gender;
  update_time?: string;
  booking_code?: string;
  event?: BookingEvent;
  legal_document_name: string;
  legal_document_number: string;
  apartment: Apartment;
  cancel_reasons?: string[];
  cancel_reason_detail?: string;
  receipt_code: string;
  histories?: BookingOrderHistory[] | null;
}

export interface CancelBookingOrderRequest {
  order_id: number;
  cancel_reasons: string[];
  cancel_reason_detail: string;
}

export interface EventResponse {
  id: number;
  title?: string;
  content?: string;
  time?: string;
}

import {
  CreateBookingOrderRequest,
  BookingOrderResponse,
  OrderListRequest,
  CancelBookingOrderRequest,
  EventResponse,
  CompleteBookingOrderRequest,
  CompleteBookingOrderResponse,
} from '../@types/order';
import {ServerResponse} from './types';
import {secureInstance} from './base';

export async function createBookingOrder(
  request: CreateBookingOrderRequest,
): ServerResponse<number> {
  const res = await secureInstance.post(`v1/orders`, request);
  return res.data;
}

export async function getOrders(
  request: OrderListRequest,
): ServerResponse<BookingOrderResponse[]> {
  const res = await secureInstance.get(`v1/orders`, {params: request});
  return res.data;
}

export async function cancelBookingOrder(
  request: CancelBookingOrderRequest,
): ServerResponse<number> {
  const res = await secureInstance.put(
    `v1/orders/${request.order_id}/cancel`,
    request,
  );
  return res.data;
}

export async function getEvents(
  orderId: number,
): ServerResponse<EventResponse[]> {
  const res = await secureInstance.get(`v1/orders/${orderId}/events`);
  return res.data;
}

export async function registerEvent(
  orderId: number,
  eventId: number,
): ServerResponse<number> {
  const res = await secureInstance.put(
    `v1/orders/${orderId}/events/${eventId}`,
  );
  return res.data;
}

export async function getBookingOrderBy(
  id: number,
): ServerResponse<BookingOrderResponse> {
  const res = await secureInstance.get(`v1/orders/${id}`);
  return res.data;
}

export async function completeOrderWith(
  id: number,
  request: CompleteBookingOrderRequest,
): ServerResponse<CompleteBookingOrderResponse> {
  const res = await secureInstance.put(`v1/orders/${id}/complete`, request);
  return res.data;
}

export async function getOrdersByOpportunityId(
  id: string,
): ServerResponse<BookingOrderResponse[]> {
  const res = await secureInstance.get(`v1/opportunities/${id}/orders`);
  return res.data;
}

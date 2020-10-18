export interface RegisterDeviceTokenRequest {
  device_unique_id?: string; // only for android
  device_token: string | null; // using to push notification message
  device_type: string; // android or ios
}

import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseAuth} from './index';

let expiredOTP: string | null = null;

export const OTP_EXPIRED_TIME = 90;

export enum ConfirmCodeResult {
  OK = 'OK',
  EXPIRED = 'auth/code-expired',
  INVALID = 'auth/invalid-verification-code',
  OTHERS = 'OTHER',
}

export function isOTPExpired(expiredTime: number | null) {
  return !expiredTime || Date.now() > expiredTime;
}

export function timeToExpiredTime(expiredTime: number | null) {
  const now = Date.now();
  if (!expiredTime || now > expiredTime) return 0;
  return Math.round((expiredTime - now) / 1000);
}

export async function signInWithPhoneNumber(phone: string) {
  expiredOTP = null;
  const confirmation = await FirebaseAuth.signInWithPhoneNumber(phone);
  const expiredTime = Date.now() + OTP_EXPIRED_TIME * 1000;
  return {confirmation, expiredTime};
}

export async function confirmSMSCode(
  confirmation: FirebaseAuthTypes.ConfirmationResult,
  expiredTime: number | null,
  smsCode: string,
): Promise<ConfirmCodeResult | null> {
  if (expiredOTP) {
    return smsCode === expiredOTP
      ? ConfirmCodeResult.EXPIRED
      : ConfirmCodeResult.INVALID;
  }

  try {
    await confirmation.confirm(smsCode);
    const isExpired = isOTPExpired(expiredTime);
    if (isExpired) expiredOTP = smsCode;
    return isExpired ? ConfirmCodeResult.EXPIRED : ConfirmCodeResult.OK;
  } catch (error) {
    return error.code ?? ConfirmCodeResult.OTHERS;
  }
}

export async function signOutFirebase() {
  await FirebaseAuth.signOut();
  return true;
}

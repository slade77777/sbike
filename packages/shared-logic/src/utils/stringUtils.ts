// First name in Vietnamese is the last word of the full name
// Example: when full name is Nguyen Van Nam ==> first name is: Nam
export function getFirstNameFrom(fullName?: string): string {
  return fullName?.trim().split(' ').pop() || '';
}

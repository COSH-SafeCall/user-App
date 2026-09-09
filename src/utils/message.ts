import { mockContacts, mockUser } from "../data/mock";

export function maskPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 11) {
    return phone;
  }
  return `${digits.slice(0, 3)}-xxxx-${digits.slice(-4)}`;
}

export function createSafetyMessage(withLocation: boolean) {
  const intro = `${mockUser.name}(${maskPhoneNumber(mockUser.phone)})가 SafeCall 안심 메시지를 보냈어요.`;
  const location = "현재 위치: https://map.naver.com/v5/search/37.5665,126.9780";
  return withLocation ? `${intro}\n${location}` : intro;
}

export function getSmsRecipients() {
  return mockContacts.map((contact) => contact.phone).join(",");
}

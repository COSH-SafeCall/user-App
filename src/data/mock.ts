export type SituationId = "follow" | "taxi" | "stranger" | "alone";
export type PersonaId = "dad" | "mom" | "friend";
export type ScreenName =
  | "login"
  | "profile"
  | "contacts"
  | "consent"
  | "permissions"
  | "sosSetup"
  | "messageTest"
  | "home"
  | "situation"
  | "persona"
  | "confirm"
  | "prepare"
  | "loading"
  | "ringing"
  | "call"
  | "settings"
  | "help"
  | "contactSettings"
  | "ringtoneSettings"
  | "permissionSettings"
  | "withdraw";

export const situations = [
  { id: "follow", label: "누군가 따라오는 것 같아요", icon: "run" },
  { id: "taxi", label: "택시 안이 불안해요", icon: "car" },
  { id: "stranger", label: "낯선 사람이 근처에 있어요", icon: "account-tie" },
  { id: "alone", label: "혼자 귀가하기 무서워요", icon: "account-group" }
] as const;

export const personas = [
  { id: "dad", label: "아빠", displayName: "아빠" },
  { id: "mom", label: "엄마", displayName: "엄마" },
  { id: "friend", label: "친구", displayName: "지민" }
] as const;

export const mockUser = {
  name: "홍길동",
  gender: "남자",
  birthDate: "1998.04.12",
  phone: "010-1234-5678"
};

export const mockContacts = [
  { name: "보호자 1", relation: "가족", phone: "010-1111-2222" },
  { name: "보호자 2", relation: "친구", phone: "010-3333-4444" }
];

export const helpItems = [
  "SOS 다시 켜는법",
  "긴급연락처 수정방법",
  "긴급연락처가 없어도 되나요?",
  "가상 전화를 수신받을 때 소리 말고 진동이나 무음으로 받고 싶어요",
  "안심 메시지는 어떻게 전송되나요?"
];

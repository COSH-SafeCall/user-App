import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  PanResponder,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ============================================================================
// 1. TYPES & CONSTANTS (타입 및 상수 정의)
// ============================================================================

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];
type Screen =
  | "login" | "kakao" | "profile" | "contacts" | "contactModal" | "terms"
  | "permissionBasic" | "permissionSos" | "sosSystem" | "callPermission" | "permissionToast"
  | "locationGuide" | "complete" | "personaUse" | "personaPeople" | "voiceCheck" | "voiceLoading"
  | "home" | "help" | "helpOpen" | "callRinging" | "call" | "setting" | "settingDialog" | "withdraw"
  | "editProfile" | "editContacts" | "soundSetting" | "permissionSetting";

const order: Screen[] = [
  "login", "kakao", "profile", "contacts", "contactModal", "terms", "permissionBasic",
  "permissionSos", "sosSystem", "callPermission", "permissionToast", "complete",
  "locationGuide", "home", "personaUse", "personaPeople", "voiceCheck", "voiceLoading",
  "callRinging", "call", "help", "helpOpen", "setting", "settingDialog", "withdraw", "editProfile",
  "editContacts", "soundSetting", "permissionSetting",
];

const asset = {
  logo: require("./assets/figma/login-logo.png"),
  kakaoSymbol: require("./assets/figma/kakao-symbol.png"),
  kakao: require("./assets/screen-reference/Login - Onboarding-1.png"),
  sosSystem: require("./assets/screen-reference/Login - Onboarding-7.png"),
  callPermission: require("./assets/screen-reference/Login - Onboarding-8.png"),
  permissionToast: require("./assets/screen-reference/Login - Onboarding-9.png"),
  completeGradient: require("./assets/figma/onboarding-complete-gradient.png"),
  father: require("./assets/figma/raw-image-1.jpeg"),
  mother: require("./assets/figma/raw-image-3.jpeg"),
  friend: require("./assets/figma/raw-image-5.jpeg"),
};

const W = 402;
const A = "#6366F1"; // Primary Color
const CARD = "#202B3D";
const MUTED = "#9CA3AF";
const Y = "#FFF300";


// ============================================================================
// 2. ROOT APP COMPONENT (메인 앱 및 라우팅)
// ============================================================================

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const go = (nextScreen: Screen) => setScreen(nextScreen);
  const next = () => go(order[(order.indexOf(screen) + 1) % order.length]);

  const imageOnly = ["kakao", "sosSystem", "callPermission", "permissionToast"].includes(screen);

  return (
    <View style={s.root}>
      <StatusBar barStyle={imageOnly ? "dark-content" : "light-content"} />

      {/* 라우팅 분기 */}
      {screen === "login" && <Login go={go} />}
      {screen === "kakao" && <ImageScreen src={asset.kakao} onPress={() => go("profile")} />}
      {screen === "profile" && <Profile go={go} />}
      {screen === "contacts" && <Contacts go={go} />}
      {screen === "contactModal" && <Contacts go={go} modal />}
      {screen === "terms" && <Terms go={go} />}
      {screen === "permissionBasic" && <PermissionIntro go={go} sos={false} />}
      {screen === "permissionSos" && <PermissionIntro go={go} sos />}
      {screen === "sosSystem" && <ImageScreen src={asset.sosSystem} onPress={() => go("callPermission")} />}
      {screen === "callPermission" && <ImageScreen src={asset.callPermission} onPress={() => go("permissionToast")} />}
      {screen === "permissionToast" && <ImageScreen src={asset.permissionToast} onPress={() => go("complete")} />}
      {screen === "locationGuide" && <LocationGuide go={go} />}
      {screen === "complete" && <Complete go={go} />}
      {screen === "personaUse" && <PersonaUse go={go} />}
      {screen === "personaPeople" && <PersonaPeople go={go} />}
      {screen === "voiceCheck" && <VoiceCheck go={go} />}
      {screen === "voiceLoading" && <VoiceLoading go={go} />}
      {screen === "home" && <Home go={go} />}
      {screen === "help" && <Help go={go} />}
      {screen === "helpOpen" && <Help go={go} open />}
      {screen === "callRinging" && <CallRinging go={go} />}
      {screen === "call" && <Call go={go} />}
      {screen === "setting" && <Setting go={go} />}
      {screen === "settingDialog" && <Setting go={go} dialog />}
      {screen === "withdraw" && <Withdraw go={go} />}
      {screen === "editProfile" && <Profile go={go} edit />}
      {screen === "editContacts" && <Contacts go={go} edit />}
      {screen === "soundSetting" && <SoundSetting go={go} />}
      {screen === "permissionSetting" && <PermissionSetting go={go} />}

      {/* 테스트용 숨김 버튼 (다음 화면 이동) */}
      <Pressable style={s.hiddenNext} onPress={next} />
    </View>
  );
}


// ============================================================================
// 3. SCREEN COMPONENTS (화면 컴포넌트)
// ============================================================================

function Login({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas bg={A}>
      <Image source={asset.logo} style={s.loginLogo} resizeMode="contain" />
      <Text style={s.loginSub}>내 손 안의 안심 통화 서비스.</Text>
      <Text style={s.loginTitle}>SafeCall</Text>
      <Pressable style={s.kakaoBtn} onPress={() => go("kakao")}>
        <Image source={asset.kakaoSymbol} style={s.kakaoSymbol} resizeMode="contain" />
        <Text style={s.kakaoText}>카카오 로그인</Text>
      </Pressable>
      <Pressable style={s.guestBtn} onPress={() => go("home")}>
        <Text style={s.guestText}>로그인 없이 빠르게 사용하기</Text>
      </Pressable>
    </Canvas>
  );
}

function Profile({ go, edit }: { go: (screen: Screen) => void; edit?: boolean }) {
  return (
    <Canvas>
      {edit && <Top title="사용자 정보 수정" back={() => go("setting")} />}
      <View style={[s.profileBox, edit && { top: 91 }]}>
        <Field label="이름" value="김이름" top={0} help="긴급 문자에서 보호자가 사용자를 식별할 수 있도록 안내되는 데 사용됩니다." />
        <Field label="전화번호" value="010-0000-0000" top={110} help={"긴급 문자에서 보호자가 사용자를 식별할 수 있도록 안내되는 데 사용됩니다.\n전화번호는 가운데 네 자리를 가린 형태로 안내됩니다."} />
        <Field label="생년월일" value="2026.09.06" top={232} />
        <Text style={s.genderLabel}>성별</Text>
        <View style={s.segment}>
          <Text style={s.segmentText}>남자</Text>
          <View style={s.selectedSegment}>
            <Text style={s.segmentText}>여자</Text>
          </View>
        </View>
      </View>
      <Bottom label={edit ? "저장하기" : "다음"} onPress={() => go(edit ? "setting" : "contacts")} />
    </Canvas>
  );
}

function Contacts({ go, modal, edit }: { go: (screen: Screen) => void; modal?: boolean; edit?: boolean }) {
  return (
    <Canvas>
      {edit && <Top title="비상 연락처 수정" back={() => go("setting")} />}
      <View style={modal ? s.dim : undefined}>
        {!edit && (
          <View style={s.contactHeader}>
            <Text style={s.contactTitle}>긴급 연락처를 입력해주세요.</Text>
            <Text style={s.contactDesc}>저장된 연락처로 긴급 연락(현재 내 위치를 전송합니다)을 발송할 수 있습니다. 최대 2명까지 입력 가능합니다.</Text>
            <Text style={s.warn}>{modal ? "• " : ""}연락처를 아무것도 입력하지 않을 시 긴급 연락 기능을 사용할 수 없습니다</Text>
          </View>
        )}
        <ContactCard top={edit ? 106 : 205} />
        <Pressable style={[s.plus, edit && { top: 205 }]} onPress={() => go("contactModal")}>
          <MaterialCommunityIcons name="plus" size={39} color="#000" />
        </Pressable>
      </View>
      {!edit && <Bottom label="다음" onPress={() => go("terms")} disabled={modal} />}
      {modal && (
        <View style={s.modalLayer}>
          <ContactModal go={go} />
        </View>
      )}
    </Canvas>
  );
}

function Terms({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas>
      <Top title="" back={() => go("contacts")} />
      <Text style={s.termsTitle}>개인정보 처리 및 AI 통화 동의</Text>
      <View style={s.termsBody}>
        {[1, 2, 3, 4].map((n) => (
          <Text key={n} style={s.termsText}>
            개인정보 처리 동의 내용입니다. 개인정보 처리 원칙, 이용 목적, 보관 기간과 파기 절차를 안내합니다. SafeCall은 긴급 연락과 AI 통화 시나리오 구성을 위해 필요한 최소 정보를 사용합니다.
          </Text>
        ))}
      </View>
      <View style={s.agree}>
        <View style={s.checkbox} />
        <Text style={s.agreeText}>위 사항에 동의하십니까?</Text>
      </View>
      <Bottom label="다음" onPress={() => go("permissionBasic")} />
    </Canvas>
  );
}

function PermissionIntro({ go, sos }: { go: (screen: Screen) => void; sos: boolean }) {
  if (sos) {
    return (
      <Canvas>
        <Text style={s.permTitleSos}>SafeCall 이용을 위해 아래의 기능이 켜져 있는지 확인해주세요.</Text>
        <View style={[s.permCircle, { top: 235 }]}>
          <MaterialCommunityIcons name="microphone" size={24} color="#fff" />
        </View>
        <View style={s.sosTextBlock}>
          <Text style={s.permStrong}>긴급 SOS</Text>
          <Text style={s.permGray}>앱 사용중이나 AI 안심 통화 서비스를 이용 중에{"\n"}긴급한 상황 발생 시 안드로이드 시스템에 등록된{"\n"}긴급번호로 전화를 연결하는 데 필요한 기능입니다.</Text>
          <Text style={s.permYellow}>긴급 SOS 기능은 SafeCall에서 제공하는 기능이{"\n"}아닌, 안드로이드 시스템 자체에서 제공하는 기능{"\n"}입니다.</Text>
        </View>
        <Text style={s.sosPath}>설정 &gt; 안전 및 긴급 &gt; 긴급 SOS 에서 확인할 수 있습니다.</Text>
        <Text style={s.sosWarning}>실제 119나 112에 신고가 갈 수 있으므로 신중한 사용을 권장합니다.</Text>
        <Bottom label="다음" onPress={() => go("sosSystem")} />
      </Canvas>
    );
  }

  return (
    <Canvas>
      <Text style={s.permTitleBasic}>SafeCall 이용을 위해 아래의{"\n"}권한을 허용해주세요.</Text>
      <View style={[s.permCircle, { top: 212 }]}>
        <MaterialCommunityIcons name="microphone" size={24} color="#fff" />
      </View>
      <View style={[s.permTextBlock, { top: 190 }]}>
        <Text style={s.permStrong}>마이크</Text>
        <Text style={s.permGray}>AI와 실시간 통화를 연동하고 통화 품질을 유지하기 위해 사용합니다.</Text>
      </View>
      <View style={[s.permCircle, { top: 342 }]}>
        <MaterialCommunityIcons name="map-marker" size={24} color="#fff" />
      </View>
      <View style={[s.permTextBlock, { top: 321 }]}>
        <Text style={s.permStrong}>위치</Text>
        <Text style={s.permGray}>긴급 문자에서 사용자의 현재 위치를 보호자에게 전달합니다.</Text>
      </View>
      <Bottom label="다음" onPress={() => go("permissionSos")} />
    </Canvas>
  );
}

function LocationGuide({ go }: { go: (screen: Screen) => void }) {
  const text = [
    "하단 볼륨 버튼을 3초 이상 눌러 긴급 메시지 전송 기능을 사용할 수 있습니다.",
    "전송이 정상적으로 이뤄지고 나면 사용자에게도 긴급 메시지 발송 성공 메시지가 도착합니다.",
    "안심 통화 중에는 진동으로 메시지 발송 여부를 알려줍니다.",
    "긴 진동이 울렸다면 전송 오류로 인하여 메시지가 제대로 전송되지 않았다는 의미입니다. 이 경우 다시 볼륨 버튼을 눌러 메시지를 재전송해주세요.",
    "짧은 진동이 2번 울렸다면 메시지가 잘 전달된 것입니다."
  ];
  return (
    <Canvas bg={A}>
      <Text style={s.locationTitle}>내 위치를 보호자에게 알려보세요.</Text>
      {text.map((v, i) => (
        <Text key={v} style={[s.locationBubble, { top: [226, 314, 421, 519, 633][i] }]}>
          {v}
        </Text>
      ))}
      <View style={s.completeButtonRow}>
        <Pressable style={s.completeSkip} onPress={() => go("home")}>
          <Text style={s.completeSkipText}>건너뛰기</Text>
        </Pressable>
        <Pressable style={s.completeOk} onPress={() => go("home")}>
          <Text style={s.completeOkText}>확인</Text>
        </Pressable>
      </View>
    </Canvas>
  );
}

function Complete({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas bg={A}>
      <Image source={asset.completeGradient} style={s.completeBg} resizeMode="cover" />
      <Text style={s.completeTitle}>설정이 모두 완료되었습니다.</Text>
      <Text style={s.completeSub}>긴급 메시지 설정이 잘 완료되었는지 테스트해볼까요?</Text>
      <View style={s.completeButtonRow}>
        <Pressable style={s.completeSkip} onPress={() => go("locationGuide")}>
          <Text style={s.completeSkipText}>건너뛰기</Text>
        </Pressable>
        <Pressable style={s.completeOk} onPress={() => go("locationGuide")}>
          <Text style={s.completeOkText}>확인</Text>
        </Pressable>
      </View>
    </Canvas>
  );
}

function PersonaUse({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas>
      <Pager active={0} />
      <Text style={s.personaTitle}>어떤 상황에서 안심 통화를 사용하시나요?</Text>
      <View style={s.choiceGrid}>
        <Choice icon="walk" text={"누군가 따라오는\n것 같아요"} selected />
        <Choice icon="car" text={"택시 안이\n불안해요"} />
        <Choice icon="account-tie" text={"낯선 사람이\n근처에 있어요"} />
        <Choice icon="account-group" text={"혼자 귀가하기\n무서워요"} />
      </View>
      <BottomPeek />
      <Bottom label="다음" onPress={() => go("personaPeople")} withPeek />
    </Canvas>
  );
}

function PersonaPeople({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas>
      <Pager active={1} />
      <Text style={s.personaTitle}>통화하고 싶은 가상의 인물을 선택해주세요.</Text>
      <View style={s.peopleRow}>
        <Person img={asset.father} label="아빠" selected />
        <Person img={asset.mother} label="엄마" />
        <Person img={asset.friend} label="친구" />
      </View>
      <BottomPeek />
      <Bottom label="다음" onPress={() => go("voiceCheck")} withPeek />
    </Canvas>
  );
}

function VoiceCheck({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas bg="#455269">
      <Pressable style={s.voiceBack} onPress={() => go("personaPeople")}>
        <Image source={require("./assets/figma/voice-imgChevronLeft.png")} style={{ width: 42, height: 42 }} />
      </Pressable>
      <Text style={design.voiceTitle}>모두 확인하셨나요?</Text>
      <View style={design.speakers}>
        <Image source={require("./assets/figma/voice-imgVolumeHigh.png")} style={{ width: 87.4568, height: 87.4568 }} />
        <Image source={require("./assets/figma/voice-imgVolumeHigh1.png")} style={{ width: 90, height: 90 }} />
      </View>
      <View style={design.captionClip}>
        <Text numberOfLines={1} style={design.voiceCaptionLeft}>와이파이를 끄고 모바일 데이터를 사용해주세요</Text>
      </View>
      <Text style={design.voiceCaptionRight}>볼륨 4-5로 설정해주세요</Text>
      <View style={design.voiceBubble}>
        <Text style={design.bubbleText}>화면을 나가거나 긴급 SOS 통화를 사용할 경우 AI 통화는 자동으로 종료됩니다.</Text>
      </View>
      <Pressable style={design.voiceNext} onPress={() => go("voiceLoading")}>
        <Text style={s.bottomText}>다음</Text>
      </Pressable>
    </Canvas>
  );
}

function VoiceLoading({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas bg="#4B5B73">
      <Text style={s.loadingText}>가상 통화를 준비하고 있습니다...</Text>
      <View style={s.equalizer}>
        {[28, 47, 66, 38, 58].map((h, i) => (
          <View key={i} style={[s.bar, { height: h, backgroundColor: i % 2 ? "#CF8EFF" : A }]} />
        ))}
      </View>
      <View style={s.loadingBubble}>
        <Text style={s.bubbleText}>
          AI는 실제로 실행되지 않은 112 신고, 긴급 문자 발송 또는 위치 링크 전송이 완료되었다고 말하지 않습니다.{"\n\n"}
          AI는 사용자를 대신해 위험 여부를 판단하거나 긴급 문자 발송 또는 112 신고를 실행하지 않습니다.{"\n\n"}
          AI는 사용자에게 위험 인물과 대치, 추적 또는 촬영을 유도하지 않습니다.
        </Text>
      </View>
      <Pressable style={s.fullTap} onPress={() => go("callRinging")} />
    </Canvas>
  );
}

function Home({ go }: { go: (screen: Screen) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const miniDrawerPan = React.useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 8,
    onPanResponderRelease: (_, gesture) => { if (gesture.dy < -18) setDrawerOpen(true); }
  }), []);

  return (
    <Canvas>
      {drawerOpen && <Pressable style={s.homeOutsideClose} onPress={() => setDrawerOpen(false)} />}
      <Pressable style={design.homeGear} onPress={() => go("setting")}>
        <Image source={require("./assets/figma/home-imgCogOutline.png")} style={{ width: 30, height: 30 }} />
      </Pressable>
      <Pressable style={design.homeHelp} onPress={() => go("help")}>
        <Image source={require("./assets/figma/home-imgHelp.png")} style={{ width: 24, height: 24 }} />
      </Pressable>

      <Text style={design.homeTitle}>눌러서 AI 안심통화를 시작하세요</Text>
      <Text style={design.homeSub}>가상 통화는 실제 신고나 구조를 대신하지 않습니다.</Text>

      <Pressable style={design.sosCircle} onPress={() => go("personaUse")}>
        <Image source={require("./assets/figma/home-imgFrame1.png")} style={{ width: 220, height: 220 }} />
      </Pressable>

      <Text style={design.homeNotice}>
        긴급 메세지 기능이 <Text style={design.available}>사용 가능</Text>합니다.{"\n"}
        긴급 메세지 위치 전송이 <Text style={design.warnInline}>사용 불가</Text>합니다.
      </Text>

      {drawerOpen ? (
        <View style={design.homeInfo}>
          <View style={design.homeHandle} />
          <Text style={design.homeInfoText}>
            전원 버튼을 5번 연속으로 눌러 <Text style={design.blueBold}>긴급 호출 기능</Text>을 실행시킬 수 있습니다.{"\n\n"}
            하단 볼륨 버튼을 3초 이상 눌러 <Text style={design.blueBold}>긴급 문자 보내기 기능</Text>을 실행시킬 수 있습니다.{"\n\n"}
            긴급 호출 기능(긴급 SOS 기능)은 SafeCall 과 별개로 항상 작동되니 실수로 실행시키지 않도록 주의해 주십시오. 긴급 문자 보내기 기능은 앱 실행중에만 실행 가능합니다.
          </Text>
        </View>
      ) : (
        <Pressable style={design.homeMiniDrawer} onPress={() => setDrawerOpen(true)} {...miniDrawerPan.panHandlers}>
          <View style={design.peekHandle} />
        </Pressable>
      )}
    </Canvas>
  );
}

function Help({ go, open }: { go: (screen: Screen) => void; open?: boolean }) {
  const qs = [
    "SOS 기능은 다시 끄고 싶어요.",
    "긴급 연락처를 수정하고 싶어요.",
    "긴급 연락처를 입력하지 않아도 괜찮은가요?",
    "가상 전화를 소리 말고 진동이나 무음으로 받고 싶어요.",
    "유료 통화가 될 수 있나요?"
  ];
  return (
    <Canvas>
      <Top title="도움말" back={() => go("home")} />
      <View style={s.helpList}>
        {qs.map((q, i) => (
          <Pressable key={q} style={[s.helpRow, open && i === 0 && s.helpOpen]} onPress={() => go("helpOpen")}>
            <Text style={s.helpQ}>Q. {q}</Text>
            <MaterialCommunityIcons name={open && i === 0 ? "chevron-up" : "chevron-right"} size={18} color="#fff" />
            {open && i === 0 && (
              <Text style={s.helpA}>시스템 설정 &gt; 안전 및 긴급 &gt; 긴급 SOS에서 해당 기능을 끌 수 있습니다.</Text>
            )}
          </Pressable>
        ))}
      </View>
    </Canvas>
  );
}

function CallRinging({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas bg="#252839">
      <View style={s.callShade} />
      <Text style={s.incoming}>수신전화</Text>
      <Text style={s.ringName}>아빠</Text>
      <Image source={asset.father} style={s.callAvatar} />
      <View style={s.ringFooter}>
        <MaterialCommunityIcons name="bell-ring" size={15} color="#fff" />
        <Text style={s.smallWhite}>안심통화는{"\n"}실제 신고나 구조를{"\n"}대신하지 않습니다.</Text>
      </View>
      <Pressable style={s.answer} onPress={() => go("call")}>
        <MaterialCommunityIcons name="phone" size={35} color="#fff" />
      </Pressable>
      <Pressable style={s.decline} onPress={() => go("home")}>
        <MaterialCommunityIcons name="phone-hangup" size={35} color="#fff" />
      </Pressable>
    </Canvas>
  );
}

function Call({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas bg="#050509">
      <View style={s.callGradientBase} />
      <View style={s.callGradientBottom} />
      <View style={s.callShadeDark} />
      <Text style={s.callTime}>00:00</Text>
      <Text style={s.callName}>아빠</Text>
      <Text style={s.callHint}>화면 녹화는 종료할 때까지 유지됩니다.</Text>
      <View style={s.callPad}>
        <Pad icon="message" label="녹음" />
        <Pad icon="video" label="영상 통화" />
        <Pad icon="bluetooth" label="블루투스" />
        <Pad icon="volume-high" label="스피커" />
        <Pad icon="microphone-off" label="내 소리 차단" />
        <Pad icon="dialpad" label="키패드" />
        <Pressable style={s.callEnd} onPress={() => go("home")}>
          <MaterialCommunityIcons name="phone-hangup" size={35} color="#fff" />
        </Pressable>
      </View>
      <Text style={s.callBottomNotice}>통화 종료를 제외한 나머지 기능은 실제 제공되는 기능이 아닙니다.</Text>
    </Canvas>
  );
}

function Setting({ go, dialog }: { go: (screen: Screen) => void; dialog?: boolean }) {
  return (
    <Canvas>
      <Top title="설정" back={() => go("home")} />
      <View style={dialog ? s.dim : undefined}>
        <View style={s.settingProfile}>
          <View style={s.settingAvatar}>
            <MaterialCommunityIcons name="account" size={41} color="#fff" />
          </View>
          <View>
            <Text style={s.settingName}>이름</Text>
            <Text style={s.settingSub}>카카오 로그인</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column', padding: 10 }}>
          <View style={s.settingGroup}>
            <SetRow label="사용자 정보 수정" go={() => go("editProfile")} />
            <SetRow label="비상 연락처 수정" go={() => go("editContacts")} />
            <SetRow label="가상 통화 수신 벨소리 설정" go={() => go("soundSetting")} />
            <SetRow label="위치 권한 관련 여부 변경" go={() => go("permissionSetting")} />
            <SetRow label="회원 탈퇴" go={() => go("withdraw")} />
          </View>
          <View style={s.settingGroup2}>
            <SetRow label="도움말" go={() => go("help")} />
            <SetRow label="문의하기" go={() => go("settingDialog")} />
          </View>
          <View style={s.settingGroup3}>
            <SetRow label="개인정보 정책" go={() => go("terms")} />
          </View>
        </View>
      </View>
      {dialog && (
        <View style={s.dialog}>
          <Text style={s.dialogTitle}>로그아웃 하시겠습니까?</Text>
          <Text style={s.dialogBody}>로그아웃 시에도 안심통화 기능은 사용 가능합니다.</Text>
          <View style={s.dialogBtns}>
            <Pressable style={s.dialogCancel} onPress={() => go("setting")}>
              <Text style={s.dialogButtonText}>취소</Text>
            </Pressable>
            <Pressable style={s.dialogOk} onPress={() => go("login")}>
              <Text style={s.dialogButtonText}>로그아웃</Text>
            </Pressable>
          </View>
        </View>
      )}
      <Text style={s.team}>team. Cesh{"\n"}v0.0.1</Text>
    </Canvas>
  );
}

function SoundSetting({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas>
      <Top title="가상 통화 수신 벨소리 설정" back={() => go("setting")} />
      <View style={s.soundPanel}>
        <Sound title="소리" selected />
        <Sound title="진동" />
        <Sound title="무음" />
      </View>
      <View style={s.ringtone}>
        <Text style={s.setRowText}>벨소리</Text>
        <Text style={s.settingSub}>Over The Horizon</Text>
        <MaterialCommunityIcons name="chevron-right" size={18} color="#fff" />
      </View>
    </Canvas>
  );
}

function PermissionSetting({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas>
      <Top title="위치 권한 관련 여부 변경" back={() => go("setting")} />
      <Text style={s.permSettingText}>비활성화 즉시 사용자의 지정된 개인정보가 삭제됩니다. 추후 로그인 서비스 이용을 위해서는 일부 다시 권한을 진행해야 합니다.</Text>
      <View style={s.permSettingRows}>
        <PermRow icon="microphone" title="마이크" body="AI 통화 품질 유지를 위해 사용합니다." />
        <PermRow icon="map-marker" title="위치" body="긴급 상황에서 현재 위치를 보호자에게 전달합니다." />
      </View>
      <View style={s.bottomTwo}>
        <MiniButton label="취소" dark onPress={() => go("setting")} />
        <MiniButton label="권한 설정하기" onPress={() => go("sosSystem")} wide />
      </View>
    </Canvas>
  );
}

function Withdraw({ go }: { go: (screen: Screen) => void }) {
  return (
    <Canvas>
      <Top title="탈퇴하기" back={() => go("setting")} />
      <Text style={s.withdrawText}>탈퇴하는 즉시 서버에 저장된 개인정보가 삭제됩니다. 추후 로그인 서비스 이용을 원하실 경우 다시 가입을 진행하여야 합니다. 탈퇴하시겠습니까?</Text>
      <View style={s.withdrawButtons}>
        <Pressable style={s.withdrawCancel} onPress={() => go("setting")}>
          <Text style={s.withdrawButtonText}>취소</Text>
        </Pressable>
        <Pressable style={s.withdrawOk} onPress={() => go("login")}>
          <Text style={s.withdrawButtonText}>탈퇴하기</Text>
        </Pressable>
      </View>
    </Canvas>
  );
}


// ============================================================================
// 4. SHARED UI COMPONENTS (공유 UI 단위 컴포넌트)
// ============================================================================

function Canvas({ children, bg = "#000" }: { children: React.ReactNode; bg?: string }) {
  return <View style={[s.canvas, { backgroundColor: bg }]}>{children}</View>;
}

function ImageScreen({ src, onPress }: { src: number; onPress: () => void }) {
  return (
    <Pressable style={s.imageScreen} onPress={onPress}>
      <Image source={src} style={s.fullImage} resizeMode="cover" />
    </Pressable>
  );
}

function Field({ label, value, help, top }: { label: string; value: string; help?: string; top: number }) {
  return (
    <View style={[s.field, { top }]}>
      <Text style={s.fieldLabel}>{label}</Text>
      <Text style={s.fieldValue}>{value}</Text>
      <View style={s.line} />
      {help && <Text style={s.helpText}>{help}</Text>}
    </View>
  );
}

function ContactCard({ top }: { top: number }) {
  return (
    <View style={[s.contactCard, { top }]}>
      <View style={s.avatar}>
        <MaterialCommunityIcons name="account" size={42} color="#fff" />
      </View>
      <View>
        <Text style={s.contactName}>보호자 1</Text>
        <Text style={s.contactRelation}>관계</Text>
      </View>
    </View>
  );
}

function ContactModal({ go }: { go: (screen: Screen) => void }) {
  return (
    <View style={s.contactModal}>
      <View style={s.modalMenu}>
        <MaterialCommunityIcons name="dots-vertical" size={27} color="#fff" />
      </View>
      <ModalField label="이름" value="보호자 2" top={42} />
      <ModalField label="관계" value="어머니" top={134} />
      <ModalField label="전화번호" value="010-0000-0000" top={226} error="전화번호의 형식이 올바르지 않습니다." />
      <View style={s.modalBtns}>
        <MiniButton label="취소" dark onPress={() => go("contacts")} />
        <MiniButton label="추가" onPress={() => go("contacts")} />
      </View>
    </View>
  );
}

function ModalField({ label, value, error, top }: { label: string; value: string; error?: string; top: number }) {
  return (
    <View style={[s.modalField, { top }]}>
      <Text style={s.modalLabel}>{label}</Text>
      <Text style={s.modalValue}>{value}</Text>
      <View style={s.line} />
      {error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

function PermRow({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <View style={s.permRow}>
      <View style={s.permIcon}>
        <MaterialCommunityIcons name={icon} size={19} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.permRowTitle}>{title}</Text>
        <Text style={s.permBody}>{body}</Text>
      </View>
    </View>
  );
}

function Top({ title, back }: { title: string; back: () => void }) {
  return (
    <View style={s.top}>
      <Pressable onPress={back}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
      </Pressable>
      <Text style={s.topTitle}>{title}</Text>
    </View>
  );
}

function Bottom({ label, onPress, disabled, withPeek }: { label: string; onPress: () => void; disabled?: boolean; withPeek?: boolean }) {
  return (
    <Pressable style={[s.bottom, withPeek && s.bottomAbovePeek, disabled && s.bottomOff]} onPress={onPress} disabled={disabled}>
      <Text style={[s.bottomText, disabled && s.bottomTextOff]}>{label}</Text>
    </Pressable>
  );
}

function MiniButton({ label, onPress, dark, light, wide }: { label: string; onPress: () => void; dark?: boolean; light?: boolean; wide?: boolean }) {
  return (
    <Pressable style={[s.mini, dark ? s.miniDark : light ? s.miniLight : s.miniAccent, wide && s.miniWide]} onPress={onPress}>
      <Text style={[s.miniText, dark && { color: "#fff" }]}>{label}</Text>
    </Pressable>
  );
}

function Pager({ active }: { active: number }) {
  return (
    <View style={s.pager}>
      <MaterialCommunityIcons name="chevron-left" size={38} color="#fff" />
      <View style={s.dotRow}>
        {[0, 1, 2].map((n) => (
          <View key={n} style={[s.dot, n === active && s.dotOn]} />
        ))}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={38} color="#fff" />
    </View>
  );
}

function Choice({ icon, text, selected }: { icon: IconName; text: string; selected?: boolean }) {
  return (
    <View style={s.choice}>
      <View style={[s.choiceCircle, selected && s.choiceSelected]}>
        <MaterialCommunityIcons name={icon} size={68} color={selected ? "#fff" : A} />
      </View>
      <Text style={s.choiceText}>{text}</Text>
    </View>
  );
}

function Person({ img, label, selected }: { img: number; label: string; selected?: boolean }) {
  return (
    <View style={s.person}>
      <Image source={img} style={[s.personImg, selected && s.personImgSelected]} />
      <Text style={s.personLabel}>{label}</Text>
    </View>
  );
}

function BottomPeek() {
  return (
    <View style={s.bottomPeek}>
      <View style={s.peekHandle} />
    </View>
  );
}

function Pad({ icon, label }: { icon: IconName; label: string }) {
  return (
    <View style={s.pad}>
      <MaterialCommunityIcons name={icon} size={23} color="#fff" />
      <Text style={s.padText}>{label}</Text>
    </View>
  );
}

function SetRow({ label, go }: { label: string; go: () => void }) {
  return (
    <Pressable style={s.setRow} onPress={go}>
      <Text style={s.setRowText}>{label}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
    </Pressable>
  );
}

function Sound({ title, selected }: { title: "소리" | "진동" | "무음"; selected?: boolean }) {
  const icon: IconName = title === "소리" ? "volume-high" : title === "진동" ? "vibrate" : "volume-off";
  return (
    <View style={s.sound}>
      <MaterialCommunityIcons name={icon} size={22} color="#fff" />
      <Text style={s.soundText}>{title}</Text>
      <View style={[s.radio, selected && s.radioOn]} />
    </View>
  );
}


// ============================================================================
// 5. STYLES (스타일시트)
// ============================================================================
const fill = { position: "absolute" as const, top: 0, right: 0, bottom: 0, left: 0 };

const design = StyleSheet.create({
  homeGear: {
    position: "absolute",
    top: 33,
    left: 30,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#989EC9",
    alignItems: "center",
    justifyContent: "center",
  },
  homeHelp: {
    position: "absolute",
    top: 33,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#989EC9",
    alignItems: "center",
    justifyContent: "center",
  },
  homeTitle: {
    position: "absolute",
    top: 183,
    left: 56,
    width: 296,
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
    includeFontPadding: false,
  },
  homeSub: {
    position: "absolute",
    top: 214,
    left: 69,
    width: 283,
    color: "#FFE100",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    includeFontPadding: false,
  },
  sosCircle: {
    position: "absolute",
    top: 312,
    left: 95,
    width: 220,
    height: 220,
  },
  homeNotice: {
    position: "absolute",
    top: 611,
    left: 86,
    width: 230,
    color: "#CACACA",
    fontSize: 11,
    lineHeight: 16.5,
    fontWeight: "400",
    textAlign: "center",
    includeFontPadding: false,
  },
  available: {
    color: "#6366F1",
  },
  warnInline: {
    color: "#A35454",
  },
  homeInfo: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 209,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderWidth: 2,
    borderColor: "#455269",
    backgroundColor: "#1E293B",
    overflow: "hidden",
  },
  homeMiniDrawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 48,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderWidth: 2,
    borderColor: "#455269",
    backgroundColor: "#1E293B",
    overflow: "hidden",
  },
  homeHandle: {
    position: "absolute",
    top: 16,
    right: 184,
    width: 35,
    height: 6,
    borderRadius: 20,
    backgroundColor: "#455269",
  },
  peekHandle: {
    position: "absolute",
    top: 16,
    right: 184,
    width: 35,
    height: 6,
    borderRadius: 20,
    backgroundColor: "#455269",
  },
  homeInfoText: {
    position: "absolute",
    top: 39.5,
    left: 30,
    right: 30,
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    includeFontPadding: false,
  },
  blueBold: {
    color: "#7A8BFB",
    fontWeight: "900",
  },
  voiceTitle: {
    position: "absolute",
    top: 49,
    left: 119,
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "400",
    includeFontPadding: false,
  },
  speakers: {
    position: "absolute",
    top: 348,
    left: 62.2716,
    width: 278.7284,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  captionClip: {
    position: "absolute",
    top: 477.4568,
    left: 10.5,
    right: 10.5,
    height: 16,
    overflow: "hidden",
  },
  voiceCaptionLeft: {
    position: "absolute",
    top: 0,
    left: -31.5,
    width: 254,
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    includeFontPadding: false,
  },
  voiceCaptionRight: {
    position: "absolute",
    top: 458,
    left: 225.5,
    width: 141,
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    includeFontPadding: false,
  },
  voiceBubble: {
    position: "absolute",
    top: 706,
    left: 60,
    width: 283,
    height: 72,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 35,
    backgroundColor: "rgba(0,0,0,0.3)",
    boxShadow: "0px 10px 7px 0px rgba(0,0,0,0.05)" as any,
  },
  bubbleText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    includeFontPadding: false,
  },
  voiceNext: {
    position: "absolute",
    left: 10.5,
    right: 10.5,
    bottom: 10,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  canvas: {
    width: "100%",
    maxWidth: W,
    minHeight: 874,
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  fullTap: {
    ...fill,
  },
  hiddenNext: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 12,
  },
  imageScreen: {
    width: "100%",
    maxWidth: W,
    height: "100%",
    minHeight: 874,
    backgroundColor: "#888",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  loginLogo: {
    position: "absolute",
    top: 290,
    left: 147,
    width: 108,
    height: 108,
  },
  kakaoSymbol: {
    position: "absolute",
    left: 14,
    top: 13.5,
    width: 18,
    height: 18,
  },
  loginSub: {
    position: "absolute",
    top: 432,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 15,
    lineHeight: 22.5,
    fontWeight: "700",
    textAlign: "center",
  },
  loginTitle: {
    position: "absolute",
    top: 444,
    left: 111,
    width: 181,
    height: 72,
    color: "#fff",
    fontSize: 48,
    lineHeight: 72,
    fontWeight: "900",
    fontFamily: "Leelawadee UI",
    letterSpacing: -1.6,
  },
  kakaoBtn: {
    position: "absolute",
    left: 51,
    top: 683,
    width: 300,
    height: 45,
    borderRadius: 6,
    backgroundColor: "#FEE500",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  kakaoText: {
    color: "rgba(0,0,0,0.85)",
    fontSize: 15,
    lineHeight: 22.5,
    fontWeight: "700",
  },
  guestBtn: {
    position: "absolute",
    left: 51,
    top: 740,
    width: 300,
    height: 45,
    borderRadius: 6,
    backgroundColor: "#dddddd",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  guestText: {
    color: "rgba(0,0,0,0.85)",
    fontSize: 15,
    lineHeight: 22.5,
    fontWeight: "500",
  },
  profileBox: {
    position: "absolute",
    top: 50,
    left: 35,
    width: 332,
    height: 433,
  },
  field: {
    position: "absolute",
    left: 0,
    width: 332,
  },
  fieldLabel: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "600",
  },
  fieldValue: {
    marginTop: 8,
    marginLeft: 5,
    color: "rgba(204,204,204,0.6)",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
  },
  line: {
    height: 2,
    backgroundColor: A,
  },
  helpText: {
    marginTop: 8,
    color: "#7A8BFB",
    fontSize: 10,
    lineHeight: 12,
  },
  genderLabel: {
    position: "absolute",
    top: 322,
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "600",
  },
  segment: {
    position: "absolute",
    top: 350,
    width: 332,
    height: 43,
    borderRadius: 10,
    padding: 5,
    backgroundColor: CARD,
    flexDirection: "row",
    gap: 10,
  },
  segmentText: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22.5,
  },
  selectedSegment: {
    flex: 1,
    height: 33,
    borderRadius: 10,
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    position: "absolute",
    left: 20,
    bottom: 20,
    width: 362,
    height: 56,
    borderRadius: 20,
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 5,
  },
  bottomAbovePeek: {
    bottom: 57,
  },
  bottomOff: {
    backgroundColor: "#25235B",
  },
  bottomText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
  },
  bottomTextOff: {
    color: "#777",
  },
  contactHeader: {
    position: "absolute",
    top: 59,
    left: 58,
    width: 290,
    alignItems: "center",
  },
  contactTitle: {
    alignSelf: "flex-start",
    color: "#fff",
    fontSize: 26,
    lineHeight: 34,
  },
  contactDesc: {
    marginTop: 6,
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
  },
  warn: {
    marginTop: 6,
    width: 276,
    color: Y,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
  },
  contactCard: {
    position: "absolute",
    left: 20,
    width: 362,
    height: 80,
    borderRadius: 28,
    backgroundColor: CARD,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  contactName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  contactRelation: {
    marginTop: 4,
    color: "#fff",
    fontSize: 12,
  },
  plus: {
    position: "absolute",
    top: 304,
    left: 180,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
  },
  dim: {
    opacity: 0.38,
  },
  modalLayer: {
    ...fill,
    alignItems: "center",
  },
  contactModal: {
    position: "absolute",
    top: 234,
    left: 32,
    width: 336,
    height: 410,
    borderRadius: 29,
    backgroundColor: CARD,
  },
  modalMenu: {
    position: "absolute",
    top: 19,
    right: 19,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#445064",
    alignItems: "center",
    justifyContent: "center",
  },
  modalField: {
    position: "absolute",
    left: 31,
    width: 275,
  },
  modalLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
  modalValue: {
    marginTop: 10,
    color: MUTED,
    fontSize: 22,
  },
  error: {
    marginTop: 8,
    color: "#F97316",
    fontSize: 10,
  },
  modalBtns: {
    position: "absolute",
    left: 21,
    bottom: 20,
    flexDirection: "row",
    gap: 5,
  },
  top: {
    position: "absolute",
    top: 20,
    left: 15,
    right: 15,
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  topTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "800",
  },
  termsTitle: {
    position: "absolute",
    top: 59,
    left: 34,
    right: 34,
    color: "#fff",
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "400",
    textAlign: "center",
  },
  termsBody: {
    position: "absolute",
    top: 145,
    left: 36,
    right: 36,
  },
  termsText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 34,
  },
  agree: {
    position: "absolute",
    left: 30,
    bottom: 91,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: A,
  },
  agreeText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  permTitleBasic: {
    position: "absolute",
    top: 61,
    left: 54,
    width: 294,
    color: "#fff",
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "400",
    textAlign: "center",
  },
  permTitleSos: {
    position: "absolute",
    top: 61,
    left: 43,
    width: 316,
    color: "#fff",
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "400",
    textAlign: "left",
  },
  permCircle: {
    position: "absolute",
    left: 40,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2D2D2D",
    alignItems: "center",
    justifyContent: "center",
  },
  permTextBlock: {
    position: "absolute",
    left: 104,
    width: 258,
  },
  sosTextBlock: {
    position: "absolute",
    top: 235,
    left: 104,
    width: 258,
  },
  permStrong: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "800",
  },
  permGray: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
    marginTop: 8,
  },
  permYellow: {
    color: Y,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
  sosPath: {
    position: "absolute",
    top: 432,
    left: 43,
    width: 316,
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
  },
  sosWarning: {
    position: "absolute",
    top: 517,
    left: 43,
    width: 316,
    color: Y,
    fontSize: 12,
    lineHeight: 16,
  },
  locationTitle: {
    position: "absolute",
    top: 87,
    left: 32,
    right: 32,
    color: "#fff",
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "400",
  },
  locationBubble: {
    position: "absolute",
    left: 55,
    width: 292,
    minHeight: 72,
    borderRadius: 26,
    backgroundColor: "rgba(37,35,91,0.58)",
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 30,
    paddingVertical: 19,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 13,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  completeBg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 402,
    height: 874,
  },
  completeTitle: {
    position: "absolute",
    top: 379,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "400",
    textAlign: "center",
  },
  completeSub: {
    position: "absolute",
    top: 435,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  completeButtonRow: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 56,
    flexDirection: "row",
    gap: 10,
  },
  completeSkip: {
    width: 176,
    height: 56,
    borderRadius: 6,
    backgroundColor: "#25235B",
    alignItems: "center",
    justifyContent: "center",
  },
  completeOk: {
    width: 176,
    height: 56,
    borderRadius: 6,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  completeSkipText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
  },
  completeOkText: {
    color: "#111",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
  },
  mini: {
    width: 84,
    height: 30,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  miniDark: {
    backgroundColor: "#25235B",
  },
  miniLight: {
    backgroundColor: "#F2F2F2",
  },
  miniAccent: {
    backgroundColor: A,
  },
  miniWide: {
    width: 151,
  },
  miniText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  pager: {
    position: "absolute",
    top: 32,
    left: 24,
    right: 24,
    height: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dotRow: {
    width: 70,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
  },
  dotOn: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: A,
  },
  personaTitle: {
    position: "absolute",
    top: 120,
    left: 10,
    right: 10,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  choiceGrid: {
    position: "absolute",
    top: 174,
    left: 27,
    width: 348,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 24,
    rowGap: 28,
  },
  choice: {
    width: 100,
    height: 143,
    alignItems: "center",
  },
  choiceCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceSelected: {
    backgroundColor: A,
  },
  choiceText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  peopleRow: {
    position: "absolute",
    top: 174,
    left: 27,
    right: 27,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  person: {
    width: 100,
    alignItems: "center",
  },
  personImg: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  personImgSelected: {
    borderWidth: 5,
    borderColor: A,
  },
  personLabel: {
    marginTop: 9,
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  bottomPeek: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 48,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    borderWidth: 2,
    borderColor: "#465670",
    backgroundColor: CARD,
    zIndex: 1,
  },
  peekHandle: {
    position: "absolute",
    top: 18,
    left: 181,
    width: 35,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#64748B",
  },
  voiceBack: {
    position: "absolute",
    top: 37,
    left: 18,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  speakers: {
    position: "absolute",
    top: 360,
    left: 73,
    right: 73,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  voiceCaptionLeft: {
    position: "absolute",
    top: 477,
    left: 8,
    width: 190,
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  voiceCaptionRight: {
    position: "absolute",
    top: 477,
    right: 8,
    width: 190,
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  voiceBubble: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 104,
    height: 132,
    borderRadius: 20,
    backgroundColor: CARD,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  bubbleText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  loadingText: {
    position: "absolute",
    top: 208,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "600",
    textAlign: "center",
  },
  equalizer: {
    position: "absolute",
    top: 295,
    left: 101,
    width: 200,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  loadingBubble: {
    position: "absolute",
    top: 521,
    left: 20,
    right: 20,
    minHeight: 198,
    borderRadius: 20,
    backgroundColor: CARD,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: "center",
  },
  homeOutsideClose: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 209,
  },
  helpList: {
    position: "absolute",
    top: 83,
    left: 34,
    right: 34,
  },
  helpRow: {
    minHeight: 43,
    borderBottomWidth: 1,
    borderBottomColor: CARD,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  helpOpen: {
    height: 118,
    backgroundColor: CARD,
    borderRadius: 4,
    paddingHorizontal: 12,
    alignItems: "flex-start",
    paddingTop: 12,
  },
  helpQ: {
    color: "#7F8BFF",
    fontSize: 10,
    fontWeight: "700",
    flex: 1,
  },
  helpA: {
    position: "absolute",
    top: 39,
    left: 12,
    right: 12,
    color: "#fff",
    fontSize: 10,
    lineHeight: 16,
  },
  callGradientBase: {
    ...fill,
    backgroundColor: "#050509",
  },
  callGradientBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 330,
    backgroundColor: "rgba(62,59,101,0.72)",
  },
  callShade: {
    ...fill,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  callShadeDark: {
    ...fill,
    backgroundColor: "rgba(0,0,0,0.66)",
  },
  incoming: {
    position: "absolute",
    top: 159,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  ringName: {
    position: "absolute",
    top: 193,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 36,
    lineHeight: 54,
    fontWeight: "400",
    textAlign: "center",
  },
  callAvatar: {
    position: "absolute",
    top: 312,
    left: 163.5,
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  ringFooter: {
    position: "absolute",
    top: 602,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  smallWhite: {
    marginTop: 8,
    color: "#fff",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    fontWeight: "700",
  },
  answer: {
    position: "absolute",
    left: 54,
    bottom: 77,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#21D748",
    alignItems: "center",
    justifyContent: "center",
  },
  decline: {
    position: "absolute",
    right: 54,
    bottom: 77,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  callTime: {
    position: "absolute",
    top: 113,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  callName: {
    position: "absolute",
    top: 182,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 36,
    lineHeight: 54,
    fontWeight: "400",
    textAlign: "center",
  },
  callHint: {
    position: "absolute",
    top: 407,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  callPad: {
    position: "absolute",
    top: 493,
    left: 51,
    width: 300,
    height: 287,
    borderRadius: 20,
    backgroundColor: "rgba(117,121,148,0.82)",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 48,
    paddingHorizontal: 31,
    columnGap: 44,
    rowGap: 24,
  },
  pad: {
    width: 50,
    height: 50,
    alignItems: "center",
  },
  padText: {
    marginTop: 9,
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  callEnd: {
    position: "absolute",
    bottom: 30,
    left: 120,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  callBottomNotice: {
    position: "absolute",
    top: 814,
    left: 0,
    right: 0,
    color: "#fff",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "center",
  },
  settingProfile: {
    position: "absolute",
    top: 68,
    left: 25,
    width: 352,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  settingAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  settingName: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "800",
  },
  settingSub: {
    marginTop: 8,
    color: "#9D9D9D",
    fontSize: 11,
    lineHeight: 13,
  },
  settingGroup: {
    width: 356,
    height: 289,
    borderRadius: 8,
    backgroundColor: CARD,
    paddingTop: 20,
    paddingHorizontal: 13,
  },
  settingGroup2: {
    position: "absolute",
    top: 600,
    left: 23,
    width: 356,
    height: 126,
    borderRadius: 8,
    backgroundColor: CARD,
    paddingTop: 20,
    paddingHorizontal: 13,
  },
  settingGroup3: {
    position: "absolute",
    top: 750,
    left: 23,
    width: 356,
    height: 66,
    borderRadius: 8,
    backgroundColor: CARD,
    paddingTop: 20,
    paddingHorizontal: 13,
  },
  setRow: {
    width: 336,
    height: 30,
    marginBottom: 24,
    paddingLeft: 10,
    paddingRight: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  setRowText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "800",
  },
  dialog: {
    position: "absolute",
    top: 369,
    left: 53,
    width: 295,
    height: 136,
    borderRadius: 12,
    backgroundColor: CARD,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  dialogTitle: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "800",
  },
  dialogBody: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 10,
  },
  dialogBtns: {
    position: "absolute",
    bottom: 15,
    left: 15,
    flexDirection: "row",
    gap: 5,
  },
  dialogCancel: {
    width: 130.5,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#465264",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogOk: {
    width: 129.5,
    height: 30,
    borderRadius: 8,
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogButtonText: {
    color: "#fff",
    fontSize: 10,
    lineHeight: 15,
  },
  team: {
    position: "absolute",
    bottom: 66,
    left: 0,
    right: 0,
    color: A,
    fontSize: 8,
    lineHeight: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  soundPanel: {
    position: "absolute",
    top: 109,
    left: 34,
    right: 34,
    height: 79,
    borderRadius: 8,
    backgroundColor: CARD,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sound: {
    alignItems: "center",
  },
  soundText: {
    color: "#fff",
    fontSize: 9,
    marginTop: 8,
  },
  radio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#56637A",
    marginTop: 6,
  },
  radioOn: {
    borderColor: A,
    backgroundColor: A,
  },
  ringtone: {
    position: "absolute",
    top: 208,
    left: 34,
    right: 34,
    height: 37,
    borderRadius: 8,
    backgroundColor: CARD,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  permSettingText: {
    position: "absolute",
    top: 101,
    left: 35,
    right: 35,
    color: "#fff",
    fontSize: 10,
    lineHeight: 16,
  },
  permSettingRows: {
    position: "absolute",
    top: 191,
    left: 36,
    right: 30,
    gap: 32,
  },
  permRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  permIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2D2D2D",
    alignItems: "center",
    justifyContent: "center",
  },
  permRowTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  permBody: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  bottomTwo: {
    position: "absolute",
    bottom: 28,
    right: 20,
    flexDirection: "row",
    gap: 13,
  },
  withdrawText: {
    position: "absolute",
    top: 68,
    left: 25,
    width: 352,
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  withdrawButtons: {
    position: "absolute",
    left: 25,
    bottom: 29,
    width: 352,
    height: 41,
    flexDirection: "row",
    gap: 5,
  },
  withdrawCancel: {
    width: 174,
    height: 41,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2C2C2C",
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },
  withdrawOk: {
    width: 173,
    height: 41,
    borderRadius: 8,
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
  },
  withdrawButtonText: {
    color: "#fff",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "400",
  },
});


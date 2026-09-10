import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

// ============================================================================
// 1. TYPES & CONSTANTS (타입 및 상수 정의)
// ============================================================================

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];
type Screen =
  | "login" | "kakao" | "profile" | "contacts" | "contactModal" | "terms"
  | "permissionBasic" | "permissionSos" | "sosSystem" | "callPermission" | "permissionToast"
  | "complete" | "personaUse" | "personaPeople" | "voiceCheck" | "voiceLoading"
  | "home" | "help" | "helpOpen" | "callRinging" | "call" | "setting" | "settingDialog" | "withdraw"
  | "editProfile" | "editContacts" | "soundSetting" | "permissionSetting";

const order: Screen[] = [
  "login", "kakao", "permissionToast", "profile", "contacts", "contactModal", "terms",
  "permissionBasic", "callPermission", "permissionSos", "sosSystem", "complete",
  "home", "personaUse", "personaPeople", "voiceCheck", "voiceLoading",
  "callRinging", "call", "help", "helpOpen", "setting", "settingDialog", "withdraw", "editProfile",
  "editContacts", "soundSetting", "permissionSetting",
];

const asset = {
  logo: require("./assets/Safecall_logo.png"),
  kakao: require("./assets/screen-reference/Login - Onboarding-1.png"),
  sosSystem: require("./assets/screen-reference/Login - Onboarding-7.png"),
  callPermission: require("./assets/screen-reference/Login - Onboarding-8.png"),
  completeGradient: require("./assets/figma/onboarding-complete-gradient.png"),
  father: require("./assets/figma/raw-image-1.jpeg"),
  mother: require("./assets/figma/raw-image-3.jpeg"),
  friend: require("./assets/figma/raw-image-5.jpeg"),
};

const W = 402;
const H = 874;
const MIN_SCREEN_WIDTH = 320;
const MIN_SCREEN_HEIGHT = 568;
const A = "#6366F1"; // Primary Color
const CARD = "#202B3D";
const MUTED = "#9CA3AF";
const Y = "#FFE100";
const INTER = "Inter";


// ============================================================================
// 2. ROOT APP COMPONENT (메인 앱 및 라우팅)
// ============================================================================

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const go = (nextScreen: Screen) => setScreen(nextScreen);
  const next = () => go(order[(order.indexOf(screen) + 1) % order.length]);

  const imageOnly = ["kakao", "sosSystem", "callPermission"].includes(screen);

  return (
    <View style={s.root}>
      <StatusBar barStyle={imageOnly ? "dark-content" : "light-content"} />

      {/* 라우팅 분기 */}
      {screen === "login" && <Login go={go} />}
      {screen === "kakao" && <ImageScreen src={asset.kakao} onPress={() => go("permissionToast")} />}
      {screen === "profile" && <Profile go={go} />}
      {screen === "contacts" && <Contacts go={go} />}
      {screen === "contactModal" && <Contacts go={go} modal />}
      {screen === "terms" && <Terms go={go} />}
      {screen === "permissionBasic" && <PermissionIntro go={go} sos={false} />}
      {screen === "permissionSos" && <PermissionIntro go={go} sos />}
      {screen === "sosSystem" && <ImageScreen src={asset.sosSystem} onPress={() => go("complete")} />}
      {screen === "callPermission" && <ImageScreen src={asset.callPermission} onPress={() => go("permissionSos")} />}
      {screen === "permissionToast" && <Profile go={go} kakaoFailure />}
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
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const logoSize = layoutWidth * (108 / W);
  const logoMargin = layoutWidth * (34 / W);
  const buttonWidth = layoutWidth * (300 / W);
  const buttonHeight = buttonWidth * (45 / 300);
  const buttonRadius = layoutWidth * (6 / W);
  const actionGap = layoutWidth * (12 / W);

  return (
    <Canvas bg={A} fluid>
      <ScrollView
        style={s.loginScroll}
        contentContainerStyle={[s.loginScrollContent, { minHeight: layoutHeight }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[s.loginScreen, { minWidth: MIN_SCREEN_WIDTH }]}>
          <View style={[s.loginBrand, { paddingBottom: layoutWidth * (56 / W) }]}>
            <Image
              source={asset.logo}
              style={[
                s.loginLogo,
                {
                  width: logoSize,
                  height: logoSize,
                  marginBottom: logoMargin,
                },
              ]}
              resizeMode="contain"
            />
            <Text style={[s.loginSub, { fontSize: 15 * typeScale, lineHeight: 22.5 * typeScale }]}>
              내 손 안의 안심 통화 서비스
            </Text>
            <Text style={[s.loginTitle, { fontSize: 48 * typeScale, lineHeight: 72 * typeScale }]}>
              SafeCall
            </Text>
          </View>
          <View style={[s.loginActions, { gap: actionGap }]}>
            <Pressable
              style={[
                s.kakaoBtn,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                  borderRadius: buttonRadius,
                },
              ]}
              onPress={() => go("kakao")}
            >
              <View style={s.kakaoIconSlot}>
                <MaterialCommunityIcons name="chat" size={18 * typeScale} color="#000" />
              </View>
              <Text style={[s.kakaoText, { fontSize: 15 * typeScale, lineHeight: 22.5 * typeScale }]}>
                카카오 로그인
              </Text>
              <View style={s.kakaoIconSlot} />
            </Pressable>
            <Pressable
              style={[
                s.guestBtn,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                  borderRadius: buttonRadius,
                },
              ]}
              onPress={() => go("home")}
            >
              <Text style={[s.guestText, { fontSize: 15 * typeScale, lineHeight: 22.5 * typeScale }]}>
                로그인 없이 빠르게 사용하기
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Canvas>
  );
}

function Profile({ go, edit, kakaoFailure }: { go: (screen: Screen) => void; edit?: boolean; kakaoFailure?: boolean }) {
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const formWidth = layoutWidth * (332 / W);
  const fieldGap = layoutWidth * (31 / W);
  const segmentHeight = layoutWidth * (43 / W);
  const segmentPadding = layoutWidth * (5 / W);
  const segmentRadius = layoutWidth * (10 / W);
  const buttonWidth = layoutWidth * (362 / W);
  const buttonHeight = buttonWidth * (56 / 362);
  const buttonRadius = layoutWidth * (20 / W);

  if (!edit) {
    return (
      <Canvas fluid>
        <ScrollView
          style={s.profileScroll}
          contentContainerStyle={[
            s.profileScrollContent,
            {
              minHeight: layoutHeight,
              paddingTop: layoutHeight * (50 / H),
              paddingBottom: layoutWidth * (20 / W),
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={[s.profileFluidBox, { width: formWidth, minWidth: MIN_SCREEN_WIDTH * (332 / W) }]}>
            <ProfileField
              label="이름"
              value="김이름"
              help="긴급 문자에서 보호자가 사용자를 식별할 수 있도록 안내되는 데 사용됩니다."
              marginBottom={fieldGap}
              typeScale={typeScale}
            />
            <ProfileField
              label="전화번호"
              value="010-0000-0000"
              help={"긴급 문자에서 보호자가 사용자를 식별할 수 있도록 안내되는 데 사용됩니다.\n전화번호는 가운데 네 자리를 가린 형태로 안내됩니다."}
              marginBottom={fieldGap}
              typeScale={typeScale}
            />
            <ProfileField
              label="생년월일"
              value="2026.09.06"
              marginBottom={fieldGap}
              typeScale={typeScale}
            />
            <Text style={[s.genderLabelFluid, { fontSize: 13 * typeScale, lineHeight: 19.5 * typeScale }]}>
              성별
            </Text>
            <View
              style={[
                s.segmentFluid,
                {
                  height: segmentHeight,
                  borderRadius: segmentRadius,
                  padding: segmentPadding,
                  gap: layoutWidth * (10 / W),
                },
              ]}
            >
              <View style={s.segmentOption}>
                <Text style={[s.segmentText, s.segmentTextCentered, { fontSize: 15 * typeScale }]}>
                  남자
                </Text>
              </View>
              <View style={[s.selectedSegment, { height: "100%", borderRadius: segmentRadius }]}>
                <Text style={[s.segmentText, s.segmentTextCentered, { fontSize: 15 * typeScale }]}>
                  여자
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={[
              s.profileNextButton,
              {
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: buttonRadius,
              },
            ]}
            onPress={() => go("contacts")}
          >
            <Text style={[s.bottomText, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale }]}>
              다음
            </Text>
          </Pressable>
        </ScrollView>
        {kakaoFailure && (
          <View style={s.kakaoFailureLayer}>
            <View style={s.kakaoFailureDim} />
            <View
              style={[
                s.kakaoFailureModal,
                {
                  width: layoutWidth * (316 / W),
                  minHeight: layoutWidth * (133 / W),
                  borderRadius: layoutWidth * (20 / W),
                  paddingTop: layoutWidth * (29 / W),
                  paddingHorizontal: layoutWidth * (23 / W),
                  paddingBottom: layoutWidth * (18 / W),
                  transform: [{ translateY: -layoutHeight * (22 / H) }],
                },
              ]}
            >
              <Text style={[s.kakaoFailureTitle, { fontSize: 13 * typeScale, lineHeight: 19.5 * typeScale }]}>
                카카오 로그인에 실패하였습니다.
              </Text>
              <Text style={[s.kakaoFailureBody, { fontSize: 10 * typeScale, lineHeight: 15 * typeScale }]}>
                네트워크 연결을 확인하시고 다시 시도해주세요.
              </Text>
              <Pressable style={s.kakaoFailureConfirm} onPress={() => go("profile")}>
                <Text style={[s.kakaoFailureConfirmText, { fontSize: 12 * typeScale, lineHeight: 18 * typeScale }]}>
                  확인
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Canvas>
    );
  }

  return (
    <Canvas>
      {edit && <Top title="사용자 정보 수정" back={() => go("setting")} />}
      <View style={[s.profileBox, edit && { top: 91 }]}>
        <Field label="이름" value="김이름" top={0} help="긴급 문자에서 보호자가 사용자를 식별할 수 있도록 안내되는 데 사용됩니다." />
        <Field label="전화번호" value="010-0000-0000" top={110} help={"긴급 문자에서 보호자가 사용자를 식별할 수 있도록 안내되는 데 사용됩니다.\n전화번호는 가운데 네 자리를 가린 형태로 안내됩니다."} />
        <Field label="생년월일" value="2026.09.06" top={232} />
        <Text style={s.genderLabel}>성별</Text>
        <View style={s.segment}>
          <Text style={[s.segmentText, s.segmentTextCentered]}>남자</Text>
          <View style={s.selectedSegment}>
            <Text style={[s.segmentText, s.segmentTextCentered]}>여자</Text>
          </View>
        </View>
      </View>
      <Bottom label={edit ? "저장하기" : "다음"} onPress={() => go(edit ? "setting" : "contacts")} />
    </Canvas>
  );
}

function Contacts({ go, modal, edit }: { go: (screen: Screen) => void; modal?: boolean; edit?: boolean }) {
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const contentWidth = layoutWidth * (362 / W);
  const textWidth = layoutWidth * (290 / W);
  const cardHeight = contentWidth * (80 / 362);
  const buttonHeight = contentWidth * (56 / 362);
  const plusSize = layoutWidth * (42 / W);
  const modalWidth = layoutWidth * (336 / W);
  const modalHeight = modalWidth * (410 / 336);

  if (!edit) {
    return (
      <Canvas fluid>
        <ScrollView
          style={s.contactScroll}
          contentContainerStyle={[
            s.contactScrollContent,
            {
              minHeight: layoutHeight,
              paddingTop: layoutHeight * (59 / H),
              paddingBottom: layoutWidth * (20 / W),
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={[modal && s.dim, s.contactFluidContent, { width: contentWidth }]}>
            <View style={[s.contactHeaderFluid, { width: textWidth }]}>
              <Text
                style={[
                  s.contactTitle,
                  {
                    fontSize: 23 * typeScale,
                    lineHeight: 34 * typeScale,
                  },
                ]}
              >
                긴급 연락처를 입력해주세요.
              </Text>
              <Text
                style={[
                  s.contactDesc,
                  {
                    fontSize: 13 * typeScale,
                    lineHeight: 18 * typeScale,
                  },
                ]}
              >
                저장된 연락처로 긴급 연락(현재 내 위치를 전송합니다)을 발송할 수 있습니다. 최대 2명까지 입력 가능합니다.
              </Text>
              <Text
                style={[
                  s.warn,
                  {
                    width: textWidth * (276 / 290),
                    fontSize: 12 * typeScale,
                    lineHeight: 15 * typeScale,
                  },
                ]}
              >
                {modal ? "• " : ""}연락처를 아무것도 입력하지 않을 시 긴급 연락 기능을 사용할 수 없습니다
              </Text>
            </View>

            <ContactCard
              fluid
              style={{
                width: contentWidth,
                height: cardHeight,
                borderRadius: layoutWidth * (28 / W),
                paddingLeft: layoutWidth * (30 / W),
              }}
              avatarSize={layoutWidth * (60 / W)}
              iconSize={layoutWidth * (42 / W)}
              textScale={typeScale}
            />

            <Pressable
              style={[
                s.plusFluid,
                {
                  width: plusSize,
                  height: plusSize,
                  borderRadius: plusSize / 2,
                  marginTop: layoutWidth * (28 / W),
                },
              ]}
              onPress={() => go("contactModal")}
            >
              <MaterialCommunityIcons name="plus" size={39 * typeScale} color="#000" />
            </Pressable>
          </View>

          <Pressable
            style={[
              s.contactNextButton,
              modal && s.bottomOff,
              {
                width: contentWidth,
                height: buttonHeight,
                borderRadius: layoutWidth * (20 / W),
              },
            ]}
            onPress={() => go("terms")}
            disabled={modal}
          >
            <Text
              style={[
                s.bottomText,
                modal && s.bottomTextOff,
                { fontSize: 20 * typeScale, lineHeight: 30 * typeScale },
              ]}
            >
              다음
            </Text>
          </Pressable>
        </ScrollView>
        {modal && (
          <View style={s.modalLayer}>
            <ContactModal
              go={go}
              width={modalWidth}
              height={modalHeight}
              typeScale={typeScale}
            />
          </View>
        )}
      </Canvas>
    );
  }

  return (
    <Canvas>
      {edit && <Top title="비상 연락처 수정" back={() => go("setting")} />}
      <View style={modal ? s.dim : undefined}>
        <ContactCard top={edit ? 106 : 205} />
        <Pressable style={[s.plus, edit && { top: 205 }]} onPress={() => go("contactModal")}>
          <MaterialCommunityIcons name="plus" size={39} color="#000" />
        </Pressable>
      </View>
      {!edit && <Bottom label="다음" onPress={() => go("terms")} disabled={modal} />}
      {modal && (
        <View style={s.modalLayer}>
          <ContactModal go={go} width={336} height={410} typeScale={1} />
        </View>
      )}
    </Canvas>
  );
}

function Terms({ go }: { go: (screen: Screen) => void }) {
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const buttonWidth = layoutWidth * (362 / W);
  const buttonHeight = buttonWidth * (56 / 362);
  const contentWidth = layoutWidth * (330 / W);
  const titleWidth = layoutWidth * (362 / W);
  const checkboxSize = layoutWidth * (20 / W);

  return (
    <Canvas fluid>
      <ScrollView
        style={s.termsScroll}
        contentContainerStyle={[
          s.termsScrollContent,
          {
            minHeight: layoutHeight,
            paddingTop: layoutHeight * (59 / H),
            paddingBottom: layoutWidth * (20 / W),
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text
          style={[
            s.termsTitle,
            {
              width: titleWidth,
              fontSize: 23 * typeScale,
              lineHeight: 34 * typeScale,
            },
          ]}
        >
          개인정보 처리 및 AI 통화 동의
        </Text>
        <View style={[s.termsBody, { width: contentWidth, marginTop: layoutHeight * (65 / H) }]}>
          {[1, 2, 3, 4].map((n) => (
            <Text
              key={n}
              style={[
                s.termsText,
                {
                  fontSize: 13 * typeScale,
                  lineHeight: 16 * typeScale,
                  marginBottom: layoutHeight * (50 / H),
                },
              ]}
            >
              개인정보 처리 동의 내용입니다. 개인정보 처리 원칙, 이용 목적, 보관 기간과 파기 절차를 안내합니다. SafeCall은 긴급 연락과 AI 통화 시나리오 구성을 위해 필요한 최소 정보를 사용합니다.
            </Text>
          ))}
        </View>
        <View style={[s.agree, { width: buttonWidth, marginBottom: layoutWidth * (24 / W), gap: layoutWidth * (14 / W) }]}>
          <View
            style={[
              s.checkbox,
              {
                width: checkboxSize,
                height: checkboxSize,
                borderRadius: layoutWidth * (4 / W),
              },
            ]}
          />
          <Text style={[s.agreeText, { fontSize: 16 * typeScale, lineHeight: 24 * typeScale }]}>
            위 사항에 동의하십니까?
          </Text>
        </View>
        <Pressable
          style={[
            s.termsNextButton,
            {
              width: buttonWidth,
              height: buttonHeight,
              borderRadius: layoutWidth * (20 / W),
            },
          ]}
          onPress={() => go("permissionBasic")}
        >
          <Text style={[s.bottomText, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale }]}>
            다음
          </Text>
        </Pressable>
      </ScrollView>
    </Canvas>
  );
}

function PermissionIntro({ go, sos }: { go: (screen: Screen) => void; sos: boolean }) {
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const buttonWidth = layoutWidth * (362 / W);
  const buttonHeight = buttonWidth * (56 / 362);
  const titleWidth = layoutWidth * (332 / W);
  const contentWidth = layoutWidth * (332 / W);
  const iconSize = layoutWidth * (48 / W);
  const sosTextWidth = layoutWidth * (258 / W);

  if (sos) {
    return (
      <Canvas fluid>
        <ScrollView
          style={s.permScroll}
          contentContainerStyle={[
            s.permScrollContent,
            {
              minHeight: layoutHeight,
              paddingTop: layoutHeight * (61 / H),
              paddingBottom: layoutWidth * (20 / W),
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text
            style={[
              s.permTitleFluid,
              {
                width: titleWidth,
                fontSize: 23 * typeScale,
                lineHeight: 29 * typeScale,
              },
            ]}
          >
            SafeCall 이용을 위해 아래의 기능이 켜져 있는지 확인해주세요.
          </Text>

          <View
            style={[
              s.sosContentFluid,
              {
                width: contentWidth,
                marginTop: layoutHeight * (93 / H),
              },
            ]}
          >
            <View
              style={[
                s.permFluidIcon,
                {
                  width: iconSize,
                  height: iconSize,
                  borderRadius: iconSize / 2,
                  marginTop: layoutHeight * (56 / H),
                  marginRight: iconSize * (32 / 48),
                },
              ]}
            >
              <MaterialCommunityIcons name="alarm-light" size={24 * typeScale} color="#fff" />
            </View>
            <View style={[s.permFluidTextCol, { maxWidth: sosTextWidth }]}>
              <Text style={[s.permFluidName, { fontSize: 16 * typeScale, lineHeight: 24 * typeScale }]}>
                긴급 SOS
              </Text>
              <Text style={[s.permFluidBody, { fontSize: 12 * typeScale, lineHeight: 18 * typeScale }]}>
                앱 사용중이나 AI 안심 통화 서비스를 이용 중에 긴급한 상황 발생 시 안드로이드 시스템에 등록된 긴급번호로 전화를 연결하는 데 필요한 기능입니다.
              </Text>
              <Text style={[s.permFluidWarning, { fontSize: 12 * typeScale, lineHeight: 18 * typeScale }]}>
                긴급 SOS 기능은 SafeCall에서 제공하는 기능이 아닌, 안드로이드 시스템 자체에서 제공하는 기능입니다.
              </Text>
            </View>
          </View>

          <View style={[s.sosFooterFluid, { width: contentWidth, marginTop: layoutHeight * (62 / H) }]}>
            <Text style={[s.sosSettingFluid, { fontSize: 13 * typeScale, lineHeight: 19.5 * typeScale }]}>
              설정 &gt; 안전 및 긴급 &gt; 긴급 SOS 에서 확인할 수 있습니다.
            </Text>
            <Text
              style={[
                s.sosCautionFluid,
                {
                  marginTop: layoutHeight * (12 / H),
                  fontSize: 13 * typeScale,
                  lineHeight: 19.5 * typeScale,
                },
              ]}
            >
              실제 119나 112에 신고가 갈 수 있으므로, SafeCall은 112 긴급 호출 기능을 제어할 수 없으므로 신중한 사용을 권장합니다.
            </Text>
          </View>

          <Pressable
            style={[
              s.permNextButton,
              {
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: layoutWidth * (20 / W),
              },
            ]}
            onPress={() => go("sosSystem")}
          >
            <Text style={[s.bottomText, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale, fontWeight: "400" }]}>
              다음
            </Text>
          </Pressable>
        </ScrollView>
      </Canvas>
    );
  }

  return (
    <Canvas fluid>
      <ScrollView
        style={s.permScroll}
        contentContainerStyle={[
          s.permScrollContent,
          {
            minHeight: layoutHeight,
            paddingTop: layoutHeight * (61 / H),
            paddingBottom: layoutWidth * (20 / W),
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text
          style={[
            s.permTitleFluid,
            {
              width: titleWidth,
              fontSize: 23 * typeScale,
              lineHeight: 29 * typeScale,
            },
          ]}
        >
          SafeCall 이용을 위해 아래의{"\n"}권한을 허용해주세요.
        </Text>

        <View
          style={[
            s.permListFluid,
            {
              width: contentWidth,
              marginTop: layoutHeight * (90 / H),
              gap: layoutHeight * (64 / H),
            },
          ]}
        >
          <PermissionFluidRow
            icon="microphone"
            title="마이크"
            body="AI와 실시간 통화 이용 도중 음성 입력을 받기 위해 마이크 권한이 필요합니다."
            warning="마이크 권한을 허용하지 않을 시 서비스 이용이 불가합니다."
            iconSize={iconSize}
            typeScale={typeScale}
          />
          <PermissionFluidRow
            icon="map-marker"
            title="위치"
            body="긴급 문자에 사용자의 현재 위치 안내 링크를 함께 제공하기 위해 위치 권한이 필요합니다."
            warning="위치 권한을 허용하지 않을 시 긴급 문자에 위치 안내 링크가 포함되지 않습니다."
            iconSize={iconSize}
            typeScale={typeScale}
          />
        </View>

        <Pressable
          style={[
            s.permNextButton,
            {
              width: buttonWidth,
              height: buttonHeight,
              borderRadius: layoutWidth * (20 / W),
            },
          ]}
          onPress={() => go("callPermission")}
        >
          <Text style={[s.bottomText, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale, fontWeight: "400" }]}>
            다음
          </Text>
        </Pressable>
      </ScrollView>
    </Canvas>
  );
}

function Complete({ go }: { go: (screen: Screen) => void }) {
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const contentWidth = layoutWidth * (362 / W);
  const buttonGap = layoutWidth * (10 / W);
  const buttonWidth = (contentWidth - buttonGap) / 2;
  const buttonHeight = contentWidth * (56 / 362);

  return (
    <Canvas fluid bg={A}>
      <ImageBackground source={asset.completeGradient} style={s.completeFluidBg} resizeMode="cover">
        <ScrollView
          style={s.completeScroll}
          contentContainerStyle={[
            s.completeScrollContent,
            {
              minHeight: layoutHeight,
              paddingBottom: layoutWidth * (20 / W),
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={[s.completeTextBlock, { marginTop: layoutHeight * (379 / H) }]}>
            <Text
              style={[
                s.completeTitle,
                {
                  fontSize: 23 * typeScale,
                  lineHeight: 34 * typeScale,
                },
              ]}
            >
              설정이 모두 완료되었습니다.
            </Text>
            <Text
              style={[
                s.completeSub,
                {
                  marginTop: layoutWidth * (24 / W),
                  fontSize: 13 * typeScale,
                  lineHeight: 20 * typeScale,
                },
              ]}
            >
              긴급 메시지 설정이 잘 완료되었는지 테스트해볼까요?
            </Text>
          </View>

          <View style={[s.completeButtonRow, { width: contentWidth, height: buttonHeight, gap: buttonGap }]}>
            <Pressable
              style={[
                s.completeSkip,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                  borderRadius: layoutWidth * (6 / W),
                },
              ]}
              onPress={() => go("home")}
            >
              <Text style={[s.completeSkipText, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale }]}>
                건너뛰기
              </Text>
            </Pressable>
            <Pressable
              style={[
                s.completeOk,
                {
                  width: buttonWidth,
                  height: buttonHeight,
                  borderRadius: layoutWidth * (6 / W),
                },
              ]}
              onPress={() => go("home")}
            >
              <Text style={[s.completeOkText, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale }]}>
                확인
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </Canvas>
  );
}

function PersonaUse({ go }: { go: (screen: Screen) => void }) {
  const [selected, setSelected] = useState(0);
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const topButtonTop = layoutHeight * (53 / H);
  const contentWidth = layoutWidth * (362 / W);
  const choiceSize = layoutWidth * (100 / W);
  const choiceColumnWidth = layoutWidth * (100 / W);
  const choiceGap = layoutWidth * (24 / W);
  const nextHeight = contentWidth * (56 / 362);

  const choices: Array<{ icon: IconName; text: string }> = [
    { icon: "walk", text: "누군가 따라오는\n것 같아요" },
    { icon: "car", text: "택시 안이\n불안해요" },
    { icon: "account-tie", text: "낯선 사람이\n근처에 있어요" },
    { icon: "account-group", text: "혼자 귀가하기\n무서워요" },
  ];

  return (
    <Canvas fluid>
      <View style={[s.personaFluidFrame, { width: layoutWidth, minHeight: layoutHeight }]}>
        <Pressable
          style={[s.personaArrow, { top: topButtonTop, left: layoutWidth * (18 / W) }]}
          onPress={() => go("home")}
        >
          <MaterialCommunityIcons name="chevron-left" size={46 * typeScale} color="#FFFFFF" />
        </Pressable>
        <View style={[s.personaDotsFluid, { top: layoutHeight * (65 / H), gap: layoutWidth * (11 / W) }]}>
          {[0, 1, 2].map((n) => (
            <View
              key={n}
              style={[
                s.personaDotFluid,
                {
                  width: n === 0 ? layoutWidth * (10 / W) : layoutWidth * (6 / W),
                  height: n === 0 ? layoutWidth * (10 / W) : layoutWidth * (6 / W),
                  borderRadius: n === 0 ? layoutWidth * (5 / W) : layoutWidth * (3 / W),
                  backgroundColor: n === 0 ? A : "#D9D9D9",
                },
              ]}
            />
          ))}
        </View>
        <Pressable
          style={[s.personaArrow, { top: topButtonTop, right: layoutWidth * (18 / W) }]}
          onPress={() => go("personaPeople")}
        >
          <MaterialCommunityIcons name="chevron-right" size={46 * typeScale} color="#FFFFFF" />
        </Pressable>

        <Text
          style={[
            s.personaTitleFluid,
            {
              top: layoutHeight * (145 / H),
              fontSize: 16 * typeScale,
              lineHeight: 24 * typeScale,
            },
          ]}
        >
          어떤 상황에서 안심 통화를 사용하시나요?
        </Text>

        <View
          style={[
            s.personaChoiceGridFluid,
            {
              top: layoutHeight * (233 / H),
              width: contentWidth,
              columnGap: choiceGap,
              rowGap: layoutWidth * (28 / W),
            },
          ]}
        >
          {choices.map((choice, index) => (
            <Pressable
              key={choice.text}
              style={[s.personaChoiceFluid, { width: choiceColumnWidth }]}
              onPress={() => setSelected(index)}
            >
              <View
                style={[
                  s.personaChoiceCircleFluid,
                  {
                    width: choiceSize,
                    height: choiceSize,
                    borderRadius: choiceSize / 2,
                    backgroundColor: selected === index ? A : "#FFFFFF",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={choice.icon}
                  size={68 * typeScale}
                  color={selected === index ? "#FFFFFF" : A}
                />
              </View>
              <Text
                style={[
                  s.personaChoiceTextFluid,
                  {
                    marginTop: layoutWidth * (10 / W),
                    fontSize: 13 * typeScale,
                    lineHeight: 18 * typeScale,
                  },
                ]}
              >
                {choice.text}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[
            s.personaNextFluid,
            {
              width: contentWidth,
              height: nextHeight,
              borderRadius: layoutWidth * (20 / W),
              bottom: layoutWidth * (57 / W),
            },
          ]}
          onPress={() => go("personaPeople")}
        >
          <Text style={[s.personaNextTextFluid, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale }]}>
            다음
          </Text>
        </Pressable>
        <View style={[s.personaBottomPeekFluid, { height: layoutWidth * (48 / W) }]}>
          <View
            style={[
              s.personaPeekHandleFluid,
              {
                marginTop: layoutWidth * (16 / W),
                width: layoutWidth * (35 / W),
                height: layoutWidth * (6 / W),
                borderRadius: layoutWidth * (20 / W),
              },
            ]}
          />
        </View>
      </View>
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
  const { width, height } = useWindowDimensions();
  const viewportWidth = Math.max(width || W, MIN_SCREEN_WIDTH);
  const viewportHeight = Math.max(height || H, MIN_SCREEN_HEIGHT);
  const layoutWidth = Math.max(
    MIN_SCREEN_WIDTH,
    Math.min(viewportWidth, viewportHeight * (W / H)),
  );
  const layoutHeight = Math.max(MIN_SCREEN_HEIGHT, viewportHeight);
  const typeScale = Math.max(0.82, Math.min(layoutWidth / W, 1.15));
  const topButtonSize = layoutWidth * (40 / W);
  const callSize = layoutWidth * (220 / W);
  const sheetHeight = layoutWidth * (209 / W);
  const collapsedSheetHeight = layoutWidth * (48 / W);

  return (
    <Canvas fluid>
      <View style={[s.homeFrame, { width: layoutWidth, minHeight: layoutHeight }]}>
        {drawerOpen && (
          <Pressable
            style={[s.homeOutsideClose, { bottom: sheetHeight }]}
            onPress={() => setDrawerOpen(false)}
          />
        )}
        <Pressable
          style={[
            s.homeIconButton,
            {
              top: layoutHeight * (33 / H),
              left: layoutWidth * (30 / W),
              width: topButtonSize,
              height: topButtonSize,
              borderRadius: topButtonSize / 2,
            },
          ]}
          onPress={() => go("setting")}
        >
          <MaterialCommunityIcons name="cog-outline" size={30 * typeScale} color="#000" />
        </Pressable>
        <Pressable
          style={[
            s.homeIconButton,
            {
              top: layoutHeight * (33 / H),
              right: layoutWidth * (30 / W),
              width: topButtonSize,
              height: topButtonSize,
              borderRadius: topButtonSize / 2,
            },
          ]}
          onPress={() => go("help")}
        >
          <Text style={[s.homeHelpText, { fontSize: 30 * typeScale, lineHeight: 36 * typeScale }]}>?</Text>
        </Pressable>

        <View
          style={[
            s.homeHeaderTextWrap,
            {
              top: layoutHeight * (183 / H),
              width: layoutWidth * (320 / W),
            },
          ]}
        >
          <Text style={[s.homeTitleFluid, { fontSize: 20 * typeScale, lineHeight: 24 * typeScale }]}>
            눌러서 AI 안심통화를 시작하세요
          </Text>
          <Text style={[s.homeWarningFluid, { fontSize: 13 * typeScale, lineHeight: 16 * typeScale }]}>
            가상 통화는 실제 신고나 구조를 대신하지 않습니다.
          </Text>
        </View>

        <Pressable
          style={[
            s.homeCallButton,
            {
              top: layoutHeight * (312 / H),
              width: callSize,
              height: callSize,
            },
          ]}
          onPress={() => go("personaUse")}
        >
          <Image source={require("./assets/figma/home-imgFrame1.png")} style={{ width: callSize, height: callSize }} />
        </Pressable>

        <Text
          style={[
            s.homeNoticeFluid,
            {
              top: layoutHeight * (611 / H),
              width: layoutWidth * (250 / W),
              fontSize: 11 * typeScale,
              lineHeight: 16.5 * typeScale,
            },
          ]}
        >
          긴급 메세지 기능이 <Text style={design.available}>사용 가능</Text>합니다.{"\n"}
          긴급 메세지 위치 전송이 <Text style={design.warnInline}>사용 불가</Text>합니다.
        </Text>

        {drawerOpen ? (
          <View
            style={[
              s.homeInfoSheet,
              {
                height: sheetHeight,
                borderTopLeftRadius: layoutWidth * (60 / W),
                borderTopRightRadius: layoutWidth * (60 / W),
              },
            ]}
          >
            <Pressable style={s.homeSheetHandlePress} onPress={() => setDrawerOpen(false)}>
              <View
                style={[
                  s.homeSheetHandle,
                  {
                    width: layoutWidth * (35 / W),
                    height: layoutWidth * (6 / W),
                    borderRadius: layoutWidth * (20 / W),
                  },
                ]}
              />
            </Pressable>
            <Text
              style={[
                s.homeInfoTextFluid,
                {
                  marginTop: layoutWidth * (39.5 / W),
                  paddingHorizontal: layoutWidth * (30 / W),
                  fontSize: 13 * typeScale,
                  lineHeight: 16 * typeScale,
                },
              ]}
            >
              전원 버튼을 5번 연속으로 눌러 <Text style={s.homeInfoAccent}>긴급 호출 기능</Text>을 실행시킬 수 있습니다.{"\n\n"}
              하단 볼륨 버튼을 3초 이상 눌러 <Text style={s.homeInfoAccent}>긴급 문자 보내기 기능</Text>을 실행시킬 수 있습니다.{"\n\n"}
              긴급 호출 기능(긴급 SOS 기능)은 SafeCall 과 별개로 항상 작동되니 실수로 실행시키지 않도록 주의해 주십시오. 긴급 문자 보내기 기능은 앱 실행중에만 실행 가능합니다.
            </Text>
          </View>
        ) : (
          <Pressable
            style={[
              s.homeInfoSheet,
              {
                height: collapsedSheetHeight,
                borderTopLeftRadius: layoutWidth * (60 / W),
                borderTopRightRadius: layoutWidth * (60 / W),
              },
            ]}
            onPress={() => setDrawerOpen(true)}
          >
            <View
              style={[
                s.homeSheetHandle,
                {
                  marginTop: layoutWidth * (16 / W),
                  width: layoutWidth * (35 / W),
                  height: layoutWidth * (6 / W),
                  borderRadius: layoutWidth * (20 / W),
                },
              ]}
            />
          </Pressable>
        )}
      </View>
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

function Canvas({
  children,
  bg = "#000",
  fluid,
}: {
  children: React.ReactNode;
  bg?: string;
  fluid?: boolean;
}) {
  return (
    <View style={[s.canvas, fluid && s.fluidCanvas, { backgroundColor: bg }]}>
      {children}
    </View>
  );
}

function ImageScreen({ src, onPress }: { src: number; onPress: () => void }) {
  return (
    <Pressable style={s.imageScreen} onPress={onPress}>
      <Image source={src} style={s.fullImage} resizeMode="cover" />
    </Pressable>
  );
}

function ProfileField({
  label,
  value,
  help,
  marginBottom,
  typeScale,
}: {
  label: string;
  value: string;
  help?: string;
  marginBottom: number;
  typeScale: number;
}) {
  return (
    <View style={[s.profileFieldFluid, { marginBottom }]}>
      <Text style={[s.fieldLabel, { fontSize: 13 * typeScale, lineHeight: 19.5 * typeScale }]}>
        {label}
      </Text>
      <Text
        style={[
          s.fieldValue,
          {
            marginTop: 8 * typeScale,
            marginLeft: 5 * typeScale,
            fontSize: 20 * typeScale,
            lineHeight: 30 * typeScale,
          },
        ]}
      >
        {value}
      </Text>
      <View style={s.line} />
      {help && (
        <Text style={[s.helpText, { marginTop: 8 * typeScale, fontSize: 10 * typeScale, lineHeight: 12 * typeScale }]}>
          {help}
        </Text>
      )}
    </View>
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

function ContactCard({
  top,
  fluid,
  style,
  avatarSize = 60,
  iconSize = 42,
  textScale = 1,
}: {
  top?: number;
  fluid?: boolean;
  style?: React.ComponentProps<typeof View>["style"];
  avatarSize?: number;
  iconSize?: number;
  textScale?: number;
}) {
  return (
    <View style={[s.contactCard, !fluid && s.contactCardFixed, top !== undefined && { top }, style]}>
      <View
        style={[
          s.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            marginRight: 20 * textScale,
          },
        ]}
      >
        <MaterialCommunityIcons name="account" size={iconSize} color="#fff" />
      </View>
      <View>
        <Text style={[s.contactName, { fontSize: 16 * textScale, lineHeight: 19 * textScale }]}>보호자 1</Text>
        <Text style={[s.contactRelation, { fontSize: 12 * textScale, lineHeight: 15 * textScale }]}>관계</Text>
      </View>
    </View>
  );
}

function ContactModal({
  go,
  width,
  height,
  typeScale,
}: {
  go: (screen: Screen) => void;
  width: number;
  height: number;
  typeScale: number;
}) {
  const horizontalPadding = width * (36 / 336);
  const buttonHorizontalPadding = width * (28 / 336);
  const fieldGap = height * (30 / 410);
  const buttonHeight = height * (35 / 410);
  const buttonGap = width * (5 / 336);
  const buttonWidth = (width - buttonHorizontalPadding * 2 - buttonGap) / 2;
  const buttonRadius = width * (12 / 336);

  return (
    <View
      style={[
        s.contactModal,
        {
          width,
          minWidth: MIN_SCREEN_WIDTH * (336 / W),
          height,
          borderRadius: width * (29 / 336),
          paddingTop: height * (48 / 410),
          paddingBottom: height * (23 / 410),
        },
      ]}
    >
      <View
        style={[
          s.modalMenuRow,
          {
            top: height * (27 / 410),
            right: width * (22 / 336),
          },
        ]}
      >
        <View
          style={[
            s.modalMenu,
            {
              width: width * (35 / 336),
              height: width * (35 / 336),
              borderRadius: width * (18 / 336),
            },
          ]}
        >
          <MaterialCommunityIcons name="dots-vertical" size={27 * typeScale} color="#fff" />
        </View>
      </View>
      <View style={[s.modalFieldStack, { paddingHorizontal: horizontalPadding }]}>
        <ModalField label="이름" value="보호자 2" typeScale={typeScale} />
        <ModalField label="관계" value="어머니" typeScale={typeScale} marginTop={fieldGap} />
        <ModalField
          label="전화번호"
          value="010-0000-0000"
          typeScale={typeScale}
          marginTop={fieldGap}
          error="전화번호의 형식이 올바르지 않습니다."
        />
      </View>
      <View style={[s.modalBtns, { gap: buttonGap, paddingHorizontal: buttonHorizontalPadding }]}>
        <Pressable
          style={[
            s.contactModalButton,
            s.contactModalButtonCancel,
            {
              width: buttonWidth,
              height: buttonHeight,
              borderRadius: buttonRadius,
            },
          ]}
          onPress={() => go("contacts")}
        >
          <Text style={[s.modalButtonText, { fontSize: 12 * typeScale, lineHeight: 18 * typeScale }]}>취소</Text>
        </Pressable>
        <Pressable
          style={[
            s.contactModalButton,
            s.contactModalButtonAdd,
            {
              width: buttonWidth,
              height: buttonHeight,
              borderRadius: buttonRadius,
            },
          ]}
          onPress={() => go("contacts")}
        >
          <Text style={[s.modalButtonText, { fontSize: 12 * typeScale, lineHeight: 18 * typeScale }]}>추가</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ModalField({
  label,
  value,
  error,
  marginTop = 0,
  typeScale,
}: {
  label: string;
  value: string;
  error?: string;
  marginTop?: number;
  typeScale: number;
}) {
  return (
    <View style={[s.modalField, { marginTop }]}>
      <Text style={[s.modalLabel, { fontSize: 13 * typeScale, lineHeight: 19.5 * typeScale }]}>{label}</Text>
      <Text style={[s.modalValue, { fontSize: 20 * typeScale, lineHeight: 30 * typeScale }]}>
        {value}
      </Text>
      <View style={s.line} />
      {error && <Text style={[s.error, { fontSize: 10 * typeScale, lineHeight: 15 * typeScale }]}>{error}</Text>}
    </View>
  );
}

function PermissionFluidRow({
  icon,
  title,
  body,
  warning,
  iconSize,
  typeScale,
}: {
  icon: IconName;
  title: string;
  body: string;
  warning: string;
  iconSize: number;
  typeScale: number;
}) {
  return (
    <View style={s.permFluidRow}>
      <View
        style={[
          s.permFluidIcon,
          {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
            marginRight: iconSize * (32 / 48),
          },
        ]}
      >
        <MaterialCommunityIcons name={icon} size={24 * typeScale} color="#fff" />
      </View>
      <View style={s.permFluidTextCol}>
        <Text style={[s.permFluidName, { fontSize: 16 * typeScale, lineHeight: 24 * typeScale }]}>
          {title}
        </Text>
        <Text style={[s.permFluidBody, { fontSize: 12 * typeScale, lineHeight: 18 * typeScale }]}>
          {body}
        </Text>
        <Text style={[s.permFluidWarning, { fontSize: 12 * typeScale, lineHeight: 18 * typeScale }]}>
          {warning}
        </Text>
      </View>
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#6366F1",
  },
  warnInline: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#7A8BFB",
    fontWeight: "900",
  },
  voiceTitle: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    width: "100%",
    height: "100%",
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
  fluidCanvas: {
    maxWidth: "100%",
    minHeight: 0,
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
  loginScroll: {
    flex: 1,
    width: "100%",
  },
  loginScrollContent: {
    flexGrow: 1,
  },
  profileScroll: {
    flex: 1,
    width: "100%",
  },
  profileScrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  profileFluidBox: {
    alignSelf: "center",
  },
  profileFieldFluid: {
    width: "100%",
  },
  genderLabelFluid: {
    fontFamily: INTER,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 8,
  },
  segmentFluid: {
    width: "100%",
    backgroundColor: CARD,
    flexDirection: "row",
    alignItems: "center",
  },
  segmentOption: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  segmentTextCentered: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  profileNextButton: {
    marginTop: "auto",
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  kakaoFailureLayer: {
    ...fill,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  },
  kakaoFailureDim: {
    ...fill,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  kakaoFailureModal: {
    backgroundColor: CARD,
  },
  kakaoFailureTitle: {
    fontFamily: INTER,
    color: "#fff",
    fontWeight: "700",
  },
  kakaoFailureBody: {
    fontFamily: INTER,
    color: "#B7BECA",
    fontWeight: "300",
    marginTop: 12,
  },
  kakaoFailureConfirm: {
    alignSelf: "flex-end",
    marginTop: 26,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  kakaoFailureConfirmText: {
    fontFamily: INTER,
    color: A,
    fontWeight: "400",
  },
  homeFrame: {
    alignSelf: "center",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  homeIconButton: {
    position: "absolute",
    backgroundColor: "#989EC9",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  homeHelpText: {
    fontFamily: INTER,
    color: "#000",
    fontWeight: "700",
    includeFontPadding: false,
    textAlign: "center",
  },
  homeHeaderTextWrap: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    zIndex: 2,
  },
  homeTitleFluid: {
    fontFamily: INTER,
    color: "#FFFFFF",
    fontWeight: "400",
    textAlign: "center",
    includeFontPadding: false,
  },
  homeWarningFluid: {
    fontFamily: INTER,
    color: Y,
    fontWeight: "400",
    textAlign: "center",
    includeFontPadding: false,
    marginTop: 10,
  },
  homeCallButton: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
  },
  homeNoticeFluid: {
    position: "absolute",
    alignSelf: "center",
    fontFamily: INTER,
    color: "#CACACA",
    fontWeight: "400",
    textAlign: "center",
    includeFontPadding: false,
    zIndex: 2,
  },
  homeInfoSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "#455269",
    backgroundColor: "#1E293B",
    overflow: "hidden",
    zIndex: 4,
  },
  homeSheetHandlePress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  homeSheetHandle: {
    alignSelf: "center",
    backgroundColor: "#606A80",
  },
  homeInfoTextFluid: {
    fontFamily: INTER,
    color: "#FFFFFF",
    fontWeight: "400",
    includeFontPadding: false,
  },
  homeInfoAccent: {
    fontFamily: INTER,
    color: "#7A8BFB",
    fontWeight: "900",
  },
  personaFluidFrame: {
    alignSelf: "center",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  personaArrow: {
    position: "absolute",
    zIndex: 3,
  },
  personaDotsFluid: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 3,
  },
  personaDotFluid: {
    backgroundColor: "#D9D9D9",
  },
  personaTitleFluid: {
    position: "absolute",
    left: 10,
    right: 10,
    fontFamily: INTER,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
    includeFontPadding: false,
  },
  personaChoiceGridFluid: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  personaChoiceFluid: {
    alignItems: "center",
  },
  personaChoiceCircleFluid: {
    alignItems: "center",
    justifyContent: "center",
  },
  personaChoiceTextFluid: {
    fontFamily: INTER,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
    includeFontPadding: false,
  },
  personaNextFluid: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 4,
  },
  personaNextTextFluid: {
    fontFamily: INTER,
    color: "#FFFFFF",
    fontWeight: "400",
    includeFontPadding: false,
  },
  personaBottomPeekFluid: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    borderWidth: 2,
    borderColor: "#465670",
    backgroundColor: CARD,
    zIndex: 1,
  },
  personaPeekHandleFluid: {
    alignSelf: "center",
    backgroundColor: "#606A80",
  },
  loginScreen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  loginBrand: {
    flex: 0.68,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginActions: {
    flex: 0.32,
    width: "100%",
    alignItems: "center",
    paddingTop: "2%",
  },
  loginLogo: {
  },
  loginSub: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22.5,
    fontWeight: "700",
    textAlign: "center",
    width: "100%",
  },
  loginTitle: {
    color: "#fff",
    fontSize: 48,
    lineHeight: 72,
    fontWeight: "900",
    fontFamily: "Leelawadee UI",
    letterSpacing: -1.6,
    textAlign: "center",
    width: "100%",
  },
  kakaoBtn: {
    backgroundColor: "#FEE500",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  kakaoIconSlot: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: "4.7%",
  },
  kakaoText: {
    flex: 2,
    color: "rgba(0,0,0,0.85)",
    fontSize: 15,
    lineHeight: 22.5,
    fontWeight: "700",
    textAlign: "center",
  },
  guestBtn: {
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "600",
  },
  fieldValue: {
    fontFamily: INTER,
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
    fontFamily: INTER,
    marginTop: 8,
    color: "#7A8BFB",
    fontSize: 10,
    lineHeight: 12,
  },
  genderLabel: {
    fontFamily: INTER,
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
    alignItems: "center",
    gap: 10,
  },
  segmentText: {
    fontFamily: INTER,
    flex: 1,
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 33,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
  },
  bottomTextOff: {
    fontFamily: INTER,
    color: "#777",
  },
  contactScroll: {
    flex: 1,
    width: "100%",
  },
  contactScrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  contactFluidContent: {
    alignItems: "center",
  },
  contactHeaderFluid: {
    alignItems: "center",
    marginBottom: 24,
  },
  contactNextButton: {
    marginTop: "auto",
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  contactTitle: {
    fontFamily: INTER,
    alignSelf: "flex-start",
    color: "#fff",
    fontSize: 26,
    lineHeight: 34,
  },
  contactDesc: {
    fontFamily: INTER,
    marginTop: 6,
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
  },
  warn: {
    fontFamily: INTER,
    marginTop: 6,
    width: 276,
    color: Y,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
  },
  contactCard: {
    width: 362,
    height: 80,
    borderRadius: 28,
    backgroundColor: CARD,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
  },
  contactCardFixed: {
    position: "absolute",
    left: 20,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  contactRelation: {
    fontFamily: INTER,
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
  plusFluid: {
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
    justifyContent: "center",
    zIndex: 20,
  },
  contactModal: {
    position: "relative",
    backgroundColor: CARD,
  },
  modalMenuRow: {
    position: "absolute",
    alignItems: "flex-end",
    zIndex: 2,
  },
  modalMenu: {
    backgroundColor: "#445064",
    alignItems: "center",
    justifyContent: "center",
  },
  modalField: {
    width: "100%",
  },
  modalFieldStack: {
    width: "100%",
  },
  modalLabel: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  modalValue: {
    fontFamily: INTER,
    marginTop: 6,
    marginLeft: 5,
    color: MUTED,
    fontSize: 20,
    fontWeight: "400",
  },
  error: {
    fontFamily: INTER,
    marginTop: 8,
    color: "#F97316",
    fontSize: 10,
  },
  modalBtns: {
    marginTop: "auto",
    flexDirection: "row",
  },
  contactModalButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  contactModalButtonCancel: {
    backgroundColor: "#445064",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  contactModalButtonAdd: {
    backgroundColor: A,
  },
  modalButtonText: {
    fontFamily: INTER,
    color: "#fff",
    fontWeight: "400",
  },
  termsScroll: {
    flex: 1,
    width: "100%",
  },
  termsScrollContent: {
    flexGrow: 1,
    alignItems: "center",
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "800",
  },
  termsTitle: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 23,
    lineHeight: 34,
    fontWeight: "400",
    textAlign: "center",
  },
  termsBody: {
    alignSelf: "center",
  },
  termsText: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    lineHeight: 16,
  },
  agree: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  termsNextButton: {
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  permScroll: {
    flex: 1,
    width: "100%",
  },
  permScrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  permTitleFluid: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "400",
    textAlign: "center",
  },
  permListFluid: {
    alignSelf: "center",
  },
  permFluidRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  permFluidIcon: {
    backgroundColor: "#2D2D2D",
    alignItems: "center",
    justifyContent: "center",
  },
  permFluidTextCol: {
    flex: 1,
  },
  permFluidName: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  permFluidBody: {
    fontFamily: INTER,
    marginTop: 4,
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
  },
  permFluidWarning: {
    fontFamily: INTER,
    marginTop: 4,
    color: Y,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
  },
  sosContentFluid: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  sosFooterFluid: {
    alignSelf: "center",
  },
  sosSettingFluid: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "400",
  },
  sosCautionFluid: {
    fontFamily: INTER,
    color: Y,
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "700",
  },
  permNextButton: {
    marginTop: "auto",
    backgroundColor: A,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  permTitleBasic: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "800",
  },
  permGray: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
    marginTop: 8,
  },
  permYellow: {
    fontFamily: INTER,
    color: Y,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
  sosPath: {
    fontFamily: INTER,
    position: "absolute",
    top: 432,
    left: 43,
    width: 316,
    color: "#fff",
    fontSize: 13,
    lineHeight: 19.5,
  },
  sosWarning: {
    fontFamily: INTER,
    position: "absolute",
    top: 517,
    left: 43,
    width: 316,
    color: Y,
    fontSize: 12,
    lineHeight: 16,
  },
  completeFluidBg: {
    flex: 1,
    width: "100%",
  },
  completeScroll: {
    flex: 1,
    width: "100%",
  },
  completeScrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  completeTextBlock: {
    alignItems: "center",
  },
  completeTitle: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 23,
    lineHeight: 34,
    fontWeight: "400",
    textAlign: "center",
  },
  completeSub: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  completeButtonRow: {
    marginTop: "auto",
    flexDirection: "row",
  },
  completeButtonRowFixed: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 56,
    flexDirection: "row",
    gap: 10,
  },
  completeSkip: {
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  completeOk: {
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  completeSkipText: {
    fontFamily: INTER,
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
  },
  completeOkText: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  loadingText: {
    fontFamily: INTER,
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
    zIndex: 1,
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
    fontFamily: INTER,
    color: "#7F8BFF",
    fontSize: 10,
    fontWeight: "700",
    flex: 1,
  },
  helpA: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "800",
  },
  settingSub: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "800",
  },
  dialogBody: {
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 10,
    lineHeight: 15,
  },
  team: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  permBody: {
    fontFamily: INTER,
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
    fontFamily: INTER,
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
    fontFamily: INTER,
    color: "#fff",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "400",
  },
});



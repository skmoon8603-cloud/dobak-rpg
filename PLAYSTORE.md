# 도박 RPG 플레이스토어 출시 순서

게임 쪽 준비(욕설 필터·신고·차단·계정 삭제·개인정보처리방침·앱 설치 파일)는 끝났어요. 아래는 직접 해야 하는 일이에요.

## 1. 앱 파일 만들기 (PWABuilder, 무료)
1. https://www.pwabuilder.com 에 들어가서 주소에 `https://random-football-cflg.onrender.com/rpg/` 를 넣고 Start.
2. **Package For Stores → Android → Generate Package**.
   - Package ID: `com.dobakrpg.app` (바꾸면 아래 3번의 `RPG_APP_PKG` 도 같이 바꾸기)
   - App name: 도박 RPG
   - Display mode: Fullscreen
   - Signing key: **Create new** (만들어진 키 파일과 비밀번호는 절대 잃어버리지 말 것 — 잃으면 업데이트를 못 올려요)
3. 내려받은 zip 안의 `.aab` 파일이 플레이스토어에 올릴 파일이에요.
4. zip 안의 `assetlinks.json` 을 열어 `sha256_cert_fingerprints` 값을 복사해 둬요.

## 2. Render 환경변수 넣기
Render 대시보드 → 서버 → Environment 에 추가:
- `RPG_APP_SHA256` = 위에서 복사한 지문 (플레이 콘솔의 "앱 서명 키" 지문도 있으면 쉼표로 이어서)
- `RPG_APP_PKG` = `com.dobakrpg.app`
- `RPG_CONTACT` = 문의 받을 이메일 주소

넣고 나면 `https://random-football-cflg.onrender.com/.well-known/assetlinks.json` 에 지문이 보여야 해요. (이게 없으면 앱 위에 주소창이 보여요)

## 3. 플레이 콘솔
1. https://play.google.com/console 개발자 계정 만들기 ($25, 한 번만).
2. 앱 만들기 → 게임 → 무료.
3. **개인 계정이면 비공개 테스트에 테스터 12명 이상이 14일 동안 계속 참여**해야 정식 출시를 신청할 수 있어요.
4. 앱 콘텐츠에서 채우기:
   - 개인정보처리방침: `https://random-football-cflg.onrender.com/rpg/privacy`
   - 계정 삭제 URL: `https://random-football-cflg.onrender.com/rpg/delete`
   - 콘텐츠 등급 설문: **모의 도박 있음**, 사용자끼리 채팅 있음, 폭력(판타지) 있음 → 솔직하게
   - 타깃 연령: 18세 이상
   - 데이터 보안: 아이디·닉네임, 게임 기록, 채팅(사용자 제작 콘텐츠) 수집 / 판매·공유 안 함 / 삭제 요청 가능
   - 광고: 없음
5. 스토어 등록정보: 아이콘(icon-512.png), 스크린샷 2장 이상, 그래픽 이미지(1024×500), 설명.

## 4. 남은 확인거리
- 배경음악 mp3 들이 상업적으로 써도 되는 음원인지 출처 확인.
- 신고 목록 보기: 관리자로 로그인한 상태에서 `/api/rpg/admin/reports`.

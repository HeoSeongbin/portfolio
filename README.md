# 허성빈 | Web & Application Developer

신규 시스템 구축부터 기존 시스템 고도화, 데이터 연동과 운영 장애 대응까지의 경험을 담은 개발자 포트폴리오입니다.

**Build · Understand · Solve**를 중심으로 경력, 문제 해결 과정과 개인 프로젝트를 소개합니다. React·TypeScript·Vite로 구현한 정적 단일 페이지이며, 콘텐츠는 TypeScript 데이터 파일에서 관리합니다.

## 주요 구성

| 섹션 | 내용 |
| --- | --- |
| About | 서비스 전체 흐름을 이해하며 개발하는 방식 |
| Experience | 인콤(주) 근무 기간(2023.08–2026.08)의 구축·고도화·연동 경험 |
| Projects | 공개 개인 프로젝트 4개와 준비 중인 팀 프로젝트 1개 |
| Troubleshooting | 문제·분석·판단·해결·검증 순서의 운영 장애 대응 사례 |
| Skills | 실제 사용 맥락에 따른 기술 분류 |
| Development Approach | Build · Understand · Solve · Improve |
| Contact | 이메일·GitHub 및 이력서 링크 영역 |

### 개인 프로젝트

| 프로젝트 | 소개 | 링크 |
| --- | --- | --- |
| Architecture Diagram Editor | URL 공유, 그룹 편집·자동 배치와 파일 출력을 지원하는 아키텍처 편집기 | [소스](https://github.com/HeoSeongbin/Architecture-) · [데모](https://heoseongbin.github.io/Architecture-/) |
| DocumentMask Studio | 이미지·PDF·TIFF 편집과 마스킹 결과 다운로드 도구 | [소스](https://github.com/HeoSeongbin/MaskingViewer) · [데모](https://heoseongbin.github.io/MaskingViewer/) |
| InterfaceFlow Lab | 전문 검증·매핑, 장애 재현과 재시도·복구를 추적하는 연동 실험 플랫폼 | [소스 및 로컬 실행 안내](https://github.com/HeoSeongbin/interfaceflow-lab) |
| ConvertFlow | 이미지·TIFF의 PDF 변환과 재시도·취소·Worker 장애 복구를 관리하는 비동기 문서 처리 플랫폼 | [소스 및 로컬 실행 안내](https://github.com/HeoSeongbin/ConvertFlow) |

위 프로젝트는 각각 별도 저장소에서 관리합니다. 이 저장소에는 포트폴리오 웹사이트만 포함합니다.

## 기술과 기능

- React · TypeScript · Vite · CSS, 프로젝트 슬라이더에 Swiper 사용
- 섹션 이동과 현재 메뉴 표시, 모바일 내비게이션
- 개인·팀 프로젝트 필터, Coverflow 슬라이더와 상세 모달, 문제 해결 사례 Accordion
- 프로젝트 스와이프·이전/다음 버튼·페이지 선택 및 방향키 이동
- 키보드 포커스, 본문 바로가기, `prefers-reduced-motion` 대응
- 반응형 레이아웃, 기본 SEO·Open Graph 메타데이터
- GitHub Actions 기반 GitHub Pages 배포 워크플로

## 로컬 실행

Node.js 22 이상과 npm을 준비합니다.

```bash
npm install
npm run dev
```

터미널에 표시되는 주소를 브라우저에서 엽니다. 서버 종료는 `Ctrl + C`입니다.

Windows PowerShell에서 `npm.ps1` 실행 정책 오류가 발생하면 `npm.cmd install`, `npm.cmd run dev`를 사용합니다.

### 빌드와 미리보기

```bash
npm run build
npm run preview
```

빌드는 TypeScript 검사 후 `dist/`를 생성합니다. 미리보기 주소도 터미널에서 확인합니다. CI처럼 lock 파일 기준으로 설치하려면 `npm ci`를 사용합니다.

## 프로젝트 구조

```text
.github/workflows/deploy.yml   # GitHub Pages 배포
public/                       # favicon, OG 이미지 placeholder
src/
  components/Section.tsx       # 공통 섹션
  sections/Projects.tsx        # 프로젝트 필터·상세 모달
  hooks/useActiveSection.ts   # 현재 섹션 추적
  data/                       # 프로필·경력·프로젝트·문제 해결·기술
  types/index.ts              # 콘텐츠 타입
  App.tsx                     # 전체 페이지 구성
  main.tsx                    # 진입점
  styles.css                  # 공통 스타일·반응형
```

## 콘텐츠 수정

| 파일 | 수정 내용 |
| --- | --- |
| `src/data/profile.ts` | 이름, 소개, 근무 기간·상태, 경력 표기, 연락처·외부 링크, 개발 방식 |
| `src/data/experiences.ts` | 경력별 역할, 기술, 주요 내용과 작업 흐름 |
| `src/data/projects.ts` | 개인·팀 프로젝트 정보와 GitHub·Demo 링크 |
| `src/data/troubleshooting.ts` | 문제 해결 사례의 단계별 설명 |
| `src/data/skills.ts` | 기술 카테고리와 사용 맥락 |

GitHub·이력서 주소가 비어 있으면 Hero 버튼은 숨기고 Contact에는 준비 중으로 표시합니다. Blog는 주소를 입력하면 Contact에 추가됩니다.

### 프로젝트 추가

`src/data/projects.ts`의 `projects` 배열에 다음 형태의 객체를 추가합니다. 타입은 `src/types/index.ts`의 `Project`를 참고하세요.

```ts
{
  id: 'personal-5', // 중복되지 않는 ID
  type: 'personal', // 'personal' | 'team'
  title: '프로젝트 이름',
  status: 'Published', // 'Published' | 'Coming Soon'
  summary: '한 줄 소개',
  description: '목적과 주요 동작에 대한 설명',
  techStack: ['React', 'TypeScript'],
  responsibilities: ['직접 담당한 역할'],
  highlights: ['구현 내용과 기술적 선택'],
  // githubUrl, demoUrl, thumbnail은 선택 항목
},
```

필터 개수와 상세 모달은 데이터에 따라 자동 반영됩니다. `githubUrl`·`demoUrl`이 있는 프로젝트만 해당 링크를 표시합니다. 준비 중인 프로젝트에는 미구현 기능이나 성과를 기재하지 않습니다.

## GitHub Pages 배포

1. GitHub 저장소를 만들고 이 프로젝트의 `main` 브랜치를 push합니다.
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
3. **Actions → Deploy portfolio to GitHub Pages**에서 실행 결과를 확인합니다. 이후 `main` push 시 자동 배포되며 수동 실행도 가능합니다.
4. 배포가 성공하면 Pages 설정 또는 Actions의 배포 결과에서 실제 사이트 주소를 확인합니다.

워크플로는 Node.js 22에서 `npm ci`와 `npm run build`를 실행하고 `dist/`를 배포합니다. Vite의 `base: './'`와 해시 기반 섹션 이동으로 저장소 하위 경로를 지원합니다. 다른 정적 호스팅에도 `dist/`를 게시할 수 있습니다.

## 메타데이터와 자산

- `index.html`: 제목, 설명, Open Graph 메타데이터
- `public/favicon.svg`: 교체 가능한 기본 아이콘
- `public/og-placeholder.svg`: 미리보기용 OG 이미지

공개 사이트 주소가 정해지면 `og:url`을 추가하고 `og:image`를 실제 PNG/JPG 이미지의 절대 URL로 바꿉니다. 현재 SVG는 placeholder이며 소셜 서비스별 미리보기 호환성을 보장하지 않습니다.

폰트는 Google Fonts의 Noto Sans KR을 사용하며, 로드되지 않으면 시스템 sans-serif로 대체됩니다.

## 연락처

- Email: [heosb316@gmail.com](mailto:heosb316@gmail.com)
- GitHub: [HeoSeongbin](https://github.com/HeoSeongbin)

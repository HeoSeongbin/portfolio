# 허성빈 개발자 포트폴리오

신규 웹 시스템 구축, 기존 시스템 고도화, 데이터 연동 및 운영 장애 대응 경험을 담은 정적 포트폴리오입니다. 제공된 경력만 사용하고 공개 개인 프로젝트인 Architecture Diagram Editor를 수록하고, 나머지 개인·팀 프로젝트는 Coming Soon 상태로 준비했습니다.

## 기술 스택

React · TypeScript · Vite · CSS. 외부 서버 없이 동작하며 UI 라이브러리를 사용하지 않습니다.

## 로컬 실행 및 빌드

```bash
npm install
npm run dev
npm run build
npm run preview
```

빌드는 TypeScript 검사 후 `dist/`를 생성합니다. Node.js 22 이상을 권장합니다.

## 프로젝트 구조

```text
src/
  components/Section.tsx
  sections/Projects.tsx
  hooks/useActiveSection.ts
  data/profile.ts
  data/experiences.ts
  data/projects.ts
  data/troubleshooting.ts
  data/skills.ts
  types/index.ts
  App.tsx
  main.tsx
  styles.css
public/
  favicon.svg
  og-placeholder.svg
```

## 데이터 수정

- `profile.ts`: 이름, 소개, 회사, 기간, 근무 상태(employmentStatus), 경력 표기(careerLabel), email / github / resume / blog. 빈 외부 링크는 Hero에서 숨겨지고 Contact에서는 준비 중으로 표시됩니다. Blog는 값 입력 시 표시됩니다.
- `experiences.ts`: 경력 목록, 역할, 주요 내용, 기술 및 선택적인 작업 흐름.
- `troubleshooting.ts`: 문제 해결 사례의 단계별 기록.
- `skills.ts`: 기술 카테고리와 실제 사용 맥락.
- `projects.ts`: 개인·팀 프로젝트 목록. 빈 프로젝트에는 실제 경험이나 성과를 기재하지 않았습니다.

새 프로젝트는 `projects` 배열에 다음과 같이 추가합니다. 기존 초기 항목을 교체해도 됩니다.

```ts
projects.push({
  id: 'my-project',
  type: 'personal', // 또는 'team'
  title: '실제 프로젝트 이름',
  status: 'Published', // 준비 중이면 'Coming Soon'
  summary: '한 줄 소개',
  description: '상세 설명',
  techStack: ['React', 'TypeScript'],
  responsibilities: ['실제 담당 역할'],
  highlights: ['확인 가능한 주요 내용'],
  githubUrl: 'https://github.com/사용자/저장소',
  demoUrl: 'https://실제-데모-주소',
  // thumbnail: '이미지 주소',
});
```

필터, 상세 모달, GitHub / Demo 링크는 데이터에 따라 자동으로 반영됩니다. 모달은 Escape로 닫을 수 있고 기본 dialog의 포커스 제어를 사용합니다.

## GitHub Pages 배포

1. GitHub 저장소를 생성하고 로컬 저장소의 main 브랜치를 push합니다.
2. GitHub 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
3. main push 또는 Actions의 수동 실행으로 `.github/workflows/deploy.yml`이 빌드 및 배포합니다.

Vite `base: './'`로 저장소 하위 경로에서도 빌드 자산을 참조합니다. 클라이언트 라우터 없이 해시 기반 섹션 이동을 사용합니다. 다른 정적 호스팅에는 `dist/`를 업로드하세요. 배포 워크플로는 저장소가 GitHub에 연결되고 Pages가 활성화된 이후 동작합니다.

## SEO 및 자산

`index.html`에서 제목, description, Open Graph를 수정합니다. favicon과 OG 이미지는 `public/`의 placeholder를 교체하세요. 소셜 미리보기의 호환성을 위해 실제 OG 이미지를 PNG/JPG로 교체하고 배포 후 `og:image`에 절대 URL, `og:url`에 사이트 주소를 설정하세요. 현재 placeholder SVG는 레이아웃 확인용입니다.

폰트는 Google Fonts의 Noto Sans KR을 사용하고 네트워크가 없으면 시스템 sans-serif로 대체됩니다. 애니메이션을 최소화하고 reduced-motion, 키보드 포커스, 모바일 메뉴 및 의미 있는 HTML을 적용했습니다.

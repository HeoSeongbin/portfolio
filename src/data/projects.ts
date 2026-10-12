import type { Project } from '../types';
export const projects: Project[] = [
  {
    id: 'personal-1',
    type: 'personal',
    title: 'Architecture Diagram Editor',
    status: 'Published',
    summary: '서버 없이 아키텍처를 그리고, URL 하나로 저장·공유하는 웹 편집기',
    description: '시스템 구성 요소를 캔버스에 배치하고 연결해 아키텍처 다이어그램을 만드는 개인 프로젝트입니다. 별도 백엔드나 데이터베이스 없이 그래프 상태를 압축해 URL hash에 저장하고, 공유 URL에서 다이어그램을 복원합니다. JSON 파일로 편집 데이터를 백업하고 PNG 이미지로 내보낼 수 있습니다.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Flow', 'Zustand', 'pako', 'ELK.js', 'html-to-image'],
    responsibilities: [],
    highlights: [
      'React Flow 기반 드래그 앤 드롭 노드 배치, 연결 및 Inspector 속성 편집',
      '짧은 키의 저장 구조와 DEFLATE·URL-safe Base64 인코딩으로 그래프 상태 저장 및 복원',
      '400ms debounce와 history.replaceState로 변경 내용을 URL에 동기화',
      'Zustand 기반 Undo / Redo 히스토리 및 키보드 단축키',
      'ELK.js 자동 배치와 실패 시 대체 레이아웃 처리',
      '그룹 노드, 연결 방향 및 라벨 표시 방식 편집',
      'JSON import / export 및 PNG 이미지 export',
    ],
    githubUrl: 'https://github.com/HeoSeongbin/Architecture-',
    demoUrl: 'https://heoseongbin.github.io/Architecture-/',
  },
  ...([{ type: 'personal', number: 2 }, { type: 'team', number: 1 }, { type: 'team', number: 2 }] as const).map(({ type, number }) => ({
    id: `${type}-${number}`, type, title: `${type === 'personal' ? 'Personal' : 'Team'} Project 0${number}`,
    status: 'Coming Soon' as const, summary: '', description: '', techStack: [], responsibilities: [], highlights: [],
  })),
];

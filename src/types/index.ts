export type ProjectType = 'personal' | 'team';
export interface Project { id: string; type: ProjectType; title: string; status: 'Coming Soon' | 'Published'; summary: string; description: string; techStack: string[]; responsibilities: string[]; highlights: string[]; githubUrl?: string; demoUrl?: string; thumbnail?: string; }
export interface Experience { id: string; title: string; category: string; summary: string; roles: string[]; techStack: string[]; details: string[]; architecture?: string[]; }
export interface Troubleshooting { title: string; summary: string; steps: { label: string; text: string }[]; }

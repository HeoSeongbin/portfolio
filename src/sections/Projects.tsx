import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import type { Project, ProjectType } from '../types';
import { projects } from '../data/projects';
import Section from '../components/Section';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | ProjectType>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const slider = useRef<SwiperInstance | null>(null);
  const pointerCard = useRef<{ index: number; wasActive: boolean } | null>(null);
  const visible = projects.filter(p => filter === 'all' || p.type === filter);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const open = (project: Project) => {
    setSelected(project);
    dialog.current?.showModal();
  };

  return <Section id="projects" number="03" title="직접 만들고, 구현한 프로젝트" description="개인 프로젝트와 팀 프로젝트의 구현 내용과 기술적 선택을 기록합니다.">
    <div className="filters" role="group" aria-label="프로젝트 유형 필터">
      {(['all', 'personal', 'team'] as const).map(type => <button key={type} aria-pressed={filter === type} onClick={() => { setActiveIndex(0); setFilter(type); }}>
        {type === 'all' ? 'All' : type === 'personal' ? 'Personal' : 'Team'}
        <span>{type === 'all' ? projects.length : projects.filter(p => p.type === type).length}</span>
      </button>)}
    </div>
    <div className="project-showcase" role="region" aria-roledescription="캐러셀" aria-label="프로젝트 둘러보기"
      onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); slider.current?.slideNext(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); slider.current?.slidePrev(); }
      }}>
      <Swiper key={filter} modules={[EffectCoverflow, A11y]} effect="coverflow" centeredSlides slidesPerView="auto"
        initialSlide={0} spaceBetween={28} grabCursor={visible.length > 1} speed={reducedMotion ? 0 : 420}
        coverflowEffect={{ rotate: reducedMotion ? 0 : 38, stretch: 0, depth: reducedMotion ? 0 : 130, modifier: 1, slideShadows: false }}
        a11y={{ scrollOnFocus: false, containerRoleDescriptionMessage: '프로젝트 슬라이더', itemRoleDescriptionMessage: '프로젝트', slideLabelMessage: '{{index}} / {{slidesLength}}' }}
        onSwiper={instance => { slider.current = instance; setActiveIndex(instance.activeIndex); }}
        onSlideChange={instance => setActiveIndex(instance.activeIndex)} className="project-coverflow">
        {visible.map((project, index) => <SwiperSlide key={project.id}
            onPointerDown={() => { pointerCard.current = { index, wasActive: slider.current?.activeIndex === index }; }}
            onClick={event => {
              const pointer = pointerCard.current;
              pointerCard.current = null;
              if (!slider.current?.allowClick) return;
              const clickedSideCard = event.detail > 0 && pointer?.index === index && !pointer.wasActive;
              if (clickedSideCard || slider.current.activeIndex !== index) slider.current.slideTo(index);
              else open(project);
            }}>
          <button className={`project-card project-card-${project.id}`} aria-label={`${project.title} 상세 보기`}
            onFocus={event => {
              if (event.currentTarget.matches(':focus-visible') && slider.current?.activeIndex !== index) slider.current?.slideTo(index);
            }}>
            <div className="project-preview">
              {project.thumbnail ? <img src={project.thumbnail} alt="" /> : <div className="project-art" aria-hidden="true">
                <span className="art-caption">{project.type === 'personal' ? 'PERSONAL WORK' : 'TEAM WORK'}</span>
                <span className="art-symbol">{project.type === 'personal' ? '</>' : '{ }'}</span>
                <span className="art-index">{String(index + 1).padStart(2, '0')}</span>
              </div>}
              <span className="status">{project.status}</span>
            </div>
            <div className="project-info">
              <span className="eyebrow">{project.type === 'personal' ? 'PERSONAL PROJECT' : 'TEAM PROJECT'}</span>
              <h3>{project.title}<span aria-hidden="true">↗</span></h3>
              <p className="project-summary">{project.summary || '새로운 프로젝트를 준비하고 있습니다.'}</p>
              <div className="project-stack">{project.techStack.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}{project.techStack.length > 4 && <span>+{project.techStack.length - 4}</span>}</div>
              <span className="project-detail-hint">프로젝트 상세 보기 <span aria-hidden="true">→</span></span>
            </div>
          </button>
        </SwiperSlide>)}
      </Swiper>
      <div className="carousel-controls">
        <button className="carousel-arrow" aria-label="이전 프로젝트" disabled={activeIndex === 0} onClick={() => slider.current?.slidePrev()}>←</button>
        <div className="carousel-dots" role="group" aria-label="프로젝트 선택">{visible.map((p, index) => <button key={p.id} aria-label={`${index + 1}. ${p.title}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => slider.current?.slideTo(index)} />)}</div>
        <button className="carousel-arrow" aria-label="다음 프로젝트" disabled={activeIndex === visible.length - 1} onClick={() => slider.current?.slideNext()}>→</button>
      </div>
      <p className="carousel-caption" aria-live="polite" aria-atomic="true">{String(activeIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')} · {visible[activeIndex]?.title}</p>
    </div>
    <dialog ref={dialog} aria-labelledby="project-dialog-title" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="modal-content">
        <button className="close" aria-label="프로젝트 상세 닫기" onClick={() => dialog.current?.close()}>×</button>
        {selected && <>
          <span className="eyebrow">{selected.status}</span><h2 id="project-dialog-title">{selected.title}</h2>
          <p>{selected.description || '프로젝트 내용을 준비 중입니다.'}</p>
          {selected.techStack.length > 0 && <p>{selected.techStack.join(' · ')}</p>}
          {selected.responsibilities.length > 0 && <><h3>담당 역할</h3><ul>{selected.responsibilities.map(t => <li key={t}>{t}</li>)}</ul></>}
          {selected.highlights.length > 0 && <><h3>주요 내용</h3><ul>{selected.highlights.map(t => <li key={t}>{t}</li>)}</ul></>}
          {selected.githubUrl && <a className="button" href={selected.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
          {selected.demoUrl && <a className="button" href={selected.demoUrl} target="_blank" rel="noreferrer">Demo ↗</a>}
        </>}
      </div>
    </dialog>
  </Section>;
}

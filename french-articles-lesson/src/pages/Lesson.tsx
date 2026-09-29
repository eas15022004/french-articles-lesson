import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Flag, Languages, Menu, PanelLeftClose } from 'lucide-react';
import { lesson } from '../data/lesson';
import { Progress } from '../components/Progress';
import { ExerciseCard } from '../components/Exercise';
import { TeacherPanel } from '../components/TeacherPanel';

const STORAGE='french-articles-progress-v1';
export default function Lesson(){
 const [active,setActive]=useState(0); const [completed,setCompleted]=useState<Set<string>>(new Set()); const [teacher,setTeacher]=useState(false); const [sidebar,setSidebar]=useState(true);
 useEffect(()=>{try{const raw=localStorage.getItem(STORAGE); if(raw){const d=JSON.parse(raw);setActive(d.active||0);setCompleted(new Set(d.completed||[]))}}catch{}},[]);
 useEffect(()=>localStorage.setItem(STORAGE,JSON.stringify({active,completed:[...completed]})),[active,completed]);
 const section=lesson.sections[active]; const done=()=>setCompleted(prev=>new Set(prev).add(section.id));
 const next=()=>setActive(i=>Math.min(lesson.sections.length-1,i+1)); const prev=()=>setActive(i=>Math.max(0,i-1));
 const progressLabel=useMemo(()=>`${active+1} из ${lesson.sections.length}`, [active]);
 return <div className="app-shell">
  <header className="topbar"><div className="brand"><div className="brand-mark"><Languages size={19}/></div><div><b>Atelier Français</b><span>interactive lesson</span></div></div><button className="menu-btn" onClick={()=>setSidebar(v=>!v)}>{sidebar?<PanelLeftClose/>:<Menu/>}</button><div className="top-progress"><span>{progressLabel}</span><Progress sections={lesson.sections} active={active} completed={completed} onSelect={setActive}/></div></header>
  <div className="layout">
   {sidebar&&<aside className="sidebar"><div className="side-title">План занятия</div>{lesson.sections.map((s,i)=><button key={s.id} className={`side-item ${i===active?'active':''}`} onClick={()=>setActive(i)}><span className="side-num">{completed.has(s.id)?'✓':String(i+1).padStart(2,'0')}</span><span><small>{s.label}</small><b>{s.title}</b></span></button>)}</aside>}
   <main className="main"><TeacherPanel teacher={teacher} setTeacher={setTeacher} onReset={()=>{localStorage.removeItem(STORAGE);setCompleted(new Set());setActive(0)}}/>
    <div className="lesson-head"><div className="kicker"><BookOpen size={16}/>{section.label}</div><h1>{section.title}</h1>{section.subtitle&&<p>{section.subtitle}</p>}</div>
    {section.type==='start'&&<Start onStart={next}/>} {section.type==='summary'&&<Summary/>}
    {section.exercises?.map(ex=><ExerciseCard key={ex.id} exercise={ex} teacher={teacher} onDone={()=>{done();}}/>)}
    <div className="bottom-nav"><button className="ghost" onClick={prev} disabled={active===0}><ChevronLeft size={17}/>Назад</button><div className="step-caption">{active===lesson.sections.length-1?<><Flag size={15}/>Финиш</>:`Шаг ${active+1} / ${lesson.sections.length}`}</div><button className="primary" onClick={next} disabled={active===lesson.sections.length-1}>Дальше<ChevronRight size={17}/></button></div>
   </main>
  </div>
 </div>
}
function Start({onStart}:{onStart:()=>void}){return <div className="intro-card"><div className="intro-icon"><Languages size={28}/></div><div><span className="eyebrow">Цель занятия</span><h2>{lesson.goal}</h2><div className="goal-chips"><span>vocabulaire</span><span>articles</span><span>reading</span></div></div><button className="primary big" onClick={onStart}>Начать занятие <ChevronRight/></button></div>}
function Summary(){return <div className="summary-card"><div className="rule"><div><span>НЕОПРЕДЕЛЁННЫЙ</span><b>un · une · des</b></div><p>новый / какой-то / несколько</p></div><div className="arrow">→</div><div className="rule"><div><span>ОПРЕДЕЛЁННЫЙ</span><b>le · la · l’ · les</b></div><p>конкретный / уже известный</p></div><div className="summary-tip">Главный вопрос: <b>собеседник уже понимает, о каком предмете речь?</b></div></div>}

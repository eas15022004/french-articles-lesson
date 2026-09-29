import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowRight, Check, Eye, GripVertical, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';
import type { Exercise } from '../data/lesson';
import { Feedback, Hint } from './Feedback';

interface Props { exercise:Exercise; teacher:boolean; onDone:()=>void }
export function ExerciseCard({exercise,teacher,onDone}:Props){
  const [answer,setAnswer]=useState(''); const [selected,setSelected]=useState(''); const [checked,setChecked]=useState(false); const [tries,setTries]=useState(0); const [hintLevel,setHintLevel]=useState(0); const [showSolution,setShowSolution]=useState(false); const [placements,setPlacements]=useState<Record<string,string>>({});
  const correct = useMemo(()=>{
    if(exercise.type==='choice') return selected===exercise.answer;
    if(exercise.type==='input') return answer.trim().toLowerCase().replace(/\s+/g,' ')===exercise.answer.toLowerCase();
    if(exercise.type==='find') return answer.trim().toLowerCase()===exercise.target.toLowerCase();
    if(exercise.type==='match') return exercise.pairs.every(p=>placements[p.left]===p.right);
    return exercise.items.every(item=>placements[item]===exercise.solution[item]);
  },[answer,selected,placements,exercise]);
  const check=()=>{setChecked(true); if(correct) onDone(); else setTries(t=>t+1)};
  const nextHint=()=>setHintLevel(l=>Math.min(l+1,exercise.hints.length));
  const reset=()=>{setAnswer('');setSelected('');setChecked(false);setTries(0);setHintLevel(0);setShowSolution(false);setPlacements({})};
  return <article className="exercise-card">
    <div className="exercise-head"><span className="eyebrow">{exercise.title}</span><span className="exercise-status">{checked&&correct?<Check size={15}/>:'•'}</span></div>
    <h3>{exercise.prompt}</h3>
    {exercise.type==='choice' && <div className="options">{exercise.options.map(o=><button key={o} className={`option ${selected===o?'selected':''} ${checked&&selected===o?(correct?'correct':'wrong'):''}`} onClick={()=>{setSelected(o);setChecked(false)}}>{o}</button>)}</div>}
    {exercise.type==='input' && <input className="answer-input" value={answer} onChange={e=>{setAnswer(e.target.value);setChecked(false)}} placeholder="Введите ответ…" onKeyDown={e=>e.key==='Enter'&&check()} />}
    {exercise.type==='find' && <><div className="reading-text">{exercise.sentence}</div><input className="answer-input" value={answer} onChange={e=>{setAnswer(e.target.value);setChecked(false)}} placeholder="Например: le, l’…" /></>}
    {exercise.type==='match' && <MatchExercise pairs={exercise.pairs} placements={placements} setPlacements={setPlacements} checked={checked}/>} 
    {exercise.type==='sort' && <SortExercise exercise={exercise} placements={placements} setPlacements={setPlacements} checked={checked}/>} 
    {checked && <Feedback correct={correct}>{correct?<><b>Отлично.</b> {exercise.explanation}</>:<><b>Почти.</b> Попробуй ещё раз. {tries>=2&&exercise.explanation}</>}</Feedback>}
    {hintLevel>0 && exercise.hints.slice(0,hintLevel).map((h,i)=><Hint key={h} text={h} index={i}/>)}
    <div className="exercise-actions"><button className="ghost" onClick={nextHint} disabled={hintLevel>=exercise.hints.length}><Sparkles size={16}/>Подсказка</button>{teacher&&<button className="ghost" onClick={()=>setShowSolution(v=>!v)}><Eye size={16}/>{showSolution?'Скрыть решение':'Показать решение'}</button>}{teacher&&<button className="ghost"><MessageCircle size={16}/>Обсудить</button>}<button className="primary" onClick={correct?onDone:check} disabled={exercise.type==='choice'&&!selected || exercise.type==='input'&&!answer.trim() || exercise.type==='find'&&!answer.trim()}>{correct?'Следующий шаг':'Проверить'}<ArrowRight size={17}/></button></div>
    {showSolution&&<div className="teacher-note"><b>Решение для преподавателя:</b> {exercise.type==='sort'?exercise.items.map(x=>`${x} → ${exercise.solution[x]}`).join(' · '):exercise.type==='match'?exercise.pairs.map(p=>`${p.left} = ${p.right}`).join(' · '):exercise.type==='find'?exercise.target:exercise.answer}</div>}
    {checked&&!correct&&<button className="reset" onClick={reset}><RotateCcw size={14}/>Сбросить попытку</button>}
  </article>
}
function MatchExercise({pairs,placements,setPlacements,checked}:{pairs:{left:string;right:string}[];placements:Record<string,string>;setPlacements:Dispatch<SetStateAction<Record<string,string>>>;checked:boolean}){
 const [drag,setDrag]=useState(''); const rights=pairs.map(p=>p.right);
 return <div className="match-grid"><div>{pairs.map(p=><div className="match-left" key={p.left}>{p.left}</div>)}</div><div>{pairs.map(p=><select key={p.left} disabled={checked} value={placements[p.left]||''} onChange={e=>setPlacements(x=>({...x,[p.left]:e.target.value}))}><option value="">Выбери смысл…</option>{rights.map(r=><option key={r} value={r}>{r}</option>)}</select>)}</div></div>
}
function SortExercise({exercise,placements,setPlacements,checked}:{exercise:Extract<Exercise,{type:'sort'}>;placements:Record<string,string>;setPlacements:Dispatch<SetStateAction<Record<string,string>>>;checked:boolean}){
 return <div><div className="sort-items">{exercise.items.map(item=><div key={item} className="sort-item"><GripVertical size={16}/><b>{item}</b><select disabled={checked} value={placements[item]||''} onChange={e=>setPlacements(x=>({...x,[item]:e.target.value}))}><option value="">Корзина…</option>{exercise.groups.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}</select></div>)}</div><div className="group-help">{exercise.groups.map(g=><div key={g.id}><b>{g.label}</b><span>{g.description}</span></div>)}</div></div>
}

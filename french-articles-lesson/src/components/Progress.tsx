import { Check } from 'lucide-react';
interface Props { sections: {id:string;label:string}[]; active:number; completed:Set<string>; onSelect:(i:number)=>void }
export function Progress({sections,active,completed,onSelect}:Props){
  const pct=Math.round(((active + (completed.has(sections[active]?.id)?1:0))/sections.length)*100);
  return <div className="progress-wrap"><div className="progress-top"><span>Занятие · {sections[active]?.label}</span><strong>{pct}%</strong></div><div className="progress-track"><div className="progress-fill" style={{width:`${Math.min(100,pct)}%`}}/></div><div className="section-dots">{sections.map((s,i)=><button key={s.id} className={`section-dot ${i===active?'active':''} ${completed.has(s.id)?'done':''}`} onClick={()=>onSelect(i)} aria-label={s.label}>{completed.has(s.id)?<Check size={13}/>:i+1}</button>)}</div></div>
}

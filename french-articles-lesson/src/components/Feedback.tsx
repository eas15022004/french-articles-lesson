import { CheckCircle2, Lightbulb, XCircle } from 'lucide-react';
export function Feedback({correct,children}:{correct:boolean;children:React.ReactNode}){return <div className={`feedback ${correct?'success':'error'}`}>{correct?<CheckCircle2/>:<XCircle/>}<div>{children}</div></div>}
export function Hint({text,index}:{text:string;index:number}){return <div className="hint"><Lightbulb size={16}/><span><b>Подсказка {index + 1}.</b> {text}</span></div>}

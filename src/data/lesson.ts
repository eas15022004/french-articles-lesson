export type Article = 'un' | 'une' | 'des' | 'le' | 'la' | "l'" | 'les';

export type Exercise =
  | { id:string; type:'choice'; title:string; prompt:string; options:string[]; answer:string; explanation:string; hints:string[] }
  | { id:string; type:'input'; title:string; prompt:string; answer:string; explanation:string; hints:string[] }
  | { id:string; type:'sort'; title:string; prompt:string; items:string[]; groups:{id:string;label:string;description:string}[]; solution:Record<string,string>; explanation:string; hints:string[] }
  | { id:string; type:'match'; title:string; prompt:string; pairs:{left:string;right:string}[]; explanation:string; hints:string[] }
  | { id:string; type:'find'; title:string; prompt:string; sentence:string; target:string; explanation:string; hints:string[] };

export interface Section { id:string; label:string; type:'start'|'warmup'|'explanation'|'practice'|'reading'|'independent'|'challenge'|'summary'|'final'; title:string; subtitle?:string; exercises?:Exercise[] }

export const lesson = {
  title:'Les articles',
  subtitle:'Определённые и неопределённые артикли + базовая лексика',
  goal:'Научиться выбирать un / une / des и le / la / l’ / les в простых фразах и понимать их смысл в контексте.',
  sections: [
    { id:'start', label:'START', type:'start', title:'Bonjour! Сегодня — маленькое, но важное правило', subtitle:'Артикль во французском почти всегда стоит перед существительным.' },
    { id:'warmup', label:'WARM-UP', type:'warmup', title:'Что уже знакомо?', subtitle:'Не ищи идеальный ответ — просто активируй французский.', exercises:[
      {id:'w1',type:'choice',title:'Быстрый разогрев',prompt:'Что означает слово «livre»?',options:['книга','город','работа','вода'],answer:'книга',explanation:'livre — книга. Сегодня это слово ещё пригодится.',hints:['Вспомни знакомые французские слова.']},
      {id:'w2',type:'choice',title:'Род существительного',prompt:'Какого рода «maison»?',options:['мужского','женского'],answer:'женского',explanation:'une maison — дом. Слово maison — женского рода.',hints:['Попробуй вспомнить: une maison.']}
    ]},
    { id:'explain', label:'EXPLANATION', type:'explanation', title:'Две идеи вместо семи правил', subtitle:'Сначала различаем: «какой-то / несколько» и «конкретный / известный».', exercises:[
      {id:'e1',type:'choice',title:'Идея №1',prompt:'Ты говоришь о предмете впервые: «У меня есть ___ книга». Что подходит?',options:['un livre','le livre'],answer:'un livre',explanation:'un = один / какой-то предмет, о котором говорим впервые.',hints:['Представь: собеседник ещё не знает, о какой книге речь.']},
      {id:'e2',type:'choice',title:'Идея №2',prompt:'«Где книга?» — «___ livre est sur la table.» О какой книге речь?',options:['Un','Le'],answer:'Le',explanation:'le = конкретный, уже известный предмет: та самая книга.',hints:['Предмет уже упоминался.']},
      {id:'e3',type:'choice',title:'Формы',prompt:'Выбери правильный набор неопределённых артиклей.',options:['un / une / des','le / la / les'],answer:'un / une / des',explanation:'Неопределённые: un (м.р.), une (ж.р.), des (мн.ч.).',hints:['«Какой-то» — не «тот самый».']}
    ]},
    { id:'example', label:'EXAMPLE', type:'practice', title:'Разберём мини-диалог', subtitle:'Нажимай на каждый шаг — не спеши смотреть всё сразу.', exercises:[
      {id:'ex1',type:'match',title:'Собери смысл',prompt:'Сопоставь фразу и её смысл.',pairs:[{left:'J’ai un café.',right:'У меня есть какой-то кофе / один кофе.'},{left:'Le café est chaud.',right:'Этот кофе горячий.'},{left:'J’ai une amie.',right:'У меня есть подруга.'}],explanation:'Сначала предмет вводится как новый: un / une. Потом, когда предмет уже понятен, появляется le / la.',hints:['Смотри не только на артикль, но и на ситуацию.']}
    ]},
    { id:'practice', label:'PRACTICE', type:'practice', title:'Теперь ты', subtitle:'Сначала выбор, затем ввод — уровень постепенно растёт.', exercises:[
      {id:'p1',type:'choice',title:'1 / 4',prompt:'Je cherche ___ appartement.',options:['un','le'],answer:'un',explanation:'Ты ищешь какой-то вариант квартиры, не конкретную уже известную квартиру.',hints:['Предмет вводится в разговор впервые.']},
      {id:'p2',type:'choice',title:'2 / 4',prompt:'J’ai ___ voiture. ___ voiture est rouge.',options:['une / La','la / Une','une / Une','la / La'],answer:'une / La',explanation:'Сначала une voiture — новая информация. Во второй фразе это уже конкретная машина: la voiture.',hints:['Один и тот же предмет появляется второй раз.','Первая фраза вводит предмет, вторая — возвращается к нему.']},
      {id:'p3',type:'input',title:'3 / 4',prompt:'Complète : «J’ai ___ livre.» Введи только артикль.',answer:'un',explanation:'livre — мужской род, предмет вводится впервые → un.',hints:['livre — мужской род.','Неопределённый + мужской род → ?']},
      {id:'p4',type:'sort',title:'4 / 4',prompt:'Разложи артикли по двум корзинам.',items:['un','une','des','le','la','l’','les'],groups:[{id:'indef',label:'Неопределённые',description:'какой-то / один / несколько'},{id:'def',label:'Определённые',description:'конкретный / уже известный'}],solution:{un:'indef',une:'indef',des:'indef',le:'def',la:'def','l’':'def',les:'def'},explanation:'Неопределённые: un, une, des. Определённые: le, la, l’, les.',hints:['В одной группе будет ровно три формы.','des = несколько, но не конкретные; l’ появляется перед гласной.']}
    ]},
    { id:'reading', label:'READING', type:'reading', title:'Читаем короткий цельный текст', subtitle:'Не нужно понимать каждое слово. Сначала пойми общую ситуацию.', exercises:[
      {id:'r1',type:'find',title:'Текст',prompt:'Прочитай и найди все определённые артикли.',sentence:'J’ai un petit appartement à Paris. L’appartement est calme. J’ai une cuisine et un balcon. La cuisine est petite, mais le balcon est grand. Les voisins sont sympathiques.',target:'l’appartement, La, le, Les',explanation:'В первом предложении appartement вводится как новый → un. Дальше говорим уже об этом конкретном appartement → L’appartement. То же с cuisine и balcon. Les voisins — конкретная группа соседей.',hints:['Ищи формы le / la / l’ / les.','Не выбирай un / une / des — нас сейчас интересуют только определённые.']},
      {id:'r2',type:'choice',title:'Проверка понимания',prompt:'Почему во фразе «Le balcon est grand» стоит le?',options:['Балкон уже известен из предыдущего предложения','Во французском перед всеми существительными ставится le','Balcon — слово женского рода'],answer:'Балкон уже известен из предыдущего предложения',explanation:'Он уже был введён как un balcon, поэтому дальше становится le balcon.',hints:['Посмотри на предыдущее предложение.']}
    ]},
    { id:'independent', label:'INDEPENDENT', type:'independent', title:'Самостоятельная серия', subtitle:'Теперь попробуй без пошагового сопровождения.', exercises:[
      {id:'i1',type:'input',title:'1 / 3',prompt:'___ étudiant cherche ___ travail. Введи два артикля через пробел.',answer:'un un',explanation:'«Какой-то студент» → un étudiant; «какую-то работу» → un travail.',hints:['Оба существительных мужского рода.','Оба предмета вводятся впервые.']},
      {id:'i2',type:'input',title:'2 / 3',prompt:'J’ai ___ amie. ___ amie habite à Lyon. Введи два артикля через пробел.',answer:"une l'",explanation:'Сначала мы вводим подругу как новую: une amie. Во второй фразе речь уже об этой конкретной подруге, поэтому определённый артикль перед гласной сокращается: l’amie.',hints:['Первый пропуск — неопределённый артикль.','Во второй фразе предмет уже известен, а amie начинается с гласной.']},
      {id:'i3',type:'choice',title:'3 / 3',prompt:'Какой вариант естественнее: «J’ai des amis. ___ amis habitent à Nice.»',options:['Les','Des'],answer:'Les',explanation:'Сначала des amis — несколько друзей. Затем речь о конкретной группе, поэтому les amis.',hints:['Группа уже известна из первой фразы.']}
    ]},
    { id:'challenge', label:'CHALLENGE', type:'challenge', title:'Исправь мини-диалог', subtitle:'Здесь уже нельзя опираться только на одно правило.', exercises:[
      {id:'c1',type:'input',title:'Найди ошибку',prompt:'«J’ai le chien. Le chien est petit.» Контекст: собеседник впервые слышит о собаке. Исправь первый артикль.',answer:'un',explanation:'Если собеседник впервые узнаёт о собаке, естественно ввести её как un chien. Затем: Le chien est petit.',hints:['Первое упоминание или уже известный предмет?','Сделай первый шаг: замени le на неопределённый артикль.']},
      {id:'c2',type:'choice',title:'Последний выбор',prompt:'Контекст: «Я вижу одну машину. Машина очень старая». Какой вариант?',options:['Je vois une voiture. La voiture est très vieille.','Je vois la voiture. Une voiture est très vieille.'],answer:'Je vois une voiture. La voiture est très vieille.',explanation:'Новая машина → une voiture. Та же конкретная машина → la voiture.',hints:['Первое предложение вводит объект.','Второе предложение возвращается к нему.']}
    ]},
    { id:'summary', label:'SUMMARY', type:'summary', title:'Соберём правило в одну схему', subtitle:'Не зубри таблицу — свяжи форму со смыслом.' },
    { id:'final', label:'FINAL CHECK', type:'final', title:'Финальная проверка', subtitle:'Если здесь получается уверенно — цель занятия достигнута.', exercises:[
      {id:'f1',type:'choice',title:'1 / 4',prompt:'«J’ai ___ chat. ___ chat est noir.»',options:['un / Le','le / Un','un / Un','le / Le'],answer:'un / Le',explanation:'Новый кот → un chat; тот же кот → Le chat.',hints:['Первое и второе упоминание.']},
      {id:'f2',type:'choice',title:'2 / 4',prompt:'Какой артикль подходит к «amis» в значении «несколько друзей»?',options:['des','les','une','un'],answer:'des',explanation:'Множественное число + неопределённые друзья → des amis.',hints:['«Несколько, какие-то» → неопределённый множественный.']},
      {id:'f3',type:'input',title:'3 / 4',prompt:'«___ école est grande.» Контекст: мы уже знаем, о какой школе говорим. Введи артикль.',answer:"l'",explanation:'école начинается с гласной, а определённый артикль перед гласной сокращается: l’école.',hints:['Определённый + гласная.']},
      {id:'f4',type:'choice',title:'4 / 4',prompt:'Что главное различие?',options:['un/une/des вводят неопределённый объект; le/la/l’/les говорят о конкретном или уже известном','un/une/des всегда относятся к людям','le/la/l’/les используются только во множественном числе'],answer:'un/une/des вводят неопределённый объект; le/la/l’/les говорят о конкретном или уже известном',explanation:'Именно смысл ситуации помогает выбрать артикль.',hints:['Сформулируй различие своими словами.']}
    ]}
  ] as Section[]
};

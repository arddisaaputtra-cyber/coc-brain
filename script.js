
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const storeKey="coc_brain_v3";
let state=JSON.parse(localStorage.getItem(storeKey)||'null')||{
 xp:0, streak:0, lastDay:"", minutes:0, scores:{Numerical:20,RPL:20,Memory:20,"Public Speaking":20,Logic:20,Spatial:20},
 used:{Numerical:[],RPL:[],Memory:[],"Public Speaking":[],Logic:[],Spatial:[]}, history:[]
};
function save(){localStorage.setItem(storeKey,JSON.stringify(state))}
function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
function dayName(){return ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"][new Date().getDay()]}
function today(){return new Date().toISOString().slice(0,10)}
function updateStreak(){
 const t=today();
 if(state.lastDay!==t){ const y=new Date(); y.setDate(y.getDate()-1); const yd=y.toISOString().slice(0,10);
   state.streak = state.lastDay===yd ? state.streak+1 : 1; state.lastDay=t; save();
 }
}
updateStreak();

const schedule=[
 ["Senin","🔢","Numerical & Speed Math","Mental math, pola bilangan, persentase, estimasi, hitung cepat."],
 ["Selasa","💻","RPL — Rekayasa Perangkat Lunak","Algoritma, flowchart, coding, HTML, CSS, JavaScript, problem solving."],
 ["Rabu","🧠","Daya Ingat & Memori","Number memory, word memory, visual memory, recall, memory palace."],
 ["Kamis","🗣️","Public Speaking & Bahasa Inggris","Spontaneous speaking, artikulasi, storytelling, vocabulary, English."],
 ["Jumat","🧩","Logika & Spasial","Deduksi, puzzle, mental rotation, visualisasi, problem solving."],
 ["Sabtu","🏆","Simulasi CoC & Evaluasi","Gabungkan kemampuan dengan timer dan evaluasi."],
 ["Minggu","🌿","Review Ringan & Recovery","Review kesalahan minggu ini dan recovery."]
];
const channels=[
 ["Numberphile","Numerical & matematika","https://www.youtube.com/@numberphile"],
 ["3Blue1Brown","Matematika & visual reasoning","https://www.youtube.com/@3blue1brown"],
 ["Khan Academy","Matematika & problem solving","https://www.youtube.com/@khanacademy"],
 ["Kelas Terbuka","RPL / programming","https://www.youtube.com/@KelasTerbuka"],
 ["Web Programming UNPAS","Web development","https://www.youtube.com/@sandhikagalih"],
 ["Nelson Dellis","Memory techniques","https://www.youtube.com/@NelsonDellis"],
 ["Vinh Giang","Public speaking & communication","https://www.youtube.com/@askvinh"],
 ["BBC Learning English","English listening & speaking","https://www.youtube.com/@bbclearningenglish"],
 ["MindYourDecisions","Logic & problem solving","https://www.youtube.com/@MindYourDecisions"],
 ["TED-Ed","Thinking & communication","https://www.youtube.com/@TEDEd"]
];
const websites=[
 ["Brilliant","Numerical, logic, problem solving","https://brilliant.org/"],
 ["Project Euler","Numerical & programming problems","https://projecteuler.net/"],
 ["HackerRank","Programming & problem solving","https://www.hackerrank.com/"],
 ["W3Schools","HTML, CSS, JavaScript","https://www.w3schools.com/"],
 ["MDN Web Docs","Web development reference","https://developer.mozilla.org/"],
 ["Lumosity","Memory & cognitive games","https://www.lumosity.com/"],
 ["Cambridge English","English practice","https://www.cambridgeenglish.org/learning-english/"],
 ["GeoGuessr","Visual/spatial practice","https://www.geoguessr.com/"]
];

function dashboard(){
 $("#dashboard").innerHTML=`
 <div class="eyebrow">COC BRAIN TRAINING</div><h1 class="title">Dashboard Latihan Otak</h1>
 <div class="muted">${dayName()} • ${new Date().toLocaleDateString("id-ID")} • sesi utama pukul 19.00</div>
 <div class="hero"><span class="eyebrow" style="color:#fff">SESI HARI INI</span><h2>${todaySchedule()[2]}</h2><p>${todaySchedule()[3]}</p><button class="btn light" onclick="go('training')">Mulai Latihan →</button><span class="bolt">⚡</span></div>
 <div class="cards">
  <div class="card metric"><div class="label">🔥 Streak</div><div class="value">${state.streak}</div><small>hari</small></div>
  <div class="card metric"><div class="label">⭐ XP</div><div class="value">${state.xp}</div><small>pengalaman</small></div>
  <div class="card metric"><div class="label">🏆 Level</div><div class="value">${Math.min(10,1+Math.floor(state.xp/100))}</div><small>/ 10</small></div>
  <div class="card metric"><div class="label">⏱️ Waktu</div><div class="value">${state.minutes}</div><small>menit</small></div>
 </div>
 <div class="grid2"><div class="section-card"><h3>🎯 Skill Scores</h3>${Object.entries(state.scores).map(([k,v])=>`<div class="skillrow"><div class="skilltop"><span>${icon(k)} ${k}</span><span>${v}/100</span></div><div class="bar"><div class="fill" style="width:${v}%"></div></div></div>`).join("")}</div>
 <div class="section-card"><h3>📅 Minggu Ini</h3><div class="calendar">${["M","S","S","R","K","J","S"].map((d,i)=>`<div class="daydot ${i===new Date().getDay()?"today":""}">${d}<span>${i+1}</span></div>`).join("")}</div><hr><b>${state.history.filter(x=>x.date>=weekStart()).length}/6</b> <span class="muted">sesi tercatat minggu ini</span></div></div>`;
}
function icon(k){return {Numerical:"🔢",RPL:"💻",Memory:"🧠","Public Speaking":"🗣️",Logic:"🧩",Spatial:"📐"}[k]}
function todaySchedule(){const d=dayName();return schedule.find(x=>x[0]===d)||schedule[0]}
function weekStart(){let d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));return d.toISOString().slice(0,10)}

let currentSkill="Numerical", duration=10, timer=null, remaining=600, session=null;
function training(){
 $("#training").innerHTML=`<div class="eyebrow">TRAINING LAB</div><h1 class="title">Latihan Fokus</h1><div class="muted">Setiap skill memiliki bank soal. Satu sesi = 20 soal unik.</div>
 <div class="training-grid"><div class="section-card">
 <h3>Pilih Skill</h3><div class="skill-select">${Object.keys(QUESTION_BANK).map(k=>`<button class="skill-btn ${k===currentSkill?"selected":""}" onclick="selectSkill('${k}')">${icon(k)} ${k}</button>`).join("")}</div>
 <h3>Durasi</h3><div class="durations">${[5,10,20,30].map(n=>`<button class="duration ${n===duration?"selected":""}" onclick="setDuration(${n})">${n}m</button>`).join("")}</div>
 <div class="timer"><div class="kind">${currentSkill.toUpperCase()}</div><div class="clock" id="clock">${fmt(remaining)}</div><div class="timerbar"><div id="timerFill"></div></div><div class="timer-actions"><button class="btn primary" onclick="startTimer()">▶ Mulai</button><button class="btn ghost" onclick="pauseTimer()">Ⅱ Jeda</button><button class="btn danger" onclick="resetTimer()">↻ Reset</button></div></div>
 </div><div class="question-panel" id="quizPanel"></div></div>`;
 renderQuestion();
}
function getSession(skill){
 let bank=QUESTION_BANK[skill], used=new Set(state.used[skill]||[]);
 if(bank.length-used.size<20){used.clear();state.used[skill]=[];save();toast("Bank soal untuk skill ini sudah habis. Siklus baru dimulai.")}
 let available=bank.map((_,i)=>i).filter(i=>!used.has(i));
 for(let i=available.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[available[i],available[j]]=[available[j],available[i]]}
 return available.slice(0,20);
}
function startSession(){session={ids:getSession(currentSkill),pos:0,correct:0,answered:false};renderQuestion()}
function renderQuestion(){
 if(!session) startSession();
 const id=session.ids[session.pos], q=QUESTION_BANK[currentSkill][id];
 const safeOptions=q.options.map((o,i)=>`<button type="button" class="option" data-option-index="${i}">${escapeHtml(o)}</button>`).join("");
 $("#quizPanel").innerHTML=`<div class="q-head"><b>${icon(currentSkill)} ${currentSkill}</b><span class="q-count">Soal ${session.pos+1} / 20</span></div>
 <div class="qtext">${escapeHtml(q.q)}</div><div class="options">${safeOptions}</div>
 <div id="result" class="result"></div><div class="question-actions"><button class="btn ghost" type="button" id="newSessionBtn">🔄 Buat 20 Soal Baru</button><button class="btn primary" type="button" id="nextBtn" disabled>Soal Berikutnya →</button></div>
 <div class="muted" style="margin-top:10px">Bank ${QUESTION_BANK[currentSkill].length} soal • setelah dipilih, jawaban dikunci sampai soal berikutnya.</div>`;
 $$(".option").forEach((btn,i)=>btn.addEventListener("click",()=>answer(q.options[i],i)));
 $("#nextBtn").addEventListener("click",nextQuestion);
 $("#newSessionBtn").addEventListener("click",newSession);
}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));}

function answer(choice,index){
 if(!session || session.answered)return;
 session.answered=true;
 const q=QUESTION_BANK[currentSkill][session.ids[session.pos]];
 const buttons=$$(".option");
 buttons.forEach((b,i)=>{b.disabled=true;b.classList.remove("selected","correct","wrong");if(i===index)b.classList.add("selected");if(q.options[i]===q.answer)b.classList.add("correct");});
 const ok=choice===q.answer;
 if(!ok && buttons[index])buttons[index].classList.add("wrong");
 if(ok){session.correct++;$("#result").textContent="✅ Benar! "+(q.exp||"Bagus, lanjutkan.");$("#result").style.color="#27934d"}
 else{$("#result").textContent="❌ Belum tepat. Jawaban: "+q.answer;$("#result").style.color="#d33"}
 const next=$("#nextBtn");
 next.disabled=false;
 next.focus();
}

function nextQuestion(){
 if(!session.answered)return toast("Jawab soal ini dulu.");
 if(session.pos<19){session.pos++;session.answered=false;renderQuestion()}else finishSession();
}
function finishSession(){
 const score=Math.round(session.correct/20*100);
 state.scores[currentSkill]=Math.max(state.scores[currentSkill],score);
 state.xp+=session.correct*5+20;
 state.minutes+=duration;
 state.used[currentSkill]=[...(state.used[currentSkill]||[]),...session.ids];
 state.history.unshift({date:today(),skill:currentSkill,score,correct:session.correct,total:20});
 state.history=state.history.slice(0,100);save();updateStreak();
 $("#quizPanel").innerHTML=`<div style="text-align:center;padding:35px 10px"><div style="font-size:45px">🏆</div><h2>Sesi selesai!</h2><div class="stat-big">${score}/100</div><p class="muted">${session.correct} benar dari 20 soal.</p><button class="btn primary" onclick="newSession()">Mainkan 20 Soal Baru</button></div>`;
 toast("Sesi selesai • XP bertambah!");
}
function newSession(){session=null;renderQuestion()}
function selectSkill(k){currentSkill=k;session=null;training()}
function setDuration(n){duration=n;remaining=n*60;training()}
function fmt(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function startTimer(){if(timer)return;timer=setInterval(()=>{remaining--;$("#clock").textContent=fmt(remaining);$("#timerFill").style.width=(1-remaining/(duration*60))*100+"%";if(remaining<=0){clearInterval(timer);timer=null;toast("⏰ Waktu habis!");}},1000)}
function pauseTimer(){if(timer){clearInterval(timer);timer=null}}
function resetTimer(){pauseTimer();remaining=duration*60;$("#clock").textContent=fmt(remaining);$("#timerFill").style.width="0%"}
function schedulePage(){
 $("#schedule").innerHTML=`<div class="eyebrow">WEEKLY PLAN</div><h1 class="title">Jadwal Latihan</h1><div class="muted">Sesi utama dimulai pukul 19.00.</div><div class="schedule-grid">${schedule.map(s=>`<div class="schedule-item ${s[0]===dayName()?"today":""}"><span class="time">19.00</span><b>${s[1]} ${s[0]} ${s[0]===dayName()?"• HARI INI":""}</b><h3>${s[2]}</h3><p>${s[3]}</p></div>`).join("")}</div><div class="section-card" style="margin-top:13px"><b>📅 Pengingat Kalender</b><p class="muted">Gunakan tombol di bawah untuk mengunduh jadwal.</p><button class="btn primary" onclick="downloadICS()">Download Jadwal .ics</button></div>`;
}
function hubPage(){$("#hub").innerHTML=`<div class="eyebrow">LEARNING HUB</div><h1 class="title">YouTube & Website Belajar</h1><div class="muted">Pilih sumber belajar sesuai kemampuan yang sedang kamu latih.</div><h3 class="hub-title">▶️ Channel YouTube</h3><div class="hub-grid">${channels.map(c=>`<div class="channel"><div>▶️ <b>${escapeHtml(c[0])}</b><small>${escapeHtml(c[1])}</small></div><a href="${c[2]}" target="_blank" rel="noopener">Buka Channel</a></div>`).join("")}</div><h3 class="hub-title">🌐 Website Latihan</h3><div class="hub-grid">${websites.map(w=>`<div class="channel"><div>🌐 <b>${escapeHtml(w[0])}</b><small>${escapeHtml(w[1])}</small></div><a class="web-link" href="${w[2]}" target="_blank" rel="noopener">Buka Website</a></div>`).join("")}</div>`}
function statsPage(){
 const total=state.history.length, avg=total?Math.round(state.history.reduce((a,x)=>a+x.score,0)/total):0;
 $("#stats").innerHTML=`<div class="eyebrow">PROGRESS</div><h1 class="title">Statistik Perkembangan Otak</h1><div class="cards"><div class="card metric"><div class="label">Sesi</div><div class="value">${total}</div><small>terselesaikan</small></div><div class="card metric"><div class="label">Rata-rata</div><div class="value">${avg}</div><small>/100</small></div><div class="card metric"><div class="label">XP</div><div class="value">${state.xp}</div><small>total</small></div><div class="card metric"><div class="label">Level</div><div class="value">${Math.min(10,1+Math.floor(state.xp/100))}</div><small>/10</small></div></div><div class="section-card" style="margin-top:13px"><h3>📈 Skill</h3>${Object.entries(state.scores).map(([k,v])=>`<div class="skillrow"><div class="skilltop"><span>${icon(k)} ${k}</span><span>${v}/100</span></div><div class="bar"><div class="fill" style="width:${v}%"></div></div></div>`).join("")}</div><div class="section-card history"><h3>📜 Riwayat</h3>${state.history.length?state.history.slice(0,20).map(x=>`<div class="history-row"><span>${x.date} • ${icon(x.skill)} ${x.skill}</span><b>${x.correct}/${x.total} • ${x.score}</b></div>`).join(""):'<div class="empty">Belum ada sesi. Mulai latihan untuk mengisi statistik.</div>'}</div>`;
}
function go(p){$$(".page").forEach(x=>x.classList.remove("active"));$("#"+p).classList.add("active");$$(".sidebar nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===p));({dashboard,training,schedule:schedulePage,hub:hubPage,stats:statsPage}[p])()}
$$(".sidebar nav button").forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
$("#reminderBtn").onclick=()=>{ if("Notification" in window){Notification.requestPermission().then(x=>toast(x==="granted"?"🔔 Pengingat browser diaktifkan":"Izin pengingat belum diberikan"))}else toast("Browser ini tidak mendukung notifikasi.")};
function downloadICS(){const text=`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CoC Brain//ID
BEGIN:VEVENT
DTSTART:20261005T190000
RRULE:FREQ=WEEKLY;BYDAY=MO
SUMMARY:CoC Brain - Numerical
END:VEVENT
BEGIN:VEVENT
DTSTART:20261006T190000
RRULE:FREQ=WEEKLY;BYDAY=TU
SUMMARY:CoC Brain - RPL
END:VEVENT
BEGIN:VEVENT
DTSTART:20261007T190000
RRULE:FREQ=WEEKLY;BYDAY=WE
SUMMARY:CoC Brain - Memory
END:VEVENT
BEGIN:VEVENT
DTSTART:20261008T190000
RRULE:FREQ=WEEKLY;BYDAY=TH
SUMMARY:CoC Brain - Public Speaking & English
END:VEVENT
BEGIN:VEVENT
DTSTART:20261009T190000
RRULE:FREQ=WEEKLY;BYDAY=FR
SUMMARY:CoC Brain - Logic & Spatial
END:VEVENT
END:VCALENDAR`;
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"text/calendar"}));a.download="CoC-Brain-Jadwal.ics";a.click();toast("Jadwal .ics dibuat")}
dashboard();training();schedulePage();hubPage();statsPage();go("dashboard");document.querySelector('[data-page="dashboard"]').classList.add("active");

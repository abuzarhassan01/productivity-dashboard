let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let xp = parseInt(localStorage.getItem("xp")) || 0;

let level = parseInt(localStorage.getItem("level")) || 1;

let filter="all";

let input=document.getElementById("taskInput");


/* ENTER KEY SUPPORT */

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

addTask();

}

});


function saveData(){

localStorage.setItem("tasks",JSON.stringify(tasks));

localStorage.setItem("xp",xp);

localStorage.setItem("level",level);

}


function addTask(){

let text=input.value.trim();

let category=document.getElementById("categoryInput").value;

if(text==="") return;


tasks.push({

id:Date.now(),
text,
category,
completed:false

});


/* CLEAR INPUT AUTOMATICALLY */

input.value="";

/* KEEP CURSOR READY */

input.focus();


saveData();

renderTasks();

}


function deleteTask(id){

tasks=tasks.filter(task=>task.id!==id);

saveData();

renderTasks();

}


function toggleTask(id){

tasks=tasks.map(task=>{

if(task.id===id){

if(!task.completed){

xp+=10;

checkLevelUp();

confetti();

}

task.completed=!task.completed;

}

return task;

});

saveData();

renderTasks();

}


function filterTasks(value){

filter=value;

renderTasks();

}


function renderTasks(){

let list=document.getElementById("taskList");

list.innerHTML="";


let filtered=tasks.filter(task=>{

if(filter==="completed") return task.completed;

if(filter==="pending") return !task.completed;

return true;

});


filtered.forEach(task=>{

let li=document.createElement("li");


li.innerHTML=`

<div class="task-left">

<input type="checkbox"

${task.completed?"checked":""}

onchange="toggleTask(${task.id})">

<span class="${task.completed?"completed":""}">

${task.text} (${task.category})

</span>

</div>

<button onclick="deleteTask(${task.id})">Delete</button>

`;


list.appendChild(li);

});


updateProgress();

updateGamification();

}


function updateProgress(){

let completed=tasks.filter(t=>t.completed).length;

let total=tasks.length;

let percent=total?completed/total*100:0;

document.getElementById("progressFill").style.width=percent+"%";

document.getElementById("progressText").innerText=

`${completed}/${total} Completed`;

}


function updateGamification(){

document.getElementById("xp").innerText=xp;

document.getElementById("level").innerText=level;

document.getElementById("xpBar").style.width=xp+"%";

}


function checkLevelUp(){

if(xp>=100){

level++;

xp=0;

alert("🎉 Level Up! Level "+level);

}

}


/* CONFETTI */

function confetti(){

for(let i=0;i<20;i++){

let div=document.createElement("div");

div.style.position="fixed";

div.style.width="8px";

div.style.height="8px";

div.style.background="gold";

div.style.left=Math.random()*100+"%";

div.style.top="0";

document.body.appendChild(div);

let fall=setInterval(()=>{

div.style.top=parseInt(div.style.top)+5+"px";

if(parseInt(div.style.top)>window.innerHeight){

clearInterval(fall);

div.remove();

}

},20);

}

}


function toggleTheme(){

document.body.classList.toggle("light");

}


renderTasks();

/* focus on start */

input.focus();
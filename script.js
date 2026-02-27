let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let xp = parseInt(localStorage.getItem("xp")) || 0;

let level = parseInt(localStorage.getItem("level")) || 1;

let filter="all";

let input=document.getElementById("taskInput");


input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

addTask();

}

});


function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

localStorage.setItem("xp",xp);

localStorage.setItem("level",level);

}


function addTask(){

let text=input.value.trim();

let category=document.getElementById("categoryInput").value;

if(!text) return;

tasks.push({

id:Date.now(),
text,
category,
completed:false

});

input.value="";

input.focus();

save();

render();

}


function deleteTask(id){

tasks=tasks.filter(t=>t.id!==id);

save();

render();

}


function toggleTask(id){

tasks=tasks.map(task=>{

if(task.id===id){

if(!task.completed){

xp+=10;

if(xp>=100){

level++;

xp=0;

alert("Level Up! "+level);

}

}

task.completed=!task.completed;

}

return task;

});

save();

render();

}


function filterTasks(f){

filter=f;

render();

}


function render(){

let list=document.getElementById("taskList");

list.innerHTML="";

let filtered=tasks.filter(t=>{

if(filter==="completed") return t.completed;

if(filter==="pending") return !t.completed;

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

updateXP();

}


function updateProgress(){

let completed=tasks.filter(t=>t.completed).length;

let total=tasks.length;

let percent=total?completed/total*100:0;

document.getElementById("progressFill").style.width=percent+"%";

document.getElementById("progressText").innerText=

`${completed}/${total} completed`;

}


function updateXP(){

document.getElementById("xp").innerText=xp;

document.getElementById("level").innerText=level;

document.getElementById("xpBar").style.width=xp+"%";

}


function toggleTheme(){

document.body.classList.toggle("light");

}


render();

input.focus();
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progressFill = document.getElementById("progress-fill");


function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
    }
    inputBox.value = "";
    updateProgress(); // Mise à jour de la barre
    saveData();
}



listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        updateProgress(); // Recalcul du pourcentage
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        updateProgress(); 
        saveData();
    }
}, false);


function finishDay() {
    const tasks = listContainer.querySelectorAll("li");
    const hasUnchecked = Array.from(tasks).some(li => !li.classList.contains("checked"));

    tasks.forEach(li => {
        if (hasUnchecked) {
            li.classList.add("checked"); // barre tout
        } else {
            li.classList.remove("checked");
        }
    });

    updateProgress();
    saveData();
}

function updateDate() {
    const now = new Date();
    document.getElementById("day-name").innerText = now.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById("day-num").innerText = now.getDate();
    document.getElementById("month-name").innerText = now.toLocaleDateString('en-US', { month: 'long' });
}


function updateProgress() {
    const allTasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.checked");
    
    let percentage = 0;
    if (allTasks.length > 0) {
        percentage = (completedTasks.length / allTasks.length) * 100;
    }
    
    
    if (progressFill) {
        progressFill.style.width = percentage + "%";
    }
}


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updateProgress();
}

// Lancement au démarrage
updateDate();
showTask();



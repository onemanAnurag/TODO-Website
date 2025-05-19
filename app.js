const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progress = document.getElementById("progress");
const numbers = document.getElementById("numbers");


function addTask(){
  if(inputBox.value===''){
    alert("You must write something!");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li); 
    let img= document.createElement("img");
    img.src= "delete.png";
    li.appendChild(img);
   
  }
  inputBox.value="";
  saveData();
}
  listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
      e.target.classList.toggle("checked");
      
        updateProgress();
        saveData();
    }
    else if(e.target.tagName === "IMG"){
      e.target.parentElement.remove();
      updateProgress();
      saveData();
    }
  },false);
   


function updateProgress() {
  const tasks = listContainer.getElementsByTagName("li");
  const totalTasks = tasks.length;
  const completedTasks = Array.from(tasks).filter(li => li.classList.contains("checked")).length;

  // Update numbers
  numbers.textContent = `${completedTasks} / ${totalTasks}`;

  // Update progress bar width
  let percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progress.style.width = percentage + "%";
  
  if(tasks.length && completedTasks === totalTasks){
    blaskconfetti();
  }
  
}
 
function saveData(){
  localStorage.setItem("data", listContainer.innerHTML)
}
function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
const blaskconfetti = ()=>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
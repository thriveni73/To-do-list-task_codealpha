let todo=JSON.parse(localStorage.getItem("todo"))||[];
const todoInput= document.getElementById("todoInput");
const todoList=document.getElementById("todolist");
const todoCount=document.getElementById("todoCount");
const addButton=document.querySelector(".btn");
const deleteButton=document.getElementById("deleteButton");
//initialize
document.addEventListener("DOMContentLoaded",function(){
    addButton.addEventListener("click",addTask);
    todoInput.addEventListener('keydown',function(event){
        if(event.key ==="Enter"){
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click",deleteAllTasks);
    dispalyTasks();
});
function addTask(){
    const newTask=todoInput.value.trim();
    if(newTask!==""){
        todo.push({
            text:newTask,
            disabled:false,
        });
        saveToLocalStorage();
        todoInput.value="";
        dispalyTasks();
    }

}

function dispalyTasks(){
    todoList.innerHTML="";
    todo.forEach((item,index)=>{
        const p=document.createElement("p");
        p.innerHTML=`
        <div class="todo-container">
        <input type="checkbox" class="todo-checkbox"
        id="input-${index}"${
            item.disabled ? "checked":""
        }>
        <p id="todo-$(index)" class="${item.disabled ? "disabled":""}"
        oncilck="editTask(${index})">${item.text}</p>
        </div> 
        `;
        p.querySelector(".todo-checkbox").addEventListener("change",()=>{
            toggleTask(index);

        });
        todoList.appendChild(p);

    });
    todoCount.textContent=todo.length;

}
function editTask(index){
    const todoItem=document.getElementById(`todo-$(index)`);
    const existingText=todo[index].text;
    const inputElement=document.createElement("input");

    inputElement.value=existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
    inputElement.addEventListener("blur",function(){
        const updatedText=inputElement.value.trim();
        if(updatedText){
            todo[index].text=updatedText;
            saveToLocalStorage();
        }
        dispalyTasks();
    });
}

function toggleTask(index){
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStorage();
    dispalyTasks();
}
function deleteAllTasks(){
    todo=[];
    saveToLocalStorage();
    dispalyTasks();
}
function  saveToLocalStorage(){
    localStorage.setItem("todo",JSON.stringify(todo));

}
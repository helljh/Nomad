const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODO_KEY = "toDos";
let toDos = [];

function saveToDos(){
    localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

function delToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo)=> toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newToDo){
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", delToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}
function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    const newToDoObject = {
        text : newToDo,
        id : Date.now(),
    }
    toDos.push(newToDoObject);
    toDoInput.value = "";
    paintToDo(newToDoObject);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODO_KEY);

if(savedTodos){
    const parsedTodos = JSON.parse(savedTodos);
    toDos= parsedTodos;
    parsedTodos.forEach(paintToDo);
}
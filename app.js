/* Selecteurs */
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoContainer = document.querySelector(".todo-list");
const filter = document.querySelector(".filtre")


/* Ecouteur */
todoButton.addEventListener("click", addTodo);
todoContainer.addEventListener("click", deleteFinish);
filter.addEventListener("input", filtertodo);
document.addEventListener("DOMContentLoaded", getTodos);

/* Fonction  */

/* Ajouté des éléments a la Todo list */
function addTodo(event){
    event.preventDefault();
    /* <div> */
    const divtodo = document.createElement("div");
    divtodo.classList.add("todo");
    /* <li> */
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    divtodo.appendChild(newTodo);
    /* enregistré la todo dans le localstorage */
    sauvegardeLocal(todoInput.value);
    /* Bouton complété */
    const finishButton = document.createElement("button");
    finishButton.innerHTML = '<i class="fas fa-check"></i>';
    finishButton.classList.add("finish-btn");
    divtodo.appendChild(finishButton);

    /* Bouton supprimer */
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    divtodo.appendChild(deleteButton);

    /* Ajouter Todo a la Todo List */
    todoContainer.appendChild(divtodo);
    todoInput.value = "";
}

/* Supprimé des éléments de la Todo list */
function deleteFinish(e){ 
    const item = e.target;

    /* supprimer un todo */
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }   
    
    /* Valider un todo */
    if(item.classList[0] === "finish-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("complete");
    }   
}


/* Fontion des filtre */

function filtertodo(e) {
    const todos = todoContainer.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "toute":
                todo.style.display = "flex";
                break;
            case "completer":
                if(todo.classList.contains("complete")){
                    todo.style.display = "flex";
                } 
                else {
                    todo.style.display = "none";
                }
            break;
            case "afaire":
                if(todo.classList.contains("complete")){
                    todo.style.display = "none";
                } 
                else {
                    todo.style.display = "flex";
                }
            break;
        }
    })
}

/* Garder les todos crée */
function sauvegardeLocal(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

/* affiché les éléments du local storage */

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
    /* <div> */
    const divtodo = document.createElement("div");
    divtodo.classList.add("todo");

    /* <li> */
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    divtodo.appendChild(newTodo);

    /* Bouton complété */
    const finishButton = document.createElement("button");
    finishButton.innerHTML = '<i class="fas fa-check"></i>';
    finishButton.classList.add("finish-btn");
    divtodo.appendChild(finishButton);

    /* Bouton supprimer */
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    divtodo.appendChild(deleteButton);

    /* Ajouter Todo a la Todo List */
    todoContainer.appendChild(divtodo);
    });

    
}

/* supprimé élément du local storage */

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const Indextodo = todo.children[0].innerText;
    todos.splice(todos.indexOf(Indextodo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
} 


window.onload=function() {
    filtertodo();
    setInterval(afficher,0.5);
}
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector(".clear-todos");

const addTodoButton = document.querySelector(".addTodo")
addTodoButton.disabled = true;
eventListeners()
//Butun event funksiyalar burda olacaq
function eventListeners(){
    todoInput.addEventListener('input',activeButton)
    form.addEventListener("submit",addTodo);
    document.addEventListener('DOMContentLoaded',loadAllTodosToUI)
    secondCardBody.addEventListener('click',deleteTodo);
    clearButton.addEventListener('click',clearTodos)
    filter.addEventListener('input',filteredTodo)

}
function clearTodos(e){
    e.preventDefault()
    todoList.innerHTML = '';
    let todos = [];
    localStorage.setItem('todos',JSON.stringify(todos))
}
function filteredTodo(e){
    const listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach(t=>{
        if(t.textContent.toLowerCase().indexOf(e.target.value.toLowerCase())=== -1){
            t.setAttribute('style','display : none !important')
        }
        else{
            t.setAttribute('style','display : flex !important')
        }
    })
}
function deleteTodo(e){
    if(e.target.className === 'fa fa-remove'){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getItemLocalStorage();
    todos = todos.filter(t=>t !== deletetodo)
    localStorage.setItem('todos',JSON.stringify(todos))
}
function activeButton(){
    if(todoInput.value !== ''){
        addTodoButton.disabled = false
    }
    else{
        addTodoButton.disabled = true
    }
}
function loadAllTodosToUI(){
    let todos = getItemLocalStorage()
    todos.forEach(item => {
        addTodoUI(item)
    });
}
function addTodo(e){//string deyer alacaq
    e.preventDefault();
    const newTodo = todoInput.value.trim();
    if(newTodo !== ''){
        addTodoLocalStorage(newTodo)
        addTodoUI(newTodo);
        showAlert('success','Todo elave edildi')
    }
    else{
        showAlert('danger','Boshluq elave ede bilmersen')
    }
    
    todoInput.value = ''
    activeButton()
}
function getItemLocalStorage(){
    let todos;
    if(localStorage.getItem('todos') !== null){
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    else{
        todos = [];
    }
    return todos
}
function addTodoLocalStorage(newTodo){
    todos = getItemLocalStorage()
    todos.push(newTodo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function addTodoUI(newTodo){ //hemen string deyeri list item olaraq elave eliyecek

    // <li class="list-group-item d-flex justify-content-between">
    //                     Todo 1
    //                     <a href="" class="delete-item">
    //                         <i class="fa fa-remove"></i>
    //                     </a>
    //                 </li>
    
    const listItem = document.createElement('li')
    listItem.classList = 'list-group-item d-flex justify-content-between'
    const linkItem = document.createElement('a');
    linkItem.href = '#';
    linkItem.classList = 'delete-item'
    const xButton = document.createElement('i');
    xButton.classList = 'fa fa-remove';
    listItem.innerHTML = newTodo;
    linkItem.append(xButton)
    listItem.append(linkItem)
    todoList.append(listItem)
}
function showAlert(type,message){
    // <hr>
    //             <div class="alert alert-danger" role="alert">
    //                 This is a danger alert—check it out!
    //               </div>
    const hrLine = document.createElement('hr')
    const divAlert = document.createElement('div')
    divAlert.classList = `alert alert-${type}`
    divAlert.setAttribute("role","alert");
    divAlert.innerHTML = message
    firstCardBody.append(hrLine)
    firstCardBody.append(divAlert)
    setTimeout(function(){
        hrLine.remove()
        divAlert.remove()
    },1000);
}

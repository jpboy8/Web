

const btnAdd = document.querySelector('#btn-add')
const input = document.querySelector('#input')
const todoList = document.querySelector('#todo-list')
const todoItem = document.querySelector('.todo-list__list-item')
const todoItemCheck = document.querySelector('.todo-list__list-check')
const btnClean = document.querySelector('#btn-clean')
const btnCompleted = document.querySelector('#btn-completed')

let todos = []
let checkedItems = []
if(localStorage.getItem('todos')) {
	todos = JSON.parse(localStorage.getItem('todos'))
	displayMessage()
}

function addTodo() {
	let newTodo = {
		task: input.value,
		checked: false
	}

	todos.push(newTodo)
	displayMessage()
	localStorage.setItem('todos', JSON.stringify(todos))
}

function displayMessage() {

	let message = ''

	todos.forEach((item, i) => {
		message +=  `
			<li class="todo-list__list-item">
				<input type="checkbox" class="todo-list__list-check styled-checkbox" id="ch-${i}" ${item.checked ? 'checked' : ''} ></input>
				<label for="ch-${i}" class="check-box">${item.task}</label>
			</li>
		`
		// item.checked && checkedItems.push(item.task)
		todoList.innerHTML = message
		// console.log("items: " + checkedItems)
	});
}

btnAdd.addEventListener('click', ()=>{
	if(input.value != '') {
		addTodo()
		localStorage.setItem('todos', JSON.stringify(todos))
		input.value = ''
	}
})

addEventListener('keypress', (e)=>{
	if(e.key == 'Enter' & input.value != '') {
		addTodo()
		localStorage.setItem('todos', JSON.stringify(todos))
		input.value = ''
	}
})

todoList.addEventListener('click', (e) => {
	let idValue = e.target.getAttribute('id')
	let forValue = todoList.querySelector('[for=' + idValue + ']')
	let label = forValue.innerHTML
	todos.forEach((item) => {
		if(label === item.task) {
			item.checked = !item.checked
			console.log(item)
		}
		item.checked && checkedItems.push(item.task)
		
	});

	localStorage.setItem('todos', JSON.stringify(todos))
})

btnClean.addEventListener('click', ()=>{
	localStorage.clear()
	todoList.innerHTML = ''
	todos = []
})
btnCompleted.addEventListener('click', () => {
	let message = ''
	console.log(checkedItems)
	var uniq = [...new Set(checkedItems)];
	uniq.forEach((item, i) => {
		message +=  `
			<li class="todo-list__list-item">
				
				<label for="ch-${i}" class="check-box">${item}</label>
			</li>
		`
		todoList.innerHTML = message
		
	});
})
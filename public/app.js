const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

async function fetchTasks() {
  const response = await fetch('http://localhost:3000/api/tasks');
  const tasks = await response.json();

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task._id, li));
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  })
}

async function addTask(e) {
  e.preventDefault();

  const newTask = {
    title: taskInput.value,
  };

  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  const task = await response.json();
  const li = document.createElement('li');
  li.textContent = task.title;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTask(task._id, li));
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = '';
}

async function deleteTask(id, element) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'DELETE',
  });
  taskList.removeChild(element);
}

taskForm.addEventListener('submit', addTask);
fetchTasks();


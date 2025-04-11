// Initialize task counter
let taskCount = 0;

// Function to update the task counter display
function updateTaskCounter() {
    const counterElement = document.getElementById('task-counter');
    console.log(`Updating task counter: ${taskCount}`); // Debugging
    counterElement.textContent = `Tasks: ${taskCount}`;
}

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
    taskCount = tasks.length; // Set initial task count
    console.log(`Page loaded. Initial task count: ${taskCount}`); // Debugging
    updateTaskCounter();
});

// Add task form submission
document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;

    const task = {
        text: `${taskInput} - ${taskDate} ${taskTime}`,
        priority: taskPriority
    };

    // Save task to localStorage
    saveTaskToLocalStorage(task);

    // Add task to the DOM
    addTaskToDOM(task);

    // Increment task count and update counter
    taskCount++;
    console.log(`Task added. New task count: ${taskCount}`); // Debugging
    updateTaskCounter();

    // Clear the form
    document.getElementById('task-form').reset();
});

// Save task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task to the DOM
function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px';

    // Add event listener to remove the task when checkbox is checked
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            removeTaskFromLocalStorage(task.text);
            taskList.removeChild(listItem);

            // Decrement task count and update counter
            taskCount--;
            console.log(`Task removed. New task count: ${taskCount}`); // Debugging
            updateTaskCounter();
        }
    });

    // Append the checkbox and task details to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(task.text));
    listItem.setAttribute('data-priority', task.priority);

    taskList.appendChild(listItem);
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
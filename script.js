document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;

    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px';
    checkbox.style.cursor = 'pointer';
    checkbox.style.width = '20px';

    // Add event listener to remove the task when checkbox is checked
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            taskList.removeChild(listItem);
        }
    });

    // Append the checkbox and task details to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(`${taskInput} - ${taskDate} ${taskTime}`));
    listItem.setAttribute('data-priority', taskPriority);

    taskList.appendChild(listItem);

    // Clear the form
    document.getElementById('task-form').reset();
});
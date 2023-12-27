const button = document.getElementById('detail-button');
button.setAttribute('disabled', true);

let input = document.getElementById('task-0');
let count = 1;

function inputListener() {
  input.addEventListener('input', (event) => {
    let value = event.target.value;
    if (!value.length || value.length < 5) {
      button.setAttribute('disabled', true);
    } else {
      button.removeAttribute('disabled');
    }
  });
}

input.addEventListener('focus', () => {
  inputListener();
});

button.onclick = function () {
  const group = document.getElementById('tasks-group');
  const task = document.createElement('input');
  task.type = 'text';
  task.name = 'tasks';
  task.id = 'task-' + count;
  task.placeholder = 'Obtener datos de una API...';
  task.minLength = 5;
  group.appendChild(task);

  count++;
  button.setAttribute('disabled', true);
  input = document.getElementById(task.id);
  inputListener();
};

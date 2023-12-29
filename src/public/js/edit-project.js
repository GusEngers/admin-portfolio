const button = document.getElementById('detail-button');

const char = document.getElementById('char-length');
const textarea = document.getElementById('description');
char.innerText = textarea.textContent.length;

textarea.addEventListener('input', (event) => {
  event.preventDefault();
  char.innerText = event.target.value.length;
});

let inputs = document.getElementsByName('tasks');
let input = inputs[inputs.length - 1];

if (!input.getAttribute('value')) {
  button.setAttribute('disabled', true);
}

let count = input.length;

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

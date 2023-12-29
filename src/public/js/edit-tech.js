const button = document.getElementById('detail-button');

let inputs = document.getElementsByName('details');
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
  const group = document.getElementById('details-group');
  const detail = document.createElement('input');
  detail.type = 'text';
  detail.name = 'details';
  detail.id = 'detail-' + count;
  detail.placeholder = 'Desarrollar componentes...';
  detail.minLength = 10;
  group.appendChild(detail);

  count++;
  button.setAttribute('disabled', true);
  input = document.getElementById(detail.id);
  inputListener();
};

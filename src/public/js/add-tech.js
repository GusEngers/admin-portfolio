const button = document.getElementById('detail-button');
button.setAttribute('disabled', true);

let input = document.getElementById('detail-0');
let count = 1;

function inputListener() {
  input.addEventListener('input', (event) => {
    let value = event.target.value;
    if (!value.length || value.length < 10) {
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
  detail.minLength = 5;
  group.appendChild(detail);

  count++;
  button.setAttribute('disabled', true);
  input = document.getElementById(detail.id);
  inputListener();
};

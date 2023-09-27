function addTask() {
  const container = document.getElementById('tasks-group');
  const newDetail = document.createElement('input');
  newDetail.type = 'text';
  newDetail.name = 'tasks';
  container.appendChild(newDetail);
}

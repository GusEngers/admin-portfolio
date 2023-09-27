function addDetail() {
  const container = document.getElementById('details-group');
  const newDetail = document.createElement('input');
  newDetail.type = 'text';
  newDetail.name = 'details';
  container.appendChild(newDetail);
}

document.addEventListener('DOMContentLoaded', function() {
  // elements we reference
  var checkbox = document.getElementById('checkbox')
    , field = document.getElementById('field')
  
  // populate existing state
  checkbox.checked = !!Number(localStorage.hideNoSPDY);
  
  // click listener
  checkbox.addEventListener('click', function () {
    localStorage.hideNoSPDY = Number(checkbox.checked);
    field.className = 'saved';
    setTimeout(function () {
      field.className = '';
    }, 200);
  });
});

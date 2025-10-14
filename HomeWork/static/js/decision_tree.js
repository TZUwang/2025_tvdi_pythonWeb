// Bootstrap 5 form validation
(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()

// Handle collapse icon rotation
document.querySelectorAll('.btn-collapse').forEach(button => {
    button.addEventListener('click', function () {
        const icon = this.querySelector('.fa-chevron-down');
        // The 'aria-expanded' attribute is updated by Bootstrap's collapse plugin just before the event fires.
        // We check the state *after* the click event has started.
        // A small timeout allows Bootstrap to update the attribute before we check it.
        setTimeout(() => {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        }, 10);
    });
});

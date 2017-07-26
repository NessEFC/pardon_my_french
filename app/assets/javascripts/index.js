$(() => {
  $('#create-card-btn').on('click', Card.createCard)
  $('.creation-mode-container').on('blur', '.new-card p', Card.update)
  $('.creation-mode-container').on('click', '#discard-btn', Card.delete)
  $('.creation-mode-container').on('click', '#keep-btn', Card.keep)
})

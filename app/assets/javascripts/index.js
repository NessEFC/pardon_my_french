$(() => {
  $('#create-card-btn').on('click', createCard)
})

const createCard = (e) => {
  e.preventDefault()

  const word = $('input[name="card[french_word]"]').val().toLowerCase()

  $.ajax({
    type: 'POST',
    url: '/api/v1/cards',
    dataType: 'json',
    data: {
      card:
        {
          french_word: word
        }
    },
    success: function(data) {
      const card = new Card(data.card)
      card.appendToPage()
      $('input[name="card[french_word]"]').val('')
    },
    error: function(data) {}
  })
}

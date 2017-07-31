$(() => {
  $('.toggle-mode-btn').on('click', toggleMode)
})

const toggleMode = (e) => {
  e.preventDefault()

  const box = $('#box')
  const boxClass = box.attr('class')

  const newClass = getNewClass(boxClass)
  box.removeClass()
  box.addClass(newClass)
}

const getNewClass = (boxClass) => {
  if(boxClass === 'show-front' || '') {
    boxClass = 'show-back'
  } else {
    boxClass = 'show-front'
  }
  return boxClass
}

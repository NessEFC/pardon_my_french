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
  switchName(e)
}

const getNewClass = (boxClass) => {
  if(boxClass === 'show-front' || '') {
    boxClass = 'show-back'
  } else {
    boxClass = 'show-front'
  }
  return boxClass
}

const switchName = (e) => {
  const newMode = (e.target.innerText === 'Study Mode') ? 'Creation Mode' : 'Study Mode'

  e.target.innerText=newMode
}

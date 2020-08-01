const getTemplate = (data = [], placeholder, selected) => {
  let text = placeholder ?? 'Select'
  const items = data.map(item => {
    let cls = ''
    if(selected === item.value){
      cls = 'active'
      text = item.value
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  }).join('')
  return `
  <div class="select__backdrop" data-type="backdrop"></div>
  <div class="select__input" data-type="input">
    <span data-type="value">${text}</span>
    <i class="fas fa-chevron-down" data-type="arrow"></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      ${items}
    </ul>
  </div>
`
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = null
    this.data = this.#prettyData(options.data)
    this.#render()
    this.#setup()
  }
  #render() {
    const {placeholder, selected} = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(this.data, placeholder, selected)
  }
  #setup() {
    this.$el.addEventListener('click', this.clickHandler.bind(this))
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
    this.$items = this.$el.querySelectorAll('[data-type="item"]')
  }
  #prettyData(arr) {
    return arr.map((el, idx) => {
      return {
        id: (idx + 1).toString(),
        value: el
      }
    })
  }
  clickHandler(event) {
    const {type} = event.target.dataset
    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    } else if (type === 'backdrop'){
      this.close()
    }
  }
  get current() {
    return this.data.find(item => item.id === this.selectedId)
  }
  get isOpen() {
    return this.$el.classList.contains('open')
  }
  toggle() {
    this.isOpen ? this.close() : this.open()
  }
  open() {
    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }
  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.add('fa-chevron-down')
    this.$arrow.classList.remove('fa-chevron-up')
  }
  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value
    this.$items.forEach(el=>{
      el.classList.remove('active')
    })
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('active')
    
    this.options.onSelect ? this.options.onSelect(this.current.value) : null
    this.close()
  }
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}

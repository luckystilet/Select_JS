import {Select} from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
  placeholder: 'Select element',
  data: ['React','Angular','Vue','React Native','Next','Nest'],
  selected: 'Vue',
  onSelect(item){
    console.log("item == ", item )
  }
})
window.s = select
// const arr = ['a','b','v','g','d',]
// const arr2 = ['e','z','x','c','v',]
//
// const pretty = (arr)=>{
//   return arr.map((el, idx)=>{
//     return {
//       id: idx+1,
//       value: el
//     }
//   })
// }
//
// console.log("newArr == ",  pretty(arr))
// console.log("newArr2 == ",  pretty(arr2))

// ================================================
// const arr1 = [88,22,444,88,33,11,99,77,45747,2525,251,5674,]
// const res = arr1.sort((a,b)=>{
//   if(a<b)return -1
//   if(a>b)return 1
//   return 0
// })
// console.log("res == ",  res)

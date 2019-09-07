export default function selectFactory(id,options) {
let select = document.createElement('select');
    select.id = id
    options.forEach(option=>{
      let choice = document.createElement('option');
      choice.innerText = option
      choice.value = option
      select.append(choice);
    })
    return select
}
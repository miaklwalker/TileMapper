/**
 * @description Takes and ID and options array as arguments and returns a select element that can be attached to the dom body
 * @export
 * @param {*} id  The string to be set as the elements ID so i can be later used and read
 * @param {*} options an array of options that will be attached as HTMLOptionElements to the HTMLSelectElement
 * @returns a HTMLSelectElement with all options provided
 */
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
/**
 * @name setStored
 * @description acts like a toggle for Sets , when provided a Set and a value checks if the set has the value and either deletes it from the set or adds it to the set 
 * @export
 * @param {*} set The set to check 
 * @param {*} value The value to check the set for.
 */
export default function setStored(set,value){
    if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
}
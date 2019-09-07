export default function setStored(set,value){
    if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
}
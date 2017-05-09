
class node {
  constructor(value=null){
    this.value = value;
    this.gt = null;
    this.lt = null;
    this.path = "";
  }
  dump(){
    let ltDump = this.lt ? this.lt.dump() : "null";
    let gtDump = this.gt ? this.gt.dump() : "null";
    return `{ value: '${this.value}', children: [${ltDump}, ${gtDump}] }`;
  }
}

class bst {
  constructor(items=[]){
    console.log(`Building new tree from items: ${items}`);
    this.node = new node();
    items.forEach((item) =>{
      this.insert(item);
    });
  }
  insert(value, current=this.node){
    let next;
    if(current.value){
      if(value > current.value){
        next = "gt";
      }else{
        next = "lt";
      }
      if(!current[next]){
        current[next] = new node();
      }
      this.insert(value, current[next]);
    }else{
      current.value = value;
    }
  }
  balance(){
    const getValues = (node=this.node) => {
      if(!node){
        return [];
      }
      let list = [];
      list = list.concat(getValues(node.lt));
      list.push(node.value);
      list = list.concat(getValues(node.gt));
      return list;
    }
    const list = getValues();
    const order = [];
    let queue = [list];
    let test = [];
    let newList, middle, second, third;
    while(queue.length){
      newList = [];
      queue.forEach((item) => {
        middle = Math.ceil(item.length/2);
        order.push(item[middle-1]);
        second = item.slice(0,middle-1);
        third = item.slice(middle);
        if(second.length){
          newList.push(second);
        }
        if(third.length){
          newList.push(third);
        }
      });
      queue = newList;
    }
    this.node = new node();
    while(order.length){
      this.insert(order.shift());
    }

  }
}

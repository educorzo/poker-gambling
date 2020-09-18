export default class Stage {
  constructor () {
    this.childs = [];
  }

  addChild(child){
    this.childs = this.childs.concat(child);
  }
}

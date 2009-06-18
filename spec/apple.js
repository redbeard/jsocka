function Apple(type){
  this.type = type;
}

Apple.getType = function(){
  return "A Fruit";
}

Apple.prototype.getType = function(){
  return this.type;
}

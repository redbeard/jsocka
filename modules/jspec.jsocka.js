JSpec.include({
  preprocessing: function(input){
    return input.replace(/([a-zA-Z]+).any_instance/g,function(_,object){
      return "JSocka(\""+object+"\").any_instance";
    }).replace(/([a-zA-Z]+).expects\(/g,function(_,object){
      return "JSocka(\""+object+"\").expects(";
    }).replace(/([a-zA-Z]+).stubs\(/g,function(_,object){
      if(object == "instance"){
        return object+".stubs(";
      } else{
        return "JSocka(\""+object+"\").stubs(";
      }
    })
  },
  utilities: {
    stubs: function(object,method){
      return JSocka(object).stubs(method);
    }
  },
  afterSpec: function(spec){
    if(JSocka.hasExpectations()){
      var errors = JSocka.errors();
      if(errors.length == 0){
        pass();
      } else{
        fail(errors);
      }
    }
    JSocka.clearStubs();
  }
})

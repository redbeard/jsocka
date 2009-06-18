JSocka.stubbed = [];

function JSocka(object){
  if (JSocka.stubbed[object] == null){
    JSocka.stubbed[object] = [];
  }
  return {
    stubs: function(method){
      JSocka.stubbed[object][method] = eval(object+'.'+method);
      return {
        returns: function(stub){
          eval(object+'.'+method+'='+stub);
        }
      };
    },
    any_instance: {
      stubs: function(method){
        JSocka.stubbed[object]['prototype.'+method] = eval(object+'.prototype.'+method);
        return {
          returns: function(stub){
            eval(object+'.prototype.'+method+'='+stub);
          }
        };
      }
    }
  };
}

JSocka.destub = function(){
  for(object in JSocka.stubbed){
    for(method in JSocka.stubbed[object]){
      eval(object+'.'+method+'='+JSocka.stubbed[object][method]);
    };
  };
}

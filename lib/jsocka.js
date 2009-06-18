JSocka.stubbed = {};

function JSocka(object){
  if (JSocka.stubbed[object] == null){
    JSocka.stubbed[object] = [];
  }
  return {
    stubs: function(method){
      JSocka.stubbed[object][method] = {};
      JSocka.stubbed[object][method]['method'] = eval(object+'.'+method);
      return {
        returns: function(stub){
          JSocka.setReturn(object,method,stub,false);
        }
      };
    },
    expects: function(method){
      JSocka.stubbed[object][method] = {};
      JSocka.stubbed[object][method]['method'] = eval(object+'.'+method);
      JSocka.stubbed[object][method]['expected_calls'] = 'any';
      JSocka.stubbed[object][method]['actual_calls'] = '0'
      JSocka.setReturn(object,method,eval(object+'.'+method+'.toString()'),true);
      return {
        returns: function(stub){
          JSocka.setReturn(object,method,stub,true);
        },
        never : function(){
          JSocka.stubbed[object][method]['expected_calls'] = '0';
        }
      };
    },
    any_instance: {
      stubs: function(method){
        JSocka.stubbed[object]['prototype.'+method] = {};
        JSocka.stubbed[object]['prototype.'+method]['method'] = eval(object+'.prototype.'+method);
        return {
          returns: function(stub){
            JSocka.setReturn(object,'prototype.'+method,stub,false);
          }
        };
      }
    }
  };
}

JSocka.destub = function(){
  for(object in JSocka.stubbed){
    for(method in JSocka.stubbed[object]){
      eval(object+'.'+method+'='+JSocka.stubbed[object][method]['method']);
    };
  };
}

JSocka.check_expectations = function(){
  for(object in JSocka.stubbed){
    for(method in JSocka.stubbed[object]){
      if(JSocka.stubbed[object][method]["expected_calls"]){
        if(JSocka.stubbed[object][method]["expected_calls"] == "any"){
          if(JSocka.stubbed[object][method]["actual_calls"] * 1 <= 0){
            throw new Error(object+'.'+method+' was expected, but not called.');
          }
        } else{
          if(JSocka.stubbed[object][method]["expected_calls"] * 1 != JSocka.stubbed[object][method]["actual_calls"] * 1){
            throw new Error(object+'.'+method+' was expected '+JSocka.stubbed[object][method]["expected_calls"]+' times, but was called '+JSocka.stubbed[object][method]["actual_calls"]+' times.');
          }
        }
      }
    };
  };
}

JSocka.setReturn = function(object,method,stub,hook)
{
  if(hook){
    prefix = stub.substring(0,stub.indexOf("{")+1);
    hook = 'JSocka.stubbed["'+object+'"]["'+method+'"]["actual_calls"] = JSocka.stubbed["'+object+'"]["'+method+'"]["actual_calls"] * 1 + 1; ';
    suffix = stub.substring(stub.indexOf('{')+1,stub.length);
    hookedStub = prefix+hook+suffix;
    eval(object+'.'+method+'='+hookedStub);
  } else{
    eval(object+'.'+method+'='+stub);
  }
}

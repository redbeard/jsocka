JSocka.stubbed = {};

function JSocka(object){
  if (!JSocka.stubbed[object]){
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
      JSocka.stubbed[object][method]['actual_calls'] = '0';
      JSocka.stubbed[object][method]['expected_params'] = [];
      JSocka.stubbed[object][method]['actual_params'] = [];
      JSocka.setReturn(object,method,null,true);
      return {
        with: function() {
          if(arguments.length != 0){
            var expected_params = [];
            for(var i=0; i < arguments.length; i++){
              expected_params.push(arguments[i]);
            }
            JSocka.stubbed[object][method]['expected_params'].push(expected_params);
            return {
              returns: function(stub){
                JSocka.setReturn(object,method,stub,true);
              }
            };
          }
        },
        returns: function(stub){
          JSocka.setReturn(object,method,stub,true);
        },
        never: function(){
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
      },
      expects: function(method){
        JSocka.stubbed[object]['prototype.'+method] = {};
        JSocka.stubbed[object]['prototype.'+method]['method'] = eval(object+'.prototype.'+method);
        JSocka.stubbed[object]['prototype.'+method]['expected_calls'] = 'any';
        JSocka.stubbed[object]['prototype.'+method]['actual_calls'] = '0';
        JSocka.stubbed[object]['prototype.'+method]['expected_params'] = [];
        JSocka.stubbed[object]['prototype.'+method]['actual_params'] = [];
        JSocka.setReturn(object,method,null,true);
        return {
          with: function() {
            if(arguments.length != 0){
              var expected_params = [];
              for(var i=0; i< arguments.length; i++){
                expected_params.push(arguments[i]);
              }
              JSocka.stubbed[object]['prototype.'+method]['expected_params'].push(expected_params);
              return {
                returns: function(stub){
                  JSocka.setReturn(object,'prototype.'+method,stub,true);
                }
              };
            }
          },
          returns: function(stub){
            JSocka.setReturn(object,'prototype.'+method,stub,true);
          },
          never: function(){
            JSocka.stubbed[object]['prototype.'+method]['expected_calls'] = '0';
          }
        };
      }
    }
  };
}

JSocka.destub = function(){
  for(object in JSocka.stubbed){
    for(method in JSocka.stubbed[object]){
      eval(object+'.'+method+'=JSocka.stubbed[object][method]["method"]');
    };
  };
}

JSocka.checkExpectations = function(){
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
        if(JSocka.stubbed[object][method]["expected_params"].length != 0){
          for(var i=0; i<JSocka.stubbed[object][method]["expected_params"].length; i++){
            var found_param_match = false;
            for(var j=0; j<JSocka.stubbed[object][method]["actual_params"].length; j++){
              if(!found_param_match){
                if(JSocka.stubbed[object][method]["expected_params"][i].length == JSocka.stubbed[object][method]["actual_params"][j].length){
                  var all_params_match = true;
                  for(var k=0; k<JSocka.stubbed[object][method]["expected_params"][i].length; k++){
                    if(all_params_match){
                      all_params_match = (JSocka.stubbed[object][method]["expected_params"][i][k] == JSocka.stubbed[object][method]["actual_params"][j][k]);
                    }
                  }
                  found_param_match = found_param_match || all_params_match;
                } 
              }
            }
            if(found_param_match == false){
              expected_params_string = "";
              for(var j=0; j<JSocka.stubbed[object][method]["expected_params"][i].length; j++){
                expected_params_string += JSocka.stubbed[object][method]["expected_params"][i][j];
              }
              throw new Error(object+'.'+method+'('+expected_params_string+') was expected, but not called.');
            }
          }
        }
      }
    }
  }
  return true;
}

JSocka.setReturn = function(object,method,stub,hook)
{
  if(hook){
    if(stub == null){
      prefix = "function(){";
      suffix = "};";
    } else{
      prefix = stub.substring(0,stub.indexOf("{")+1);
      suffix = stub.substring(stub.indexOf('{')+1,stub.length);
    }
    hook = 'JSocka.stubbed["'+object+'"]["'+method+'"]["actual_calls"] = JSocka.stubbed["'+object+'"]["'+method+'"]["actual_calls"] * 1 + 1; var actual_params = []; for(var i=0; i<arguments.length; i++){actual_params.push(arguments[i]);}; JSocka.stubbed["'+object+'"]["'+method+'"]["actual_params"].push(actual_params); ';
    eval(object+'.'+method+'='+prefix+hook+suffix);
  } else{
    eval(object+'.'+method+'='+stub);
  }
}

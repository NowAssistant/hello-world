const got = require('got');

module.exports = async function (activity) {

    try {
        
        // extract _action from Request
        var model = getObjPath(activity.Request, "Data.model");
        
        // set default value
        model.hello = "Please enter your name";     

        switch (activity.Request.Path) {

            case "hello":   // atAgentAction = "hello"
                model.hello = "Hello, " + model.name;
                break;

            default:        // initial request                       
                break;
        }

        activity.Response.Data = model;
      
    } catch (error) {

        // return error response
        var m = error.message;
        if (error.stack) m = m + ": " + error.stack;

        activity.Response.ErrorCode = (error.response && error.response.statusCode) || 500;
        activity.Response.Data = {
            ErrorText: m
        };

    }

    function getObjPath(obj, path) {

      if (!path) return obj;
      if (!obj) return null;

      var paths = path.split('.'),
          current = obj;

      for (var i = 0; i < paths.length; ++i) {
          if (current[paths[i]] == undefined) {
              return {};
          } else {
              current = current[paths[i]];
          }
      }
      return current;
  }

};

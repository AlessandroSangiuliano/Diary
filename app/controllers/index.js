var _K_CONTROLLER_NAME = "index.js";
var logged = false;

function read(e) {
  if (!logged) {
    (OS_IOS) ? $.nav_window.openWindow(Alloy.createController("login").getView()) :
    Alloy.createController("login").getView().open();
  }
  else{
    (OS_IOS) ? $.nav_window.openWindow(Alloy.createController("activityMenu").getView()) :
    Alloy.createController("activityMenu").getView().open();
  }
}

if (OS_IOS) {
  $.nav_window.open();
}
else {
  $.root_window.open();
}

function close(e){
  alert("pene dell'inerno");
}

handleLogin = function(e){
  if (e.status) {
    var arguments = [{nav_group:$.nav_window}];
    //creo il controller per le activity e gli passo in navWindow come parametro
    (OS_IOS) ? $.nav_window.openWindow(Alloy.createController("activityMenu", arguments).getView()) :
    Alloy.createController("activityMenu").getView().open();
    Alloy.Globals.Dispatcher.off('logging', handleLogin);
  }
  else {
    alert('Wrong User Id ir Password');
  }
};

setLogged = function(e){
  if (e.success) {
    logged = true;
    Alloy.Globals.Logging.off('logged', setLogged);
  }
  else {
    logged = false; // per ora è ridondante; eliminabile in futuro.
  }
};

Alloy.Globals.Dispatcher.on("logging", handleLogin);
Alloy.Globals.Logging.on("logged", setLogged);

// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;

function close(e){
  $.login_window.close();
}

function createNewUser(e){
  var digest_password;

  if ($.user_id_box.getValue().length == 0) {
    alert('Please, enter a valid user name');
    return;
  }

  if ($.user_password_box.getValue().length == 0) {
    alert('Please, enter a valid password');
    return;
  }

  digest_password = criptPassword($.user_password_box.getValue());
  storeCredential($.user_id_box.getValue(), digest_password);
  alert('User created!');
}

function logIn(e){
  var login_success;
  if (getStoredUserID() === $.user_id_box.getValue()){
    if (getStoredPassword() === criptPassword($.user_password_box.getValue())) {
      login_success = true;
      Alloy.Globals.Dispatcher.trigger('logging', {status:login_success});
      Alloy.Globals.Logging.trigger('logged', {success:true});
      $.login_window.close();
    }
    else{
      login_success = false;
      Alloy.Globals.Dispatcher.trigger('logging', {status:login_success});
    }
  }
  else{
    login_success = false;
    Alloy.Globals.Dispatcher.trigger('logging', {status:login_success});
  }
}

criptPassword = function(a_password){
  var cripted_password = Titanium.Utils.md5HexDigest(a_password);
  return cripted_password;
};

storeCredential = function(uid, a_digest){
  Titanium.App.Properties.setString('user_id', uid);
  Titanium.App.Properties.setString('password', a_digest);
};

getStoredUserID = function(){
  return Titanium.App.Properties.getString('user_id');
};

getStoredPassword = function(){
  return Titanium.App.Properties.getString('password');
};

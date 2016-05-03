// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;

var nav_window = args[0].nav_group;

function close(e){
  $.activity_window.close();
}

function clickedRow(e){
  Ti.API.info('riga: ', e.index);
}

// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

jQuery(document).ready(function($){
    $(".vz-selectable-box-cont").on("click", ".vz-selectable-box", function(e){
        $(".vz-selectable-box", e.delegateTarget).removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $(e.delegateTarget).trigger("selectable_box_change", [e.currentTarget]);
    })
    // $(".vz-selectable-box-cont").on("selectable_box_change", function(e, selected){
    //     console.log(selected);
    // })
});

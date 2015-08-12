/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (<none>)
 * Config saved to config.json and <none>
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
// +function ($) {
//   'use strict';
//   var version = $.fn.jquery.split(' ')[0].split('.')
//   if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
//     throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
//   }
// }(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 *
 * 警告信息 alert.js  -- 取自bootstrap

 * 实例
 * 通过此插件可以为警告信息添加点击并消失的功能。
 * 
 * 当使用 .close 按钮时，它必须是 .alert-dismissible 的第一个子元素，并且在它之前不能有任何文本内容。
 * 
 * 用法
 * 为关闭按钮添加 data-dismiss="alert" 属性就可以使其自动为警告框赋予关闭功能。关闭警告框也就是将其从 DOM 中删除。
 * 
 * <button type="button" class="close" data-dismiss="alert" aria-label="Close">
 * <span aria-hidden="true">&times;</span>
 * </button>
 *
 * 
 * 为了让警告框在关闭时表现出动画效果，请确保为其添加了 .fade 和 .in 类。
 * 
 * 方法
 * $().alert()
 *
 * 
 * 让警告框监听具有 data-dismiss="alert" 属性的后裔元素的点击（click）事件。（如果是通过 data 属性进行的初始化则无需使用）
 * $().alert('close')
 * 
 * 关闭警告框并从 DOM 中将其删除。如果警告框被赋予了 .fade 和 .in 类，那么，警告框在淡出之后才会被删除。
 * 
 * 事件
 * Bootstrap 的警告框插件对外暴露了一些可以被监听的事件。
 * 
 * 事件类型  描述
 * close.bs.alert  当 close 方法被调用后立即触发此事件。
 * closed.bs.alert 当警告框被关闭后（也即 CSS 过渡效果完毕之后）立即触发此事件。
 * 
 * $('#myAlert').on('closed.bs.alert', function () {
   * // do something…
 * })
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

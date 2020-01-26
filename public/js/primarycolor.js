;(function($, undefined) {

  'use strict';

  $.fn.primaryColor = function(opts) {

    opts = $.extend({
      skip: 5,            // ç·ãªã‚ã™ã‚‹ã¨é‡ã„ã®ã§ 5px é£›ã°ã—ã§èµ°æŸ»ã™ã‚‹
      exclude: ['0,0,0'], // é™¤å¤–ã™ã‚‹è‰² ãªã‚“ã‹é»’ãŒå–å¾—ã•ã‚Œã‚‹ã®ã§ãƒ‡ãƒ•ã‚©ãƒ«ãƒˆã§è¨­å®šã—ã¨ã
      callback: null
    }, opts);

    function _getContext() {
      return document.createElement('canvas').getContext('2d');
    }

    function _onload(img_obj, $target) {

      var context = _getContext();

      // canvas ã«ç”»åƒã‚’æç”»
      context.drawImage(img_obj, 0, 0);

      // ç”»åƒãƒ‡ãƒ¼ã‚¿ã‚’å–å¾—
      var image_data   = context.getImageData(0, 0, img_obj.width, img_obj.height),
          pixel_length = image_data.data.length,
          data         = image_data.data;

      var colors = {},        // å–å¾—ã—ãŸè‰²ã®å‡ºç¾å›žæ•°ã‚’æ ¼ç´ã—ã¦ãŠã
          primary_color = {   // ãƒ—ãƒ©ã‚¤ãƒžãƒªã‚«ãƒ©ãƒ¼ã‚’æ ¼ç´
            rgb: '',
            count: 0
          };

      // 1px ã”ã¨ã«ç”»åƒãƒ‡ãƒ¼ã‚¿ã‚’èµ°æŸ»ã™ã‚‹ ( 1px ã”ã¨ã« rgba ã® 4 è¦ç´ ã‚ã‚‹ )
      for ( var px = 0; px < pixel_length; px = px + opts.skip * 4 ) {

        var rgb = [ data[px], data[px+1], data[px+2] ].join(',');

        // ã™ã§ã«åŒã˜è‰²ãŒå‡ºç¾ã—ã¦ã„ã‚‹ã‹ã‚«ã‚¦ãƒ³ãƒˆã™ã‚‹
        // é™¤å¤–ã‚«ãƒ©ãƒ¼ã«ã‚ã‚‹ã‚‚ã®ã¯ã‚«ã‚¦ãƒ³ãƒˆã—ãªã„
        if ( !~$.inArray(rgb, opts.exclude) ) {
          if ( rgb in colors ) {
            colors[rgb]++;
          } else {
            colors[rgb] = 1;
          }
        }

        var count = colors[rgb];

        // ä¿æŒã—ã¦ã„ã‚‹ãƒ—ãƒ©ã‚¤ãƒžãƒªã‚«ãƒ©ãƒ¼ã‚ˆã‚Šå‡ºç¾å›žæ•°ãŒå¤šããªã£ãŸã‚‰å…¥ã‚Œæ›¿ãˆ
        if ( count > primary_color.count ) {
          primary_color.rgb = rgb;
          primary_color.count = count;
        }
      }

      $target.attr('data-primary-color', primary_color.rgb);

      if ( typeof opts.callback === 'function' ) {
        opts.callback.call($target[0], primary_color.rgb);
      }
    }

    this.each(function() {

      var $self = $(this),
          image = new Image(),
          color = $self.attr('data-primary-color');

      // ã™ã§ã«å–å¾—æ¸ˆã¿ãªã‚‰ return;
      if ( color ) {
        if ( typeof opts.callback === 'function' ) {
          opts.callback.call($self[0], color);
        }
        return true;
      }

      $(image).on('load', function(e) {
        _onload(this, $self);
      });

      image.src = this.src || '';
    });

    return this;
  };
})(jQuery);
/*
* jQuery Simply Countable plugin
* Provides a character counter for any text input or textarea
* 
* @version  0.1
* @homepage http://github.com/aaronrussell/jquery-text-abacus/
* @author   Aaron Russell (http://www.aaronrussell.co.uk)
*
* Copyright (c) 2009 Aaron Russell (aaron@gc4.co.uk)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/

  // #TODO -  Add countdown or countup option
  // #TODO -  Add ability to count words not characters

(function($){

  $.fn.simplyCountable = function(options){
    
    options = $.extend({
      counter: '#counter',
      maxCount: 140,
      safeClass: 'safe',
      overClass: 'over'
    }, options);
    
    var countable = this;
    
    var countCheck = function(){
      var count = options.maxCount - countable.val().length;
      if (!$(options.counter).hasClass(options.safeClass) && !$(options.counter).hasClass(options.overClass)){
        if (count < 0) $(options.counter).addClass(options.overClass);
        else $(options.counter).addClass(options.safeClass);
      }
      else if (count < 0 && $(options.counter).hasClass(options.safeClass)){
        $(options.counter).removeClass(options.safeClass).addClass(options.overClass);
      }
      else if (count >= 0 && $(options.counter).hasClass(options.overClass)){
        $(options.counter).removeClass(options.overClass).addClass(options.safeClass);
      };
      
      $(options.counter).text(count);
    };
    countCheck();
    
    countable.keyup(countCheck);
    
  };

})(jQuery);
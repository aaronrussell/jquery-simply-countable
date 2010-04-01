/*
* jQuery Simply Countable plugin
* Provides a character counter for any text input or textarea
* 
* @version  0.3
* @homepage http://github.com/aaronrussell/jquery-simply-countable/
* @author   Aaron Russell (http://www.aaronrussell.co.uk)
*
* Copyright (c) 2009-2010 Aaron Russell (aaron@gc4.co.uk)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/

(function($){

  $.fn.simplyCountable = function(options){
    
    options = $.extend({
      counter: '#counter',
      countType: 'characters',
      maxCount: 140,
      strictMax: false,
      countDirection: 'down',
      safeClass: 'safe',
      overClass: 'over',
      thousandSeparator: ','
    }, options);
    
    var countable = this;
    
    var countCheck = function(){
           
      var count;
      
      /* Calculates count for either words or characters */
      if (options.countType === 'words'){
        count = options.maxCount - countable.val().split(/[\s]+/).length;
        if (countable.val() === ''){ count += 1; }
      }
      else { count = options.maxCount - countable.val().length; }
      
      /* If strictMax set restrict further characters */
      if (options.strictMax && count <= 0){
        var content = countable.val();
        if (options.countType === 'words'){
          countable.val(content.split(/[\s]+/).slice(0, options.maxCount).join(' '));
        }
        else { countable.val(content.substring(0, options.maxCount)); }
        count = 0;
      }
      
      /* Set CSS class rules */
      if (!$(options.counter).hasClass(options.safeClass) && !$(options.counter).hasClass(options.overClass)){
        if (count < 0){ $(options.counter).addClass(options.overClass); }
        else { $(options.counter).addClass(options.safeClass); }
      }
      else if (count < 0 && $(options.counter).hasClass(options.safeClass)){
        $(options.counter).removeClass(options.safeClass).addClass(options.overClass);
      }
      else if (count >= 0 && $(options.counter).hasClass(options.overClass)){
        $(options.counter).removeClass(options.overClass).addClass(options.safeClass);
      }
      
      /* If countDirect is 'up' then reverse the count */
      if (options.countDirection === 'up'){
        count = count - (count*2) + options.maxCount;
      }
      
      /* Add thousandSeparator for those massive counts */
      if (options.thousandSeparator){
        count = count.toString();
        for (var i = count.length-3; i > 0; i -= 3){
          count = count.substr(0,i) + options.thousandSeparator + count.substr(i);
        }
      }
      $(options.counter).text(count);
    };
    countCheck();
    
    countable.keyup(countCheck);
    
  };

})(jQuery);
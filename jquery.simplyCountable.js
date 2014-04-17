/*
* jQuery Simply Countable plugin
* Provides a character counter for any text input or textarea
* 
* @version  0.4.2
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
      counter:            '#counter',
      styleTarget:        undefined,
      countType:          'characters',
      maxCount:           140,
      minCount:           0,
      strictMax:          false,
      allowEmpty:         false,
      countDirection:     'down',
      underClass:         'under',
      safeClass:          'safe',
      overClass:          'over',
      thousandSeparator:  ',',
      onUnderCount:       function(){},
      onOverCount:        function(){},
      onSafeCount:        function(){},
      onMaxCount:         function(){}
    }, options);

    var navKeys = [33,34,35,36,37,38,39,40];

    return $(this).each(function(){

      var countable = $(this);
      var counter = $(options.counter);
      if (!counter.length) { return false; }
      var styleTarget = options.styleTarget ? $(options.styleTarget) : counter;
      
      var countCheck = function(){
             
        var count;
        var revCount;
        
        var reverseCount = function(ct){
          return ct - (ct*2) + options.maxCount;
        }
        
        var countInt = function(){
          return (options.countDirection === 'up') ? revCount : count;
        }
        
        var numberFormat = function(ct){
          var prefix = '';
          if (options.thousandSeparator){
            ct = ct.toString();          
            // Handle large negative numbers
            if (ct.match(/^-/)) { 
              ct = ct.substr(1);
              prefix = '-';
            }
            for (var i = ct.length-3; i > 0; i -= 3){
              ct = ct.substr(0,i) + options.thousandSeparator + ct.substr(i);
            }
          }
          return prefix + ct;
        }

        var changeCountableValue = function(val){
          countable.val(val).trigger('change');
        }
        
        /* Calculates count for either words or characters */
        if (options.countType === 'words'){
          count = options.maxCount - $.trim(countable.val()).split(/\s+/).length;
          if (countable.val() === ''){ count += 1; }
        }
        else { count = options.maxCount - countable.val().length; }
        revCount = reverseCount(count);
        
        /* If strictMax set restrict further characters */
        if (options.strictMax && count <= 0){
          var content = countable.val();
          if (count < 0) {
            options.onMaxCount(countInt(), countable, counter);
          }
          if (options.countType === 'words'){
            var allowedText = content.match( new RegExp('\\s?(\\S+\\s+){'+ options.maxCount +'}') );
            if (allowedText) {
              changeCountableValue(allowedText[0]);
            }
          }
          else { changeCountableValue(content.substring(0, options.maxCount)); }
          count = 0, revCount = options.maxCount;
        }
        
        counter.text(numberFormat(countInt()));
        
        var removeClassesIfPresent = function (classesToRemove) {
            var removedClasses = false;
            classesToRemove.forEach(function(classToRemove) {
                if (styleTarget.hasClass(classToRemove)) {
                    styleTarget.removeClass(classToRemove);
                    removedClasses = true;
                }
            });
            return removedClasses > 0;
        };

        var getClassesToRemove = function(addedClass) {
            var classes = [options.underClass, options.safeClass, options.overClass];
            classes.splice(classes.indexOf(addedClass), 1);
            return classes;
        };

        var setClassAndTriggerCallback = function(classToAdd, callback) {
            if (!styleTarget.hasClass(classToAdd)) {
                styleTarget.addClass(classToAdd);
                var classesToRemove = getClassesToRemove(classToAdd);
                if (removeClassesIfPresent(classesToRemove))
                    callback(countInt(), countable, counter);
            }
        };
          
        /* Set CSS class rules and API callbacks */
        if (revCount > options.maxCount)
            setClassAndTriggerCallback(options.overClass, options.onOverCount);
        else if (revCount < options.minCount && (revCount > 0 || !options.allowEmpty))
            setClassAndTriggerCallback(options.underClass, options.onUnderCount);
        else
            setClassAndTriggerCallback(options.safeClass, options.onSafeCount);
      };
      
      countCheck();

      countable.on('keyup blur paste', function(e) {
        switch(e.type) {
          case 'keyup':
            // Skip navigational key presses
            if ($.inArray(e.which, navKeys) < 0) { countCheck(); }
            break;
          case 'paste':
            // Wait a few miliseconds if a paste event
            setTimeout(countCheck, (e.type === 'paste' ? 5 : 0));
            break;
          default:
            countCheck();
            break;
        }
      });

    });
    
  };

})(jQuery);
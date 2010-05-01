(function($) { 
  $.fn.CF_tablesorter = function(options) {
    this.opt = {
      cssAsc : "asc", cssDesc : "desc", cssHeader : "head", cssNoSort : "nosort",
      defaultSortField : "id", defaultSortAttr : "sort",
      ascOrderCmd : "ASC", descOrderCmd : "DESC",
      headerParentEl : "thead th", useGlobal : true, url : "/", params : {}
    };
    if(options) $.extend(this.opt, options);
    $opt = this.opt; $opt.defaultSortOrder = $opt.ascOrderCmd;
    $s = $opt.defaultSortField; $o = $opt.defaultSortOrder;
    this.each(function() {
      if(!this.tHead || !this.tBodies) return;
      $t = this;  
      $($opt.headerParentEl,this).each(function(index){
        if(!$(this).hasClass($opt.cssNoSort)){
          if(!$(this).hasClass($opt.cssHeader)) $(this).addClass($opt.cssHeader); 
          $(this).click(function(e) {
            reset(index); reverseSortClass(this); getSortField(this); update();
          });
        }
      });    
    });
    function reverseSortClass(el){
      if($(el).hasClass($opt.cssAsc)){
        $(el).removeClass($opt.cssAsc); $(el).addClass($opt.cssDesc);
        $o = $opt.descOrderCmd;
      }
      else {
        $(el).removeClass($opt.cssDesc); $(el).addClass($opt.cssAsc);
        $o = $opt.ascOrderCmd;
      }
    };
    function getSortField(el){
      if($(el).attr($opt.defaultSortAttr) != null) $s = $(el).attr($opt.defaultSortAttr);
    }
    function reset(di){
      $($opt.headerParentEl,$t).each(function(index){
        if(!$(this).hasClass($opt.cssNoSort)) {
          if(!$(this).hasClass($opt.cssHead)) $(this).addClass($opt.cssHead); 
          if(index!=di){ $(this).removeClass($opt.cssAsc); $(this).removeClass($opt.cssDesc); }
        }
      });
    };
    function update(){
      $.get($opt.url,$.extend({}, {"q":$s,"o":$o}, $opt.params),function(data){
        $($t.tBodies).replaceWith(data);
      });
    };
    return this;
  };
})(jQuery);

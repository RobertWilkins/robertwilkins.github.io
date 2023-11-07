
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


function prepare_css_doc()
{
var string1 , css_string , html_string ;
css_collect = [] ;
html_collect = [] ;
ROOT_H.id_string = "h" ;
calculate_id_string(ROOT_H) ;

html_print(ROOT_H) ;

html_string = html_collect.join("\n") + "\n" ;

css_string = "<style>\n" + 
    css_collect.join("\n") + "\n</style>\n" ;

string1 = "<html><head></head><body>\n" + 
    css_string + html_string + "</body></html>\n" ;

return string1 ;
}



function calculate_id_string(h0) 
{
var i ;
var base1 = h0.id_string + "_" ;
if ("under" in h0)
  for(i=0;i<h0.under.length;++i)
  { h0.under[i].id_string = base1 + i ;
    calculate_id_string(h0.under[i]) ;
  }
}


////////////////////////////////////////////////////////


function css_print(h)
{
css_collect.push(
   "#" + h.id_string + " { " + 
   margin_css(h) + padding_css(h) + border_width_css(h) + 
   "border-color: " + h.Dspec.border_color + " ; " +
   "border-style: " + h.Dspec.border_style + " ; " + 
   "min-height: "   + h.height + "px ; " +
   "width: "        + h.width  + "px ; " + 
   "float: left ; " + " } " 
   ) ;
}



function margin_css(h) { return "margin: " + margin_setting(h) + " ; " ;}
function padding_css(h) { return "padding: " + padding_setting(h) + " ; " ;}
function border_width_css(h) { return "border-width: " + border_width_setting(h) + " ; " ;}


function html_print(h)
{
var i , item ;
css_print(h) ;
html_collect.push("<div id=\'" + h.id_string + "\'>" ) ;
if ("under" in h)
  for(i=0;i<h.under.length;++i) html_print(h.under[i]) ;
if ("content" in h)
  for(i=0;i<h.content.length;++i)
  { item = h.content[i] ;
    if (item.is_img) html_collect.push("<img src=\'" + item.img_url + "\'>");
    else html_collect.push(item.richtext) ;
  }
html_collect.push("</div>") ;
}










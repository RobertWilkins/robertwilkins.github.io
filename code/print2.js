
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


//// css_print.create is a copy/modify of manual_type.create
///  for printing to a textarea box the css/html produced by the app

css_window.create = function() {
var margin1 , text_width , text_height , d0 , tbox ;
var b1 , d3 ;
margin1 = 10;
text_width = 550 ;
text_height = 700 ;
d0 = makeDiv() ;
tbox = mkTextArea() ;
tbox.style.width = text_width + "px" ;
tbox.style.height = text_height + "px" ;
tbox.style.margin = margin1 + "px" ;
d0.style.width = (text_width+2*margin1) + "px" ;
d0.appendChild(tbox);

b1 = mkButton("Go Back to Main UI") ;
d3 = makeDiv();
d3.appendChild(b1);
d0.appendChild(d3);
d3.style.margin = margin1 + "px" ;

b1.onclick = css_window.hit ;
css_window.text_box = tbox ;
css_window.panel = d0 ;
}


///////////////////////////////////////////////////////

css_window.initiate = function()
{
css_window.create() ;
alli_container.innerHTML = "" ;
alli_container.appendChild(css_window.panel) ;
css_window.text_box.value = prepare_css_doc() ;
}



css_window.clear = function()
{
css_window.panel = undefined ;
css_window.text_box = undefined ;
}


css_window.hit = function()
{
alli_container.innerHTML = "" ;
css_window.clear() ;
reset_back_to_default_alli() ;
}







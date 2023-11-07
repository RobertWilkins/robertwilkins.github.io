
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

/// need manual_type . reset() ????
/// need a hit_cancel ???

manual_type.create = function() {
var margin1 , text_width , text_height , d0 , tbox ;
var d1 , d2 , txt_descript , b1 , b2 , d3 , d4 ;
margin1 = 10;
text_width = 180 ;
text_height = 180 ;
d0 = makeDiv() ;
tbox = mkTextArea() ;
tbox.style.width = text_width + "px" ;
tbox.style.height = text_height + "px" ;
tbox.style.margin = margin1 + "px" ;
d0.style.width = (text_width+2*margin1) + "px" ;
d0.appendChild(tbox);
d1 = makeDiv() ;
d2 = makeDiv() ;
d0.appendChild(d1) ;
d0.appendChild(d2) ;
d1.innerHTML = "Enter short description: " ;
d1.style.margin = margin1 + "px" ;
txt_descript = mkInput() ;
txt_descript.style.width = text_width + "px" ;
d2.appendChild(txt_descript) ;
txt_descript.style.margin = margin1 + "px" ;

b1 = mkButton("Save to Local Tray") ;
b2 = mkButton("Save to Local Tray AND put in box");
d3 = makeDiv();
d4 = makeDiv();
d3.appendChild(b1);
d4.appendChild(b2);
d0.appendChild(d3);
d0.appendChild(d4);
d3.style.margin = margin1 + "px" ;
d4.style.margin = margin1 + "px" ;

b1.onclick = manual_type.hit1 ;
b2.onclick = manual_type.hit2 ;
manual_type.text_box = tbox ;
manual_type.descript_box = txt_descript ;
manual_type.panel = d0 ;
}


///////////////////////////////////////////////////////


manual_type.hit1 = function()
{
var data , desc ;
data = manual_type.text_box.value ;
desc = manual_type.descript_box.value ;
Tray.addSingleRichTextItem(data,desc) ;
reset_back_to_default_alli() ;
}
manual_type.hit2 = function()
{
var data , desc ;
data = manual_type.text_box.value ;
desc = manual_type.descript_box.value ;
Tray.addSingleRichTextItem(data,desc) ;
addSingleHTMLText_to_box(data,desc) ;
reset_back_to_default_alli() ;
}


///  this switches TO manual_type
///  hit() 
///  {
///  alli_container.innerHTML = "" ;
///  alli_container.appendChild(manual_type.panel) ;
///  }


/////////////////////////////////////////////////////

function addSingleHTMLText_to_box(rtext,desc)
{
if (CURRENT_BOX.subdivided) return ;
put_stuff_in_box([convert_htmltext_to_content_item(rtext,desc)]);
}

function convert_htmltext_to_content_item(htmltext,desc)
{
var item = {} ;
item.is_text = true ;
item.is_img = false ;
item.localinv = false ;
item.descript = desc ;
item.richtext = htmltext ;
return item ;
}














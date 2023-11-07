
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 



function hit_tray_to_current_box()
{
if ("under" in CURRENT_BOX)
  { // err-msg eventually
    Tray.uncheck_all() ;
    reset_back_to_default_alli() ;
    return ;
  }
Tray.SendToCurrentBox() ;
Tray.uncheck_all() ;
reset_back_to_default_alli() ;
}


function hit_tray_to_default()
  { reset_back_to_default_alli(); }



Tray.SendToCurrentBox = function()
{
var choices , items , k , w , item ;
choices = [] ;
items = [] ;
for(k=0;k<Tray.check_boxes.length;++k)
  { if (Tray.check_boxes[k].checked) choices.push(k);  }
if (choices.length==0) return ;
for (k=0;k<choices.length;++k)
  { w = choices[k] ;
    item = copy_content_item(Tray.data[w]) ;
    items.push(item) ;
  }
put_stuff_in_box(items);
}


/// edited March 13 2023 because new micro-API
Tray.AddEntryTrayPanel = function(desc)
{
let [ df1 , cbox ] = simCheckboxRow(desc) ;
Tray.inner_panel.appendChild(df1);
Tray.check_boxes.push(cbox) ;
}



Tray.transfer_from_browse_to_tray = function()
{
var m1 , m2 , k ;
m1 = Tray.data.length ;
for(k=0;k<Browse_Collect.length;++k) Tray.data.push(Browse_Collect[k]);
m2 = Tray.data.length ;
Browse_Collect = [] ;
for(k=m1;k<m2;++k) Tray.AddEntryTrayPanel(Tray.data[k].descript) ;
}



function tray_display_set_up()
{
var b1 , b2 ;
Tray.panel = makeDiv() ;
Tray.inner_panel = makeDiv() ;
b1 = mkButton("Back to Main Display");
b2 = mkButton("Add checked items to box");
b1.onclick = hit_tray_to_default ;
b2.onclick = hit_tray_to_current_box ;
Tray.panel.appendChild(b1);
Tray.panel.appendChild(b2);
Tray.panel.appendChild(Tray.inner_panel) ;
Tray.check_boxes = [] ;
Tray.data = [] ;
}



Tray.addSingleRichTextItem = function(richtext,descript)
{
var item = {} ;
item.is_img = false ;
item.is_text = true ;
item.localinv = false ;
item.richtext = richtext ;
item.descript = descript ;
Tray.data.push(item) ;
Tray.AddEntryTrayPanel(descript) ;
}



////////////////////////////////////////////////////////////

Tray.uncheck_all = function()
{
var k ;
for(k=0;k<Tray.check_boxes.length;++k)
  Tray.check_boxes[k].checked = false ;
}




function copy_content_item(item)
{
var item2 = {} ;
/// May 23 bug fix , stupid spelling mistake , item vs item2
if (item.is_text) item2.richtext = item.richtext ;
if (item.is_img)  item2.img_url  = item.img_url ;
item2.is_text = item.is_text ;
item2.is_img = item.is_img ;
item2.localinv = item.localinv ;
item2.descript = item.descript ;
return item2 ;
}






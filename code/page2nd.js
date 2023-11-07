
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

/// This is for the alternative web page that shows a small local inventory
/// of images and text snippets to choose from, at least for the initial 
/// prototype.

function hit_goto_inventory_page() {
div_main_page.style.display = "none" ;
div_inventory.style.display = "block" ;
}

////////////////////////////////////////////////////////////////////

function inventory_page_set_up() 
{
/// at top, inside inventory_page_set_up()
var k , img_url , short_desc , i0 , lab0 , b0 , d0 , w0 , h0 , w1 ;
var rich_text , d1 , tiny2 ;
var div_at_top = makeDiv();
var button1 = mkButton("Back to Main Page");
div_at_top.appendChild(button1);
div_inventory.appendChild(div_at_top);
button1.onclick = hit_back_to_main_page ;

/// now, set up the part of the inventory page images can be selected.
/// minor spelling change due to micro-API, March 13 2023
///  change makeLabel_block to simLabel
var descript_width = 140 ;
var tiny_topbottom_margin = 5 ;
for(k=0;k<AVAILABLE_IMAGES_THIS_PAGE.length;++k) {
  img_url = AVAILABLE_IMAGES_THIS_PAGE[k][0] ;
  short_desc = AVAILABLE_IMAGES_THIS_PAGE[k][1] ;
  i0 = makeImgI(img_url) ;   // makeImgI - I~Inventory,D~D-tree
  lab0 = simLabel(short_desc);
  b0 = mkButton("Collect") ;
  d0 = makeDiv();
  d0.appendChild(i0);
  d0.appendChild(lab0);
  d0.appendChild(b0);
  w0 = i0.naturalWidth ;
  h0 = i0.naturalHeight ;
  w1 = w0 ;
  if (w1<descript_width) w1 = descript_width ;
  lab0.style.width = w1 + "px" ;
  d0.style.width = w1 + "px" ;
  d0.style.height = "auto" ;
  lab0.style.margin = tiny_topbottom_margin + "px 0px " + 
                      tiny_topbottom_margin + "px 0px" ;
  i0.style.margin = "0px" ;
  d0.style.padding = "8px" ;
  d0.style.border = "3px solid black" ;
  d0.style.margin = "10px" ;
  div_inventory.appendChild(d0) ;
  b0.onclick = hit_img_inventory ;
}


/// now, set up the part of the inventory page where text is selected
/// minor spelling change due to micro-API, March 13, 2023
///  change makeLabel_block to simLabel
tiny_topbottom_margin = 8 ;
var default_text_snippet_width = 160 ;
for(k=0;k<AVAILABLE_TEXT_SNIPPETS_THIS_PAGE.length;++k) {
  rich_text = AVAILABLE_TEXT_SNIPPETS_THIS_PAGE[k][0] ;
  short_desc = AVAILABLE_TEXT_SNIPPETS_THIS_PAGE[k][1] ;
  d1 = makeDiv();
  d1.innerHTML = rich_text ;
  lab0 = simLabel(short_desc);
  b0 = mkButton("Collect");
  tiny2 = tiny_topbottom_margin ;
  d0 = makeDiv();
  d0.appendChild(d1);
  d0.appendChild(lab0);
  d0.appendChild(b0);
  w1 = default_text_snippet_width ;
  d0.style.height = "auto" ;
  d1.style.height = "auto" ;
  lab0.style.width = w1 ;
  d1.style.width = w1 ;
  d0.style.width = w1 ;
  lab0.style.margin = tiny2 + "px 0px " + tiny2 + "px 0px" ;
  d1.style.margin = "0px" ;
  d0.style.padding = "8px" ;
  d0.style.border = "3px solid black" ;
  d0.style.margin = "10px" ;
  div_inventory.appendChild(d0);
  b0.onclick = hit_text_snippet_inventory ;
}

/// Oct 2023 add this
var div_at_bottom = makeDiv();
div_at_bottom.innerHTML = photo_contributions ;
div_inventory.appendChild(div_at_bottom) ;

}   /// end function inventory_page_set_up() 

//////////////////////////////////////////////////////////////


function hit_img_inventory() 
{
var button0 , div0 , img0 , label0 , descript ;
var img_url , item , g ;
button0 = this ;
div0 = button0.parentNode ;
img0 = div0.childNodes[0] ;
label0 = div0.childNodes[1] ;
descript = label0.innerHTML ;
img_url = img0.src ;
item = {} ;
item.is_img = true ;
item.is_text = false ;
item.localinv = true ;
item.img_url = img_url ;
item.descript = descript ;
g = Log_This_Local_Descript(descript) ;
if (!g) return ;
Browse_Collect.push(item) ;
}


function hit_text_snippet_inventory() 
{
var button0 , div0 , div1 , label0 , descript ;
var rtext , item , g ;
button0 = this ;
div0 = button0.parentNode ;
div1 = div0.childNodes[0] ;
label0 = div0.childNodes[1] ;
descript = label0.innerHTML ;
rtext = div1.innerHTML ;
item = {} ;
item.is_img = false ;
item.is_text = true ;
item.localinv = true ;
item.richtext = rtext ;
item.descript = descript ;
g = Log_This_Local_Descript(descript) ;
if (!g) return ;
Browse_Collect.push(item) ;
}


function Log_This_Local_Descript(descript)
{
if (descript in LOCALINV_DESCRIPTS_CHOSEN) return false ;
LOCALINV_DESCRIPTS_CHOSEN[descript] = true ;
return true ;
// do not allow user to pick same local item twice
}



function hit_back_to_main_page()
{
div_inventory.style.display = "none" ;
div_main_page.style.display = "block" ;
// ?? err chk for items already collected
Tray.transfer_from_browse_to_tray() ;
alli_container.innerHTML = "" ;
alli_container.appendChild(Tray.panel);
scroll_up_alligator_conservative();
}







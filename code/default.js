
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


// Sept-Oct 2023, edits to add options for UI for root-width/height and leaf-box m,b,p settings
// March 9 2023, edits because changes to micro-API, it simplifies the code
default1.create = function()       /// for default panel in alligator 
{
var mgr_obj , f0 , d0 ;
mgr_obj = this ;
f0 = makeForm() ;
d0 = makeDiv() ;
d0.appendChild(f0) ;

// Sept 26 2023 edit , add button for "Prelim Config", and move "Explain" button
let [ div1b, buttonsb] = simButtonSet(["Prelim Config","Explain"]);
let [ div1 , buttons ] = simButtonSet(["+","-",">>","<<","hue","Panel Lock"]);
// let [ div1 , buttons ] = simButtonSet(["+","-",">>","<<","hue","Panel Lock","Explain"]);

let [ div2 , butt2 ] = simButtonRow("*","Browse for images, plain text, HTML") ;
let [ div3 , butt3 ] = simButtonRow("*","Type a section of plain text or HTML") ;
let [ div4 , butt4 ] = simButtonRow("*","Put content into this box (text, HTML, images)") ;
let [ div5 , butt5 ] = simButtonRow("*","Split this box into smaller boxes") ;
let [ div6 , butt6 ] = simButtonRow("*","Other modifications to this box") ;

f0.appendChild(div1b);  // Sept 26, add this

f0.appendChild(div1);
f0.appendChild(div2);
f0.appendChild(div3);
f0.appendChild(div4);
f0.appendChild(div5);
f0.appendChild(div6);

buttonsb[0].onclick = mgr_obj.hit_a1 ;  // add this Sept 26
buttonsb[1].onclick = mgr_obj.hit_a2 ;  // add this Sept 26

buttons[0].onclick = mgr_obj.hit_n1;
buttons[1].onclick = mgr_obj.hit_n2;
buttons[2].onclick = mgr_obj.hit_n3;
buttons[3].onclick = mgr_obj.hit_n4;
buttons[4].onclick = mgr_obj.hit_n5;
buttons[5].onclick = mgr_obj.hit_n6;
// buttons[6].onclick = mgr_obj.hit_n7; // Sept 26, take out, Explain moved elsewhere

butt2.onclick = mgr_obj.hit1;
butt3.onclick = mgr_obj.hit2;
butt4.onclick = mgr_obj.hit3;
butt5.onclick = mgr_obj.hit4;
butt6.onclick = mgr_obj.hit5;

mgr_obj.panel = d0 ;

mgr_obj.prelim_button1 = buttonsb[0] ; // Sept 26, add this
mgr_obj.prelim_button2 = buttonsb[1] ; // Sept 26, add this

mgr_obj.nav_button1 = buttons[0] ;
mgr_obj.nav_button2 = buttons[1] ;
mgr_obj.nav_button3 = buttons[2] ;
mgr_obj.nav_button4 = buttons[3] ;
mgr_obj.nav_button5 = buttons[4] ;
mgr_obj.nav_button6 = buttons[5] ;
// mgr_obj.nav_button7 = buttons[6] ; // Sept 26, take out

mgr_obj.reg_button1 = butt2 ;
mgr_obj.reg_button2 = butt3 ;
mgr_obj.reg_button3 = butt4 ;
mgr_obj.reg_button4 = butt5 ;
mgr_obj.reg_button5 = butt6 ;

}  // end function create() for default panel





// June 2023, add a button to go to css_print, to print css 
default2.create = function()
{
var mgr_obj , d0 , f0 , div1 , div6 , b6 , input6 , label6 ;
mgr_obj = this ;
d0 = makeDiv() ;
f0 = makeForm() ;
d0.appendChild(f0) ;

let [ div_cancel , b_cancel ] = simButtonRow("Go back","") ;

div1 = simLabel("Other changes for this box (the box in focus)") ;

let [ div2 , b2 ] = simButtonRow("Resize","Modify widths (or heights) of boxes inside this box") ;
let [ div3 , b3 ] = simButtonRow("Insert","Insert box into this box") ;
let [ div4 , b4 ] = simButtonRow("Empty","Empty this box (but box itself stays)") ;
let [ div5 , b5 ] = simButtonRow("Delete","Delete this box (and everything in it)") ;

div6 = makeDiv() ;
b6 = mkButton("Copy->clip") ;
input6 = mkInput() ;
label6 = mkLabel("Copy this box to clipboard. Short description required: ");
div6.appendChild(b6) ;
div6.appendChild(label6) ;
div6.appendChild(input6) ;

let [ div7 , b7 ] = simButtonRow("Clip->box","Copy from clipboard to this box (show clipboard)") ;

/// June 2023 edit, go to css_window in order to print css/html to a textarea box ;
let [ div8 , b8 ] = simButtonRow("PrintCSS","Send css to text box so I can copy/paste it") ;

f0.appendChild(div_cancel);
f0.appendChild(div1) ;
f0.appendChild(div2) ;
f0.appendChild(div3) ;
f0.appendChild(div4) ;
f0.appendChild(div5) ;
f0.appendChild(div6) ;
f0.appendChild(div7) ;
f0.appendChild(div8) ;

b2.onclick = mgr_obj.hit1 ;
b3.onclick = mgr_obj.hit2 ;
b4.onclick = mgr_obj.hit3 ;
b5.onclick = mgr_obj.hit4 ;
b6.onclick = mgr_obj.hit5 ;
b7.onclick = mgr_obj.hit6 ;
b8.onclick = mgr_obj.hit7 ;

b_cancel.onclick = mgr_obj.hit_cancel ;

mgr_obj.panel = d0 ;
mgr_obj.clip_descript = input6 ;

mgr_obj.button1 = b2 ;
mgr_obj.button2 = b3 ;
mgr_obj.button3 = b4 ;
mgr_obj.button4 = b5 ;
mgr_obj.button5 = b6 ;
mgr_obj.button6 = b7 ;
mgr_obj.button7 = b8 ;

mgr_obj.button_cancel = b_cancel ;

}   /// end default2-create()


///////////////////////////////////////////////////////////////////////////


/// October 17 2023, add hit_a1() & hit_a2() , prelim_config & explain


default1.hit_a1 = function()
{
alli_container.innerHTML = "" ;
alli_container.appendChild(prelim_config.panel) ;
scroll_up_alligator();
}


default1.hit_a2 = function()
{
alli_container.innerHTML = "" ;
alli_container.appendChild(explain.panel) ;
scroll_up_alligator_conservative();
}


/////////////////////////////////////////////////////



default1.hit_n1 = function() { goto_smaller_box() ;}
default1.hit_n2 = function() { goto_bigger_box() ;}
default1.hit_n3 = function() { goto_sibling_boxR() ;}
default1.hit_n4 = function() { goto_sibling_boxL() ;}
default1.hit_n6 = function() { toggle_panel_lock() ;}

/// still need hit_n5 (hue button) and hit_n7 (Explain button)

/// June 12 2023, add hit_n5() function
default1.hit_n5 = function()
{
alli_container.innerHTML = "" ;
hue.initiate() ;
}







default1.hit1 = function()
{
div_main_page.style.display = "none" ;
div_inventory.style.display = "block" ;
}

default1.hit2 = function()
{
alli_container.innerHTML = "" ;
alli_container.appendChild(manual_type.panel) ;
scroll_up_alligator();
}

default1.hit3 = function()
{
alli_container.innerHTML = "" ;
alli_container.appendChild(Tray.panel) ;
scroll_up_alligator_conservative();
}

default1.hit4 = function()
{
if (!(CURRENT_BOX.empty)) return ;
alli_container.innerHTML = "" ;
split_it[0].initiate() ;
}

default1.hit5 = function()
{
alli_container.innerHTML = "" ;
alli_container.appendChild(default2.panel) ;
default2.reset() ;
scroll_up_alligator();
}

default2.reset = function() { default2.clip_descript.value="";}

default2.hit_cancel = function() { reset_back_to_default_alli() ;}

function reset_back_to_default_alli() 
{ 
alli_container.innerHTML = "" ;
alli_container.appendChild(default1.panel) ;
scroll_up_alligator();
}


default2.hit1 = function()
{
if (CURRENT_BOX.subdivided)
  { alli_container.innerHTML = "" ;
    change_dim.initiate() ;
  }
}

default2.hit2 = function()
{
if (CURRENT_BOX.subdivided)
  { alli_container.innerHTML = "" ;
    insert_box[0].initiate() ;
  }
}

default2.hit3 = function()
{
empty_current_box() ;
reset_back_to_default_alli() ;
}


default2.hit4 = function()
{
if (illegal_delete_current_box())
  { reset_back_to_default_alli(); return; }
delete_current_box() ;
reset_back_to_default_alli() ;
}




default2.hit5 = function()
{
if (default2.clip_descript.value=="") return ;
Board.transfer_current_box_to_board(default2.clip_descript.value) ;
reset_back_to_default_alli() ;
}


default2.hit6 = function()
{
alli_container.innerHTML = "" ;
alli_container.appendChild(Board.panel) ;
scroll_up_alligator_conservative();
}



default2.hit7 = function()
{
alli_container.innerHTML = "" ;
css_window.initiate() ;
}




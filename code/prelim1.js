
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

// This early stuff is for global1.js 
// prelim_config = {} ;
// big_box = {} ;
// leaf_mbp = {} ;
// explain = {} ;
// prelim_config.create() ;
// explain.create() ;


//////////////////////////////////////////////////////////////////

prelim_config.create = function()
{
var mgr_obj , f0 , d0 , div1 ;
mgr_obj = this ;
f0 = makeForm() ;
d0 = makeDiv() ;
d0.appendChild(f0) ;

let [ div_cancel , b_cancel ] = simButtonRow("Go back","") ;

div1 = simLabel("Misc. configurations for the entire page") ;

let [ div2 , butt2 ] = simButtonRow("*","Change width or min-height of initial (largest) box") ;
let [ div3 , butt3 ] = simButtonRow("*","Reset margin/border/padding default for 'leaf' boxes") ;

f0.appendChild(div_cancel);
f0.appendChild(div1) ;
f0.appendChild(div2);
f0.appendChild(div3);

butt2.onclick = mgr_obj.hit1;
butt3.onclick = mgr_obj.hit2;
b_cancel.onclick = mgr_obj.hit_cancel ;

mgr_obj.panel = d0 ;
}   /// end prelim_config.create()


///////////////////////////////////////////////////////////////////////////////


prelim_config.hit1 = function()
{
alli_container.innerHTML = "" ;
big_box.initiate() ;
}

prelim_config.hit2 = function()
{
alli_container.innerHTML = "" ;
leaf_mbp.initiate() ;
}

prelim_config.hit_cancel = function() { reset_back_to_default_alli(); }


///////////////////////////////////////////////////////////////////////////


big_box.initiate = function()
{
var request={} ;
big_box.request = request ;
big_box.inp = {} ;
request.old_width = root_width ;
request.old_height = root_height ;
big_box.create(request) ;
alli_container.appendChild(big_box.panel);
scroll_up_alligator();
}


big_box.create = function(request)
{
var f0 , d0 , div_label1 , div_label2 ;
f0 = makeForm() ;
d0 = makeDiv() ;
d0.appendChild(f0) ;

var div_label1 = simLabel("Modify width & min-height for starter box, which contains all other boxes") ;
let [ d1 , input1 ] = simSmallTextInput("Width for starter box") ;
let [ d2 , input2 ] = simSmallTextInput("Minimum height for starter box") ;
var div_label2 = simLabel("  ") ;
let [ div_end , end_buttons ] = simButtonSet(["Apply","Cancel"]);

end_buttons[0].onclick = big_box.hit_apply_settings ;
end_buttons[1].onclick = big_box.hit_cancel ;

f0.appendChild(div_label1);
f0.appendChild(d1);
f0.appendChild(d2);
f0.appendChild(div_label2);
f0.appendChild(div_end);

this.panel = d0 ;
this.inp.big_width  = input1 ;
this.inp.big_height  = input2 ;
this.inp.big_width.value  = request.old_width ;
this.inp.big_height.value = request.old_height ;
}   /// end big_box.create() 



big_box.parse = function(request)
{
var new_width  = parseInt(this.inp.big_width.value) ;
var new_height = parseInt(this.inp.big_height.value) ;
if (isNaN(new_width) || new_width<=0) new_width = root_width ;
if (isNaN(new_height) || new_height<=0) new_height = root_height ;
request.width = new_width ;
request.height = new_height ;
}





big_box.hit_cancel = function() { big_box.clear(); reset_back_to_default_alli(); }

big_box.clear = function()
{
big_box.request = undefined ;
big_box.inp = {} ;
big_box.panel = undefined ;
}


big_box.hit_apply_settings = function()
{
big_box.parse(big_box.request) ;
change_width_height_master_box(big_box.request.width,big_box.request.height);
big_box.clear() ;
reset_back_to_default_alli() ;
}


///////////////////////////////////////////////////////////////


function change_width_height_master_box(new_width,new_height)
{
if (root_width==new_width && root_height==new_height) return ;
root_width = new_width ;
root_height = new_height ;
var BOX = ROOT_H ;
empty_NodeD(BOX,BOX.Dref) ;
shrink_H_node_width(BOX,new_width) ;
shrink_H_node_height(BOX,new_height) ;
HtoD(BOX,BOX.Dref) ;
refresh_current_box_dotted_outline() ;
update_position_of_alligator() ;
}














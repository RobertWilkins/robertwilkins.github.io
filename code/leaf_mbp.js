
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

leaf_mbp.initiate = function()
{
var request={} ;
leaf_mbp.request = request ;
leaf_mbp.inp = {} ;
/// any request.attr = BLA ?
leaf_mbp.create(request) ;
alli_container.appendChild(leaf_mbp.panel);
scroll_up_alligator();
}

/////////////////////////////////////////////

leaf_mbp.create = function(request)
{
var f0 , d0 , div_label1 , div_label2 , div_label3 , div_label4 ;
f0 = makeForm() ;
d0 = makeDiv() ;
d0.appendChild(f0) ;

var div_label1 = simLabel("Reset margin/border/padding for 'Leaf' Boxes") ;
var div_label2 = simLabel(" 'Leaf' boxes have no boxes inside, but have html & photos inside.");

let [ d1 , input1 ] = simSmallTextInput("Margin width") ;
let [ d2 , input2 ] = simSmallTextInput("Border width") ;
let [ d3 , input3 ] = simSmallTextInput("Padding width") ;

var div_label3 = simLabel("  ") ;

let [ d4 , input4 ] = simSmallTextInput("Border color") ;
let [ d5 , input5 ] = simSmallTextInput("Border style") ;

var div_label4 = simLabel("   ") ;
let [ div_end , end_buttons ] = simButtonSet(["Apply","Cancel"]);

end_buttons[0].onclick = leaf_mbp.hit_apply_settings ;
end_buttons[1].onclick = leaf_mbp.hit_cancel ;

f0.appendChild(div_label1);
f0.appendChild(div_label2);
f0.appendChild(d1);
f0.appendChild(d2);
f0.appendChild(d3);
f0.appendChild(div_label3);
f0.appendChild(d4);
f0.appendChild(d5);
f0.appendChild(div_label4);
f0.appendChild(div_end);

this.panel = d0 ;

this.inp.margin       = input1 ;
this.inp.border       = input2 ;
this.inp.padding      = input3 ;
this.inp.border_color = input4 ;
this.inp.border_style = input5 ;

if (leaf_box_global_settings==true)
{ 
  this.inp.margin.value       = leaf_box_global_margin ;
  this.inp.border.value       = leaf_box_global_border ;
  this.inp.padding.value      = leaf_box_global_padding ;
  this.inp.border_color.value = leaf_box_global_border_color ;
  this.inp.border_style.value = leaf_box_global_border_style ;
}

}   /// end leaf_mbp.create() 


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

leaf_mbp.parse = function(request)
{
var go_ahead=true ;
var margin1  = parseInt(this.inp.margin.value) ;
var border1  = parseInt(this.inp.border.value) ;
var padding1 = parseInt(this.inp.padding.value) ;
var bcolor1  = this.inp.border_color.value ;
var bstyle1  = this.inp.border_style.value ;

if (isNaN(margin1)  || margin1<0  || margin1>root_width) go_ahead = false ;
if (isNaN(border1)  || border1<0  || border1>root_width) go_ahead = false ;
if (isNaN(padding1) || padding1<0 || padding1>root_width) go_ahead = false ;

request.go_ahead = go_ahead ;
request.margin = margin1 ;
request.border = border1 ;
request.padding = padding1 ;
request.border_color = bcolor1 ;
request.border_style = bstyle1 ;
}  // end leaf_mbp.parse() 



///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


leaf_mbp.hit_apply_settings = function()
{
leaf_mbp.parse(leaf_mbp.request) ;
if (leaf_mbp.request.go_ahead == true )
  modify_leaf_box_mbp_settings(leaf_mbp.request) ;
leaf_mbp.clear() ;
reset_back_to_default_alli() ;
}


//////////////////////////////////////////////////////

leaf_mbp.hit_cancel = function() { leaf_mbp.clear(); reset_back_to_default_alli(); }

leaf_mbp.clear = function()
{
leaf_mbp.request = undefined ;
leaf_mbp.inp = {} ;
leaf_mbp.panel = undefined ;
}


////////////////////////////////////////////////////////

function modify_leaf_box_mbp_settings(request)
{
leaf_box_global_settings     = true ;
leaf_box_global_margin       = request.margin ;
leaf_box_global_border       = request.border ;
leaf_box_global_padding      = request.padding ;
leaf_box_global_border_style = request.border_style ;
leaf_box_global_border_color = request.border_color ;
find_leaf_boxes_to_reset_mbp(ROOT_H);
refresh_current_box_dotted_outline();
update_position_of_alligator();
}


function find_leaf_boxes_to_reset_mbp(h)
{
var i ;
if (h.subdivided)
 { for(i=0;i<h.under.length;++i)
     find_leaf_boxes_to_reset_mbp(h.under[i]) ;
 }
else
 reset_mbp_this_leaf_box(h) ;
}


function reset_mbp_this_leaf_box(h)
{
empty_NodeD(h,h.Dref);
create_mbp_config(h);
inner_width_height_recalc(h);
HtoD(h,h.Dref);
}




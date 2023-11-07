
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

function change_background_color(str_color)
{
if (str_color==undefined || str_color=="") return ;
CURRENT_BOX.Dspec.background_color = str_color ;
CURRENT_BOX.Dref.style.backgroundColor = str_color ;
}





function modify_widths_heights_because_custom_mbp_install(request) 
{
var C = CURRENT_BOX ;
empty_NodeD(C,C.Dref);
create_custom_mbp_config(C,request) ;
shrink_H_node_width_after_MBP_custom_change(C) ;
shrink_H_node_height_after_MBP_custom_change(C) ;
HtoD(C,C.Dref) ;
update_position_of_alligator() ;
}



function create_custom_mbp_config(h,request) 
{
var i , j ;
h.Dspec.gap = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]] ;
for(i=0;i<4;++i) 
 for(j=0;j<3;++j) h.Dspec.gap[i][j] = request.gap[i][j] ;
h.Dspec.using_leaf_box_default = false ;
h.Dspec.custom_mbp_spec = true ;
h.Dspec.border_style = request.border_style ;
h.Dspec.border_color = request.border_color ;
}


/// June 14 , for hue code
/// June 14 , copy & modify of shrink_H_node_width()
/// edit April 30 2023, to deal with m/b/p issues 
/// input argument, new_width is OUTER WIDTH
function shrink_H_node_width_after_MBP_custom_change(h)
{
var i , m ;
var w = [] ;
var old_inner_width = h.width ;
/// h.width0 (outer width) here does not change
inner_width_recalc(h) ;        // inner_width==h.width is re-calculated BECAUSE mbp change
var new_inner_width = h.width ;
if (h.horiz==true)
{ m = h.under.length ;
  for(i=0;i<m;++i) w[i] = h.under[i].width0 ;
  for(i=0;i<m;++i) w[i] = Math.floor(w[i]*(new_inner_width/old_inner_width)) ;
  finetune_wh_shrink(w,new_inner_width) ;
  for(i=0;i<m;++i) shrink_H_node_width(h.under[i],w[i]) ;
}
if (h.vert==true)
  for(i=0;i<h.under.length;++i) 
    shrink_H_node_width(h.under[i],new_inner_width) ;
}   /// end function shrink_H_node_width()


/// June 14 , for hue code
/// June 14 , copy & modify of shrink_H_node_height()
/// edit April 30 2023, to deal with m/b/p issues 
function shrink_H_node_height_after_MBP_custom_change(h)
{
var i , m ;
var w = [] ;
var old_inner_height = h.height ;
/// h.height0 (outer height) here does not change
inner_height_recalc(h) ;
var new_inner_height = h.height ;
if (h.vert==true)
{ m = h.under.length ;
  for(i=0;i<m;++i) w[i] = h.under[i].height0 ;
  for(i=0;i<m;++i) w[i] = Math.floor(w[i]*(new_inner_height/old_inner_height)) ;
  finetune_wh_shrink(w,new_inner_height) ;
  for(i=0;i<m;++i) shrink_H_node_height(h.under[i],w[i]) ;
}
if (h.horiz==true)
  for(i=0;i<h.under.length;++i) 
    shrink_H_node_height(h.under[i],new_inner_height) ;
}   /// end function shrink_H_node_height()



/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


/// April 27 2023, edits because of more careful handling
/// of margin/border/padding settings
/// sadly, same required of split_it[0].initiate() 
function split_box_smaller_boxes(request)
{
var i ;
var C = CURRENT_BOX ;
var N = request.num_boxes ;
var vh = request.v_or_h ;
var dims = request.size_vector ;

C.num_boxes = N ;
C.v_or_h = vh ;
C.empty = false ;
C.subdivided = true ;

if (vh=="Vertical") C.vert = true ;
else if (vh=="Horizontal") C.horiz = true ;

C.under = [] ;

create_mbp_config(C) ;
inner_width_height_recalc(C) ;

for(i=0;i<N;++i) C.under.push(NodeH()) ;
for(i=0;i<N;++i)
  { C.under[i].slot = i ;
    C.under[i].above = C ;
  }

if (vh=="Vertical")
 for(i=0;i<N;++i)
 { C.under[i].width0  = C.width ;
   C.under[i].height0 = dims[i] ;
   create_mbp_config(C.under[i]) ;
   inner_width_height_recalc(C.under[i]) ;
 }
else if (vh=="Horizontal")
 for(i=0;i<N;++i)
 { C.under[i].width0  = dims[i] ;
   C.under[i].height0 = C.height ;
   create_mbp_config(C.under[i]) ;
   inner_width_height_recalc(C.under[i]) ;
 }

HtoD(C,C.Dref) ;

}    //// end split_box_smaller_boxes()


//////////////////////////////////////////


function inner_width_height_if_were_not_leaf_box(h)
{
var info1 = {} ;
// if ("Dspec" in h && "using_leaf_box_default" in h.Dspec &&
//        h.Dspec.using_leaf_box_default==true )
if ( h.Dspec.using_leaf_box_default==true )
 { // h.Dspec.custom_mbp_spec therefore must be false
   info1.width = h.width0 ;
   info1.height = h.height0 ;
 }
else 
 { info1.width = h.width ;
   info1.height = h.height ;
 }
return info1 ;
}


////////////////////////////////////////////////////


function create_mbp_config(h)
{
var i ;
var D = h.Dspec ;
if (h.Dspec.custom_mbp_spec==true) return ; // do not overwrite custom spec
D.gap = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]] ;
D.border_style = "solid" ;
D.border_color = "black" ;
D.using_leaf_box_default = false ;
if (leaf_box_global_settings==true && h.subdivided==false)
{ D.using_leaf_box_default = true ;
  D.border_color = leaf_box_global_border_color ;
  D.border_style = leaf_box_global_border_style ;
  for(i=0;i<4;++i) D.gap[i][0] = leaf_box_global_margin  ;
  for(i=0;i<4;++i) D.gap[i][1] = leaf_box_global_border  ;
  for(i=0;i<4;++i) D.gap[i][2] = leaf_box_global_padding  ;
}
}



function eliminate_mbp_config(h)
{
var D = h.Dspec ;
if (h.Dspec.custom_mbp_spec==false) return ;
D.custom_mbp_spec = false ;
D.gap = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]] ;
D.border_style = "solid" ;
D.border_color = "black" ;
D.using_leaf_box_default = false ;
}


///////////////////////////////////////////////////////


function inner_width_height_recalc(h)
{
h.width  = h.width0  - horizontal_gap(h) ;
h.height = h.height0 - vertical_gap(h) ;
}

function inner_width_recalc(h)
{
h.width  = h.width0  - horizontal_gap(h) ;
}

function inner_height_recalc(h)
{
h.height = h.height0 - vertical_gap(h) ;
}

function horizontal_gap(h)
{
var g = h.Dspec.gap ;
return g[1][0] + g[1][1] + g[1][2] + g[3][0] + g[3][1] + g[3][2] ;
}

function vertical_gap(h)
{
var g = h.Dspec.gap ;
return g[0][0] + g[0][1] + g[0][2] + g[2][0] + g[2][1] + g[2][2] ;
}


///////////////////////////////////////////////////////


function copyDspec(dspec)
{
var i , j ;
var d2 = {} ;
d2.gap = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]] ;
for(i=0;i<4;++i) 
 for(j=0;j<3;++j) d2.gap[i][j] = dspec.gap[i][j] ;
d2.custom_mbp_spec = dspec.custom_mbp_spec ;
d2.using_leaf_box_default = dspec.using_leaf_box_default ;
d2.border_style = dspec.border_style ;
d2.border_color = dspec.border_color ;
d2.background_color = dspec.background_color ;
return d2 ;
}


function margin_setting(h)
{
var g = h.Dspec.gap ;
return g[0][0] + "px " + g[1][0] + "px " + g[2][0] + "px " + g[3][0] + "px" ;
}

function border_width_setting(h)
{
var g = h.Dspec.gap ;
return g[0][1] + "px " + g[1][1] + "px " + g[2][1] + "px " + g[3][1] + "px" ;
}

function padding_setting(h)
{
var g = h.Dspec.gap ;
return g[0][2] + "px " + g[1][2] + "px " + g[2][2] + "px " + g[3][2] + "px" ;
}





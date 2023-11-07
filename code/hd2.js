
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

function NodeH()
{
var h = {} ;
h.Dref = undefined ;
// eventually, set .Dspec ;
h.hhid = HHID_counter + "" ;
Hash_H[h.hhid] = h ;
HHID_counter++ ;
h.empty = true ;
h.num_boxes = 0 ;
h.horiz = false ;
h.vert = false ;
h.subdivided = false ;
h.text_img = false ;

/// May 1 2023 edit, for m/b/p config
h.Dspec = {} ;
h.Dspec.gap = [ [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] ] ;
h.Dspec.custom_mbp_spec = false ;
h.Dspec.using_leaf_box_default = false ;
h.Dspec.border_style = "solid" ;
h.Dspec.border_color = "black" ;
h.Dspec.background_color = undefined ;

return h ;
}

function NodeD()
{
var d = document.createElement("DIV") ;
// or style.float ??
// d.setAttribute("float","left") ;
d.style.cssFloat = "left" ;
return d ;
}

///////////////////////////////////////////


function empty_NodeHD(h0,d0)
{
/// do not touch h0.Dref==d0, nor d0.data-hhid
///  ??? height/width?   eventually .Dspec?

/// h0.Dspec = {} ;   // to clear out m/b/p config , April 27 2023

/// May 1 2023, edit for m/b/p config
/// Do not touch outer width/height, .width0 & .height0
h0.width = h0.width0 ;
h0.height = h0.height0 ;
h0.Dspec.gap = [ [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] ] ;
h0.Dspec.custom_mbp_spec = false ;
h0.Dspec.using_leaf_box_default = false ;
h0.Dspec.border_style = "solid" ;
h0.Dspec.border_color = "black" ;

empty_NodeD(h0,d0) ;
if ("under" in h0) delete h0.under ;
if ("content" in h0) delete h0.content ;
if ("v_or_h" in h0 ) delete h0.v_or_h ;
h0.num_boxes = 0 ;
h0.empty = true ;
h0.horiz = false ;
h0.vert = false ;
h0.subdivided = false ;
h0.text_img = false ;
}    /// end empty_NodeHD()



function empty_NodeD(h0,d0)
{
var i ;
/// width/height???    do not turn off outline
if ("under" in h0) 
  for(i=0;i<h0.under.length;++i)
    empty_Dref_underneath(h0.under[i]) ;
if (d0===undefined) return ;
d0.onclick = undefined ;
d0.innerHTML = "" ;
/// edit April 27 2023: clear m/b/p settings 
d0.style.margin = "0" ;
d0.style.borderWidth = "0" ;
d0.style.padding = "0" ;
}

function empty_Dref_underneath(h)
{
var i ;
h.Dref = undefined ;
if ("under" in h)
  for(i=0;i<h.under.length;++i)
    empty_Dref_underneath(h.under[i]) ;
}


/////////////////////////////////////////////////////


function delete_current_box()
{
if (CURRENT_BOX==ROOT_H) return ;
if (CURRENT_BOX.above.num_boxes<=2) return ;
var slot = CURRENT_BOX.slot ;
goto_bigger_box() ;
delete_box(slot) ;
update_position_of_alligator() ;
}

function illegal_delete_current_box()
{
if (CURRENT_BOX===ROOT_H) return true ;
if (CURRENT_BOX.above.num_boxes<=2) return true ;
return false ;
}


/// April 30 edit
function empty_current_box()
{
empty_NodeHD(CURRENT_BOX,CURRENT_BOX.Dref) ;
create_mbp_config(CURRENT_BOX) ;
inner_width_height_recalc(CURRENT_BOX) ;
HtoD(CURRENT_BOX,CURRENT_BOX.Dref) ;
update_position_of_alligator()
}


///////////////////////////////////////////////////////

function suggest_new_sizes_deleting_box(slot_to_delete,old_sizes)
{
var j ;
var w = [] ;
var tot1 = 0 ;
for(j=0;j<old_sizes.length;++j) tot1+=old_sizes[j] ;
var tot1_less = tot1 - old_sizes[slot_to_delete] ;
for(j=0;j<slot_to_delete;++j) w.push(old_sizes[j]) ;
for(j=slot_to_delete+1;j<old_sizes.length;++j) w.push(old_sizes[j]) ;
for(j=0;j<w.length;++j) w[j] = Math.floor(w[j]*(tot1/tot1_less)) ;
finetune_wh_shrink(w,tot1) ;
return w ;
}  

///////////////////////


function delete_box(slot_to_delete)
{
var new_sizes ;
var C = CURRENT_BOX ;
var old_sizes = child_sizes(CURRENT_BOX) ;
empty_NodeD(C,C.Dref) ;
new_sizes = suggest_new_sizes_deleting_box(slot_to_delete,old_sizes) ;
just_delete_box(slot_to_delete) ;
reset_widths_or_heights_inside_box(new_sizes);
HtoD(C,C.Dref) ;
}


function just_delete_box(k)
{
var j ;
var C = CURRENT_BOX ;
var N = C.num_boxes ;
var under2 = [] ;
for(j=0;j<k;++j) under2.push(C.under[j]) ;
for(j=k+1;j<N;++j) under2.push(C.under[j]) ;
for(j=0;j<under2.length;++j) under2[j].slot = j ;
C.under = under2 ;
C.num_boxes = C.under.length ;
}

/// April 27 edit, because m/b/p config details
function just_insert_box(k)
{
var j ;
var C = CURRENT_BOX ;
var N = C.num_boxes ;
var under2 = [] ;
var h_new = NodeH() ;
h_new.above = C ;

create_mbp_config(h_new) ;
if (C.v_or_h=="Horizontal") 
 { h_new.height0 = C.height ;
   inner_height_recalc(h_new) ;
 }
else if (C.v_or_h=="Vertical") 
 { h_new.width0 = C.width ;
   inner_width_recalc(h_new) ;
 }

for(j=0;j<k;++j) under2.push(C.under[j]) ;
under2.push(h_new) ;
for(j=k;j<N;++j) under2.push(C.under[j]) ;
for(j=0;j<under2.length;++j) under2[j].slot = j ;
C.under = under2 ;
C.num_boxes = C.under.length ;
}




















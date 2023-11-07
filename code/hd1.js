
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

function put_stuff_in_box(items)
{
if (items.length===0) return ;
var i ;
var h0 = CURRENT_BOX ;
var d0 = h0.Dref ;
d0.innerHTML = "" ;
if (!("content" in h0)) h0.content = [] ;
for(i=0;i<items.length;++i) h0.content.push(copy_content_item(items[i]));
put_content_in_D(h0);
h0.empty = false ;
h0.subdivided = false ;
h0.text_img = true ;
update_position_of_alligator() ;
}


function put_content_in_D(h)
{
var i , item ;
var d0 = h.Dref ;
d0.innerHTML = "" ;
for(i=0;i<h.content.length;++i)
{ item = h.content[i] ;
  if (item.is_text)
    parseHTML_then_append(d0,item.richtext) ;
  if (item.is_img)
    d0.appendChild(makeImgD(item.img_url));
}
}


function parseHTML_then_append(d1,str2)
{
var d0 = document.createElement("DIV") ;
d0.innerHTML = str2 ;
while (d0.firstChild)
   d1.appendChild(d0.firstChild) ;
}





///////////////////////////////////////////////////////////////////



/// June 5 2023, bug found , do not call HtoD(h,d) until h.Dref==d
///  so change order of statements in "under" section of code   
function HtoD(h0,d0) 
{
var i , d1 ;
configure_H_D(h0,d0);

//// Oct 29 2023 BUG SEARCH 
//// if (h0.empty)
//// { d0.innerHTML = d0.style.width + "<br>" + d0.style.margin + "<br>" + d0.style.borderWidth ; }

if ("content" in h0) 
 { put_content_in_D(h0) ;
   // configure_H_D_2(h0,d0) ;
 }
if ("under" in h0)
 { for(i=0;i<h0.under.length;++i)
   { d1 = NodeD() ;
     /// HtoD(h0.under[i],d1) ;  // June 5, put 3 lines down
     h0.under[i].Dref = d1 ;
     d1.setAttribute("data-hhid",h0.under[i].hhid) ;
     d0.appendChild(d1) ;
     HtoD(h0.under[i],d1)   /// June 5 2023, put here instead
   }
 }
}      // end HtoD()


//////////////////////////////////////////////////////

/// substantial edits, May 4 2023 because of m/b/p details
function configure_H_D(h0,d0)
{
/// d0.width = h0.width - 2*base_mp ;
/// d0.style.minHeight = (h0.height - 2*base_mp) + "px" ;
// eventually, deviate from global default, read settings from h0.Dspec

/// new code May 4 2023
d0.style.width     = h0.width  + "px" ;
d0.style.minHeight = h0.height + "px" ;

d0.style.margin      = margin_setting(h0) ;
d0.style.borderWidth = border_width_setting(h0) ;
d0.style.padding     = padding_setting(h0) ;

d0.style.borderStyle = h0.Dspec.border_style ;
d0.style.borderColor = h0.Dspec.border_color ;

if (h0.Dspec.background_color !== undefined)
  d0.style.backgroundColor = h0.Dspec.background_color ;

d0.onclick = undefined ;
if (!("under" in h0)) d0.onclick = mouse_click_to_change_CB ;
}








function configure_H_D_2(h0,d0)
{
/// if you find some of the config cannot be done 
/// until after text & images put into d0
}


///////////////////////////////////////////////////////

// April 27 2023 spelling change width->width0
function clip_to_current_box(h0)
{
var C = CURRENT_BOX ;
var old_c_width = C.width0 ;
var old_c_height = C.height0 ;
empty_NodeHD(C,C.Dref) ;
deepcopy_H_internals(h0,C);
shrink_H_node_width(C,old_c_width) ;
shrink_H_node_height(C,old_c_height) ;
HtoD(C,C.Dref);
update_position_of_alligator() ;
}


//////////////////////


function modify_widths_heights(request)
{
var C = CURRENT_BOX ;
empty_NodeD(C,C.Dref);
reset_widths_or_heights_inside_box(request.size_vector) ;
HtoD(C,C.Dref) ;
update_position_of_alligator() ;
}

function insert_box_and_modify_widths_heights(request)
{
var C = CURRENT_BOX ;
empty_NodeD(C,C.Dref);
just_insert_box(request.slot_new_box) ;
reset_widths_or_heights_inside_box(request.size_vector) ;
HtoD(C,C.Dref) ;
update_position_of_alligator() ;
}


function reset_widths_or_heights_inside_box(new_sizes)
{
var j ;
var C = CURRENT_BOX ;
var N = C.num_boxes ;
if (C.v_or_h==="Horizontal")
   for(j=0;j<N;++j) shrink_H_node_width(C.under[j],new_sizes[j]) ;
else if (C.v_or_h==="Vertical")
   for(j=0;j<N;++j) shrink_H_node_height(C.under[j],new_sizes[j]) ;
}




//////////////////////////////////////////////////////////


function deepcopy_H_internals(h,h2)
{
var i , h_new ;
h2.width      =  h.width ;
h2.height     =  h.height ;
h2.horiz      =  h.horiz ;
h2.vert       =  h.vert ;
h2.empty      =  h.empty ;
h2.subdivided =  h.subdivided ;
h2.text_img   =  h.text_img ;
h2.num_boxes  =  h.num_boxes ;

// edit April 27 2023 :
h2.width0 = h.width0 ;
h2.height0 = h.height0 ;
h2.Dspec = copyDspec(h.Dspec) ;

if ("content" in h)
{ h2.content = [] ;
  for(i=0;i<h.content.length;++i)
     h2.content.push(copy_content_item(h.content[i]));
}

if ("under" in h)
{ h2.under = [] ;
  h2.v_or_h = h.v_or_h ;
  for(i=0;i<h.under.length;++i)
  { h_new = NodeH() ;
    deepcopy_H_internals(h.under[i],h_new) ;
    h2.under.push(h_new) ;
    h_new.above = h2 ;
    h_new.slot = i ;
  }
}

}    /// end deepcopy_H_internals()


//////////////////////////////////////////////////////


/// edit April 30 2023, to deal with m/b/p issues 
/// input argument, new_width is OUTER WIDTH
function shrink_H_node_width(h,new_width)
{
var i , m ;
var w = [] ;
var old_inner_width = h.width ;
h.width0 = new_width ;         // change outer width of h
inner_width_recalc(h) ;        // inner_width==h.width is re-calculated
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


/// edit April 30 2023, to deal with m/b/p issues 
function shrink_H_node_height(h,new_height)
{
var i , m ;
var w = [] ;
var old_inner_height = h.height ;
h.height0 = new_height ;
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





function finetune_wh_shrink(vec,new_total)
{
/// err-chk are integers, not floating point
/// if what you expect to be simply integers are not, can be REAL PROBLEM
var i , k ;
var tot2 = 0 ;
if (vec.length==0) return ;
var m = vec.length ;
for(i=0;i<m;++i) tot2 += vec[i] ;
if (tot2 == new_total) return ;
if (tot2<new_total)
{ k=0 ;
  while(true)
  { vec[k]++ ;
    tot2++ ;
    if (tot2==new_total) break ;
    if (k==m-1) k=0 ;
     else       k=k+1 ;
  }
}
else if (tot2>new_total)
{ k=m-1 ;
  while(true)
  { vec[k]-- ;
    tot2-- ;
    if (tot2==new_total) break ;
    if (k==0) k=m-1 ;
     else     k=k-1 ;
  }
}

}   /// end function finetune_wh_shrink() 






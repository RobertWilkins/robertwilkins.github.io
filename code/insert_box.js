
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


// March 9, edit because changes to micro-API
insert_box[0].create = function(request)
{
var to_set ;
var mgr_obj = this ;
var r = request.v_or_h[0] ;
var N = request.num_boxes - 1 ;
var space1 = request.available_space ;
var space2 = space1 + "px" ;
if (r=="V") to_set="height(min)"; else to_set="width";

var str1 = "There are already " + N + " boxes inside box in focus, at positions 1-" + N ;
var str2 = "Which position will new box have (choose from 1 to " + (N+1) + ")?" ;
var df1 = simLabel(str1) ;
var df2 = simLabel(str2) ;
let [ df3 , input1 ] = simTextInput() ;

var str3 = "Total " + to_set + " of box in focus is " + space2 + " ." ;
var str4 = "Select initial " + to_set + " of new box(obviously much smaller than " + space2 + ") ." ;
var df4 = simLabel(str3) ;
var df5 = simLabel(str4) ;
let [ df6 , input2 ] = simTextInput() ;

var str5 = "The width(or height) of each other child box will be " +
       "shrunk proportionally, but you will have chance to adjust each smaller box width " +
       "(or height) in next data entry panel" ;
var df7 = simLabel(str5) ;

wrapStdDivForm(this,[df1,df2,df3,df4,df5,df6,df7]) ;

this.inp.text_pos = input1 ;
this.inp.text_width_new_box = input2 ;
}  //  create() for insert_box[0]


////////////////////////////////////////////////////////////////////////////////////////



insert_box[0].parse = function(request)
{
var N = request.num_boxes ;
var space0 = request.available_space ;
var invalid_value = false ;
var slot = parseInt(this.inp.text_pos.value) - 1 ;
var width1 = parseInt(this.inp.text_width_new_box.value) ;
if (isNaN(slot) || isNaN(width1) || slot<0 || width1<2 ||
    slot>N-1 || width1>=space0-2*N )  invalid_value = true ;
this.err_msg = "" ;
this.error_box.innerHTML = "" ;
if (invalid_value)
 { this.err_msg = "bad data";
   this.error_box.innerHTML = this.err_msg;
   return ;
 }
request.slot_new_box = slot ;
request.width_new_box_guess = width1 ;
this.preprocess_initial_widths(request) ;
}  // parse() for insert_box[0]


////////////////////////////////////////////////////////////////////////////

insert_box[0].initiate = function() {
var request = {} ;
insert_box[0].request = request ;
insert_box[1].request = request ;
insert_box[1].previous_green_slot = undefined ;
request.v_or_h = CURRENT_BOX.v_or_h ;
var vh = request.v_or_h[0] ;
request.parent_width  = CURRENT_BOX.width ;
request.parent_height = CURRENT_BOX.height ;
if (vh=="V") request.available_space = request.parent_height ;
 else        request.available_space = request.parent_width ;
request.num_boxes = CURRENT_BOX.num_boxes + 1 ;
request.initial_child_sizes = child_sizes(CURRENT_BOX) ;
this.create(request) ;
alli_container.appendChild(this.panel);
scroll_up_alligator();
}    // end initiate() @ insert_box[0]


/// spelling edit April 27 2023, width -> width0
function child_sizes(box) {
if (!box.subdivided) return undefined ;
/// if (box.v_or_h=="Vertical") return child_heights(box) ;
///   else                      return child_widths(box);
var i , sizes = [] ;
if (box.v_or_h=="Vertical")
  for(i=0;i<box.under.length;++i) sizes.push(box.under[i].height0) ;
else if (box.v_or_h=="Horizontal")
  for(i=0;i<box.under.length;++i) sizes.push(box.under[i].width0) ;
return sizes ;
}


/// default2 section, select insert_box option
///  hit() {
///  swap_out_default_alli_panel() ;
///  if (CURRENT_BOX.subdivided) insert_box[0].initiate() ;
///    else                       split_it[0].initiate() ;
///  }


////////////////////////////////////////////////////////////////////////


insert_box[0].hit = function() {
var mgr_obj , mgr_obj2 ;
mgr_obj = insert_box[0] ;
mgr_obj2 = insert_box[1] ;
mgr_obj.parse(mgr_obj.request) ;
if (mgr_obj.err_msg!="") return ;
disable_input_controls(mgr_obj.panel) ;
mgr_obj2.create(mgr_obj2.request) ;
alli_container.appendChild(mgr_obj2.panel) ;
scroll_up_alligator();
}


////////////////////////////////////////////////////////////////////////////


insert_box[0].preprocess_initial_widths = function(request) {
var i ;
var N = request.num_boxes ;
var space0 = request.available_space ;
var old_widths = request.initial_child_sizes ;
var slot1 = request.slot_new_box ;
var width1 = request.width_new_box_guess ;
var space3 = space0 - width1 ;
var w = [] ;
for(i=0;i<old_widths.length;++i)
   w[i] = Math.floor(old_widths[i]*(space3/space0)) ;
finetune_wh_shrink(w,space3) ;
var w2 = [] ;
for(i=0;i<slot1;++i) w2[i] = w[i] ;
w2[slot1] = width1 ;
for(i=slot1+1;i<N;++i) w2[i] = w[i-1] ;
request.sizes_initial = w2 ;
}   /// function preprocess_initial_widths()


///////////////////////////////////////////////////////



insert_box[1].hit = function()
{
var mgr_obj = insert_box[1] ;
mgr_obj.parse(mgr_obj.request) ;
if (mgr_obj.err_msg!="") return ;
mgr_obj.execute(mgr_obj.request) ;   // June 5 bug fix, "mgr_obj." was missing
mgr_obj.clear()
alli_container.innerHTML = "" ;
reset_back_to_default_alli() ;
}


insert_box[1].execute = function(request) {
  insert_box_and_modify_widths_heights(request) ;
}


///////////////////////////////////////////////////////////


/// June 5 2023, DUMB SPELLING MISTAKE, insert_box not input_box 
insert_box[1].clear = function()
{
var c1 = insert_box[0] ;   // June 5 , fix spelling mistake, (input_box, really?)
var c2 = insert_box[1] ;
c1.inp = {} ;
c2.inp = {} ;
c1.request = undefined ;
c2.request = undefined ;
c1.panel = undefined ;
c2.panel = undefined ;
c1.next_button = undefined ;
c2.next_button = undefined ;
c1.cancel_button = undefined ;
c2.cancel_button = undefined ;
c1.error_box = undefined ;
c2.error_box = undefined ;
c1.err_msg = undefined ;
c2.err_msg = undefined ;
c2.previous_green_slot = undefined ;
}


insert_box[1].hit_cancel = function()
{
insert_box[1].clear() ;
alli_container.innerHTML = "" ;
reset_back_to_default_alli() ;
}
insert_box[0].hit_cancel = insert_box[1].hit_cancel ;










///// above is for insert_box
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//// below is for change_dim


change_dim.initiate = function()
{
var request = {} ;
change_dim.request = request ;
change_dim.previous_green_slot = undefined ;
request.parent_width = CURRENT_BOX.width ;
request.parent_height = CURRENT_BOX.height ;
request.v_or_h = CURRENT_BOX.v_or_h ;
var vh = request.v_or_h[0] ;
request.num_boxes = CURRENT_BOX.num_boxes ;
if (vh==="V") request.available_space = request.parent_height ;
 else         request.available_space = request.parent_width ;
request.sizes_initial = child_sizes(CURRENT_BOX) ;
this.create(request);
alli_container.appendChild(this.panel);
scroll_up_alligator();
}     


change_dim.hit = function()
{
var mgr_obj = change_dim ;
mgr_obj.parse(mgr_obj.request) ;
if (mgr_obj.err_msg!="") return ;
mgr_obj.execute(mgr_obj.request) ;     /// June 5 2023 bug fix, mgr_obj. was missing
mgr_obj.clear() ;
alli_container.innerHTML = "" ;
reset_back_to_default_alli() ;
}


change_dim.execute = function(request)
  { modify_widths_heights(request)   }



change_dim.clear = function()
{
var c = change_dim ;
c.request = undefined ;
c.inp = {} ;
c.panel = undefined ;
c.next_button = undefined ;
c.cancel_button = undefined ;
c.error_box = undefined ;
c.err_msg = undefined ;
c.previous_green_slot = undefined ;
}


change_dim.hit_cancel = function()
{
change_dim.clear() ;
alli_container.innerHTML = "" ;
reset_back_to_default_alli() ;
}





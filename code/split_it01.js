
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 



///  default1.hit_to_split_it = function(evt) {
///  swap_out_default_alli_panel() ;
///  split_it[0].initiate() ;
///  };  // end hit() default -> split_it UI



/// April 27 2023 : clumsy convoluted edit , a workaround
/// When CURRENT_BOX switches from leaf box to non-leaf
///  it's m/b/p config may automatically change   :(
///  making for a difficult to detect possible bug  :(
split_it[0].initiate = function() {
var request = {} ;
var dim = inner_width_height_if_were_not_leaf_box(CURRENT_BOX);
request.parent_width  = dim.width ;
request.parent_height = dim.height ;
split_it[0].request = request ;
split_it[1].request = request ;
split_it[1].previous_green_slot = undefined ;  /// May 21 2023 edit 
this.create(request) ;
alli_container.appendChild(this.panel);
scroll_up_alligator();
}    // end initiate() @ split_it[0]


// edit March 19, 2023, because change in micro-API
split_it[0].create = function(request) {
let [ df1 , textinput ]  = simTextInput("Number of boxes");
let [ df2 , radios ] = simRadioSet(["Horizontal","Vertical"]);
wrapStdDivForm(this,[df1,df2]);
this.inp = { text: textinput  ,  radio: radios };
}    // end create() @ split_it[0]






split_it[0].hit = function(evt) {
var mgr_obj  = split_it[0] ;
var mgr_obj2 = split_it[1] ;
mgr_obj.parse(mgr_obj.request) ;
if (mgr_obj.err_msg != "") return ;
disable_input_controls(mgr_obj.panel) ;
mgr_obj2.create(mgr_obj2.request) ;
alli_container.appendChild(mgr_obj2.panel) ;
scroll_up_alligator();
};   // end hit() @ split_it[0]







split_it[0].parse = function(request) {
var n , not_num , v_h_select , no_radio_chosen , vh ;
n = parseInt(this.inp.text.value) ;
not_num = isNaN(n) ;
v_h_select = RadioSelectedValue(this.inp.radio) ;
no_radio_chosen = (v_h_select==undefined) ;
this.err_msg = "" ;
this.error_box.innerHTML = this.err_msg ;
if (not_num || no_radio_chosen)
{ this.err_msg = "Incomplete or wrong data entered";
  this.error_box.innerHTML = this.err_msg ;
  return ;
}
request.num_boxes = n ;
request.v_or_h = v_h_select ;
vh = v_h_select[0] ;
if (vh=="V") request.available_space = request.parent_height ;
 else        request.available_space = request.parent_width ;
};   // end parse @ split_it[0] 





// January 31 2023 - edit this because also now have change_dim && insert_box, DONE.
// March 9 2023 - edit because changes to micro-API
// June 7 2023 - major change: changes to input boxes will not trigger auto-compute 
//  of last blank input box. Use a button to trigger the compute.
split_it[1].create = function(request)
{
var i , to_set , str3 ;
var init_w = undefined ;
var N = request.num_boxes ;
var mgr_obj = this ;
var r = request.v_or_h[0] ;
var space = request.available_space ;
var arr1 = [] ;
var inp_arr = [] ;

if ("sizes_initial" in request) init_w = request.sizes_initial ;
if (r=="V") to_set = "height(min)";  else to_set="width";

var str1 = "Select " + to_set + " for the smaller boxes" ;
var df1 = simLabel(str1);
arr1.push(df1);

var str2 = "Your choices must add up to " + space + "px." ;
var df2 = simLabel(str2) ;
arr1.push(df2) ;


for(i=1;i<=N;++i)
{ str3 = "Box # " + i ;
  let [ df4 , inpbox ] = simTextInput(str3) ;
  arr1.push(df4) ;
  inp_arr.push(inpbox);
  if (init_w!==undefined) inpbox.value = init_w[i-1] + "" ;
  /// June 7 2023 change, do not recompute whenever type in input box
  inpbox.oninput = function () { mgr_obj.input_box_clear_red(); }
  // inpbox.oninput = function () { mgr_obj.input_box_sum_check(); }  /// June 7 2023 , disable
}

/// June 7 2023 , add button to compute number for last empty input box
let [ div5 , button5 ] = simButtonRow("Compute Last Entry"," (compute last number for you)");
arr1.push(div5);
button5.onclick = function () { mgr_obj.input_box_sum_compute() ;}

wrapStdDivForm(this,arr1);
this.inp.texts = inp_arr ;
}     // end function create() @ split_it[1]


/////////////////////////////////////////////////////////////

//  Jan 31 type this
split_it[1].parse = function(request)
{
var i ;
var does_not_add_up = false ;
var nonpos_or_nonnumeric = false ;
var data = [] ;
var no_number = [] ;
var not_positive = [] ;
var vh = request.v_or_h[0] ;
var txt = this.inp.texts ;
for(i=0;i<txt.length;++i)
{ data[i] = parseInt(txt[i].value) ;
  no_number[i] = isNaN(data[i]) ;
  not_positive[i] = false ;
  if (!no_number[i]) not_positive[i] = ( data[i]<=0 ) ;
  if (no_number[i] || not_positive[i]) nonpos_or_nonnumeric=true;
}
var sum1 = 0 ;
for(i=0;i<data.length;++i)
  { if (!no_number[i]) sum1+=data[i]; }
if (sum1!=request.available_space) does_not_add_up=true ;

this.err_msg = "" ;
this.error_box.innerHTML = "" ;
if (does_not_add_up || nonpos_or_nonnumeric)
 { this.err_msg = "Numbers do not add up to available space" ;
   this.error_box.innerHTML = this.err_msg ;
   return ;
 }
request.size_vector = data ;
if (vh=="V") request.heights = data ;
 else request.widths = data ;
}  // end parse() for split_it[1]

////////////////////////////////////////////////////////////

split_it[1].hit = function()
{
var mgr_obj = split_it[1] ;
mgr_obj.parse(mgr_obj.request) ;
if (mgr_obj.err_msg!="") return ;
mgr_obj.execute(mgr_obj.request) ;
mgr_obj.clear()
alli_container.innerHTML = "" ;
reset_back_to_default_alli() ;
}

split_it[1].clear = function()
{
var obj1=split_it[0];
var obj2=split_it[1];
obj1.request=undefined; 
obj2.request=undefined;
obj1.panel=undefined ;  
obj2.panel=undefined;
obj1.inp={} ;           
obj2.inp={} ;
obj1.err_msg=undefined; 
obj2.err_msg=undefined;
obj1.next_button=undefined ; 
obj1.cancel_button=undefined; 
obj2.next_button=undefined ; 
obj2.cancel_button=undefined; 
obj1.error_box = undefined ;
obj2.error_box = undefined ;
obj2.previous_green_slot = undefined ;  /// May 21 2023 edit
}



split_it[1].execute = function(request)
   { split_box_smaller_boxes(request); }


///  reset_back_to_default_alli()
///  {
///  alli_container.innerHTML="";
///  alli_container.appendChild(default1.panel);
///  }


split_it[1].hit_cancel = function()
{
split_it[1].clear();
alli_container.innerHTML="";
reset_back_to_default_alli();
}
split_it[0].hit_cancel = split_it[1].hit_cancel ;

//////////////////////////////////////////////////////////////

/// March 9 2023 , edits because changes in micro-API, simplify it
/// April 16 2023, edits to NextButton/CancelButton/ErrorDiv
function wrapStdDivForm(mgr1,array_of_divs)
{
var i , item , j , b1 , b2 , e1 , div0 , f0 ;
div0 = makeDiv();
f0 = makeForm();
div0.appendChild(f0) ;

for(j=0;j<array_of_divs.length;j++)
   f0.appendChild(array_of_divs[j]); 

b1 = mkButton("Next") ;    // b1 = NextButtonMake() ;
b2 = mkButton("Cancel") ;  // b2 = CancelButtonMake() ;
e1 = makeDiv() ;           // e1 = ErrorDivMake() ;
f0.appendChild(b1) ;
f0.appendChild(b2) ;
f0.appendChild(e1) ;

mgr1.panel = div0 ;
mgr1.next_button = b1 ;
mgr1.cancel_button = b2 ;
mgr1.error_box = e1 ;
b1.onclick = mgr1.hit ;
b2.onclick = mgr1.hit_cancel ;

}     // end function wrapStdDivForm()





///////////////////////////////////////////////////////////


split_it[1].input_box_clear_red = function()
{
var i ;
var v = this.inp.texts ;
for(i=0;i<v.length;++i)
  v[i].style.backgroundColor="white" ; 
}




/// June 7 2023, this function will be activated by clicking a button
/// If you are creating, say 3 new inner boxes, and the widths must 
///  total to, say, 750 pixels and exactly one of the input boxes is 
///  blank, compute the third entry from the other two boxes with numbers.
split_it[1].input_box_sum_compute = function()
{
var v = this.inp.texts ;
var available_space = this.request.available_space ;
var num_nan = 0 , val = [] , i , nan_slot , sum_space , remainder ;

for(i=0;i<v.length;++i)
  { val[i] = parseInt(v[i].value) ;
    if (isNaN(val[i])) { nan_slot=i; num_nan++; }
  }

if (num_nan==1)
{ sum_space = 0 ;
  for(i=0;i<v.length;++i) 
     { if (i!==nan_slot) sum_space += val[i] ; }
  remainder = available_space - sum_space ;
  v[nan_slot].value = remainder ;
  if (remainder<=0) v[nan_slot].style.backgroundColor="red" ;
}

}  /// end function input_box_sum_compute()








/// June 7 2023, set this function aside for the time, do not throw away
/// This is for automatic calculate of the last entry, if all the entries
/// must sum up to a known quantity 
/// Say there are 3 new inner boxes , and their widths must sum up to 600 px
/// This function does a possible re-calculation WITHOUT A BUTTON FOR USER TO CLICK
/// (the function executes each time one of the input text controls gets input)
/// At the beginning, that is extra convenient, but if the user is fiddling around 
/// with the widths of the new boxes, sometimes he makes a box blank and wants it to
/// STAY blank for a moment. Then the immediate response of this function 
/// can be a pain in the ass. Use input_box_sum_compute() instead, and attach it 
/// to a button, not to the input boxes. (User asks for compute by clicking button).
// substantial rewrite, May 21 2023 
split_it[1].input_box_sum_check = function()
{
var mgr_obj = this ;
var v = this.inp.texts ;
var active = document.activeElement ;
var available_space = this.request.available_space ;
var last_green = this.previous_green_slot ;

var num_nan = 0 , val = [] , i , active_slot , nan_slot , sum_space , remainder ;

for(i=0;i<v.length;++i)
  { if (v[i]===active) active_slot=i; }
if (active_slot===last_green) last_green = undefined ;

for(i=0;i<v.length;++i)
  { val[i] = parseInt(v[i].value) ;
    if (isNaN(val[i])) { nan_slot=i; num_nan++; }
  }
if (num_nan==0 && last_green!==undefined) 
  { nan_slot=last_green ; num_nan=1 ; }

if (num_nan==1 && nan_slot!==active_slot)
{ sum_space = 0 ;
  for(i=0;i<v.length;++i) 
     { if (i!==nan_slot) sum_space += val[i] ; }
  remainder = available_space - sum_space ;
  v[nan_slot].value = remainder ;
  this.previous_green_slot = nan_slot ;
  v[nan_slot].style.backgroundColor = "green" ;
  if (remainder<=0) v[nan_slot].style.backgroundColor="red";
  for(i=0;i<v.length;++i)
    { if (i!==nan_slot) v[i].style.backgroundColor="white" ; }
}
else
  { for(i=0;i<v.length;++i) v[i].style.backgroundColor="white"; 
    this.previous_green_slot=undefined ;
  }

}  /// end function input_box_sum_check()


////////////////////////////////////////////////////



function disable_input_controls(e0)
{
var t , j ;
t = e0.tagName ;
t = t.toUpperCase() ;
if (t==="INPUT" || t==="BUTTON" || t==="TEXTAREA" || t==="SELECT" || 
    t==="FIELDSET" || t==="OPTION" || t==="OPTGROUP" )
  e0.disabled = true ;
for(j=0;j<e0.children.length;++j)
   disable_input_controls(e0.children[j]) ;
}







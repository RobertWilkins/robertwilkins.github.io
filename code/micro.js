
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

// these three are in global.js
// var RadioDefaultNameCounter = 0 ;
// var CheckBoxDefaultNameCounter = 0 ;
// var CheckRowDefaultNameCounter = 0 ;


function simRadioSet(arr_of_values)
{
var i , e , e2 ;
var n = arr_of_values.length ;
var radios = [] ;
var e0 = document.createElement("DIV") ;
var name = "radio_default_" + RadioDefaultNameCounter ;
RadioDefaultNameCounter++ ;
for(i=0;i<n;++i)
{ e = document.createElement("INPUT") ;
  e.setAttribute("type","radio") ;
  e.setAttribute("name",name) ;
  e.setAttribute("value",arr_of_values[i]) ;
  e2 = document.createElement("LABEL") ;
  e2.innerHTML = " " + arr_of_values[i] + " " ;
  e2.style.marginRight = "9px" ;
  e2.style.marginLeft = "3px" ;
  e0.appendChild(e) ;
  e0.appendChild(e2) ;
  radios.push(e) ;
}
return [ e0 , radios ] ;
}


function simCheckSet(arr_of_values)
{
var i , e , e2 ;
var n = arr_of_values.length ;
var check_boxes = [] ;
var e0 = document.createElement("DIV") ;
var name = "checkbox_default_" + CheckBoxDefaultNameCounter ;
CheckBoxDefaultNameCounter++ ;
for(i=0;i<n;++i)
{ e = document.createElement("INPUT") ;
  e.setAttribute("type","checkbox") ;
  e.setAttribute("name",name) ;
  e.setAttribute("value",arr_of_values[i]) ;
  e2 = document.createElement("LABEL") ;
  e2.innerHTML = " " + arr_of_values[i] + " " ;
  e2.style.marginRight = "9px" ;
  e2.style.marginLeft = "3px" ;
  e0.appendChild(e) ;
  e0.appendChild(e2) ;
  check_boxes.push(e) ;
}
return [ e0 , check_boxes ] ;
}


////////////////////////////////////////////////////////////



function simCheckboxRow(text_after)
{
var name = "checkrow_" + CheckRowDefaultNameCounter ;
CheckRowDefaultNameCounter++ ;
var e0 = document.createElement("DIV") ;

var e = document.createElement("INPUT") ;
e.setAttribute("type","checkbox") ;
e.setAttribute("name",name) ;

var e2 = document.createElement("LABEL") ;
e2.innerHTML = " " + text_after ;
e0.appendChild(e) ;
e0.appendChild(e2) ;
return [ e0 , e ] ;
}


function simButtonRow(button_text,text_after)
{
var e0 = document.createElement("DIV") ;
var b = document.createElement("BUTTON") ;
b.setAttribute("type","button") ;
var e2 = document.createElement("LABEL") ;

b.innerHTML = button_text ;
e2.innerHTML = text_after ;
e2.style.marginLeft = "4px" ;

e0.appendChild(b) ;
e0.appendChild(e2) ;
return [ e0 , b ] ;
}




//////////////////////////////////////////////////////////


function simButtonSet(array_of_button_names)
{
var i , b ;
var n = array_of_button_names.length ;
var e0 = document.createElement("DIV") ;
var buttons = [] ;
for(i=0;i<n;++i)
{ b = document.createElement("BUTTON") ;
  b.setAttribute("type","button") ;
  b.innerHTML = array_of_button_names[i] ;
  b.style.marginRight = "8px" ;
  b.style.marginLeft  = "2px" ;
  buttons.push(b) ;
  e0.appendChild(b) ;
}
return [ e0 , buttons ] ;
}


///////////////////////////////////////////////////////


function simTextInput(text_before) 
{
var e0 = document.createElement("DIV") ;
var e2 = document.createElement("LABEL") ;
var input1 = document.createElement("INPUT") ;
input1.setAttribute("type","text") ;
e2.style.marginRight = "4px" ;
if (text_before!=undefined) e2.innerHTML = text_before ;
e0.appendChild(e2) ;
e0.appendChild(input1) ;
return [ e0 , input1 ] ;
}

function simTextInputB(text_after) 
{
var e0 = document.createElement("DIV") ;
var input1 = document.createElement("INPUT") ;
input1.setAttribute("type","text") ;
var e2 = document.createElement("LABEL") ;
e2.style.marginLeft = "4px" ;
if (text_after!=undefined) e2.innerHTML = text_after ;
e0.appendChild(input1) ;
e0.appendChild(e2) ;
return [ e0 , input1 ] ;
}


/// edits June 17 2023 , these 2 functions are copy/paste of 
///   simTextInput & simTextInputB , just make text box smaller.
function simSmallTextInput(text_before)    /// this new function June 17
{
var e0 = document.createElement("DIV") ;
var e2 = document.createElement("LABEL") ;
var input1 = document.createElement("INPUT") ;
input1.setAttribute("type","text") ;
input1.setAttribute("size","6") ;        /// just make size smaller, that is all
e2.style.marginRight = "4px" ;
if (text_before!=undefined) e2.innerHTML = text_before ;
e0.appendChild(e2) ;
e0.appendChild(input1) ;
return [ e0 , input1 ] ;
}

function simSmallTextInputB(text_after)    /// this new function June 17
{
var e0 = document.createElement("DIV") ;
var input1 = document.createElement("INPUT") ;
input1.setAttribute("type","text") ;
input1.setAttribute("size","6") ;
var e2 = document.createElement("LABEL") ;
e2.style.marginLeft = "4px" ;
if (text_after!=undefined) e2.innerHTML = text_after ;
e0.appendChild(input1) ;
e0.appendChild(e2) ;
return [ e0 , input1 ] ;
}


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

function simLabel(text) 
{
var e0 = document.createElement("DIV") ;
var e2 = document.createElement("LABEL") ;
e2.innerHTML = text ;
e0.appendChild(e2) ;
return e0 ;
}


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


function mkLabel(text) 
{
var e0 = document.createElement("LABEL") ;
e0.innerHTML = text ;
return e0 ;
}

function mkInput() 
{
var e0 = document.createElement("INPUT") ;
e0.setAttribute("type","text") ;
return e0 ;
}

function mkButton(text) 
{
var e0 = document.createElement("BUTTON") ;
e0.setAttribute("type","button") ;
e0.innerHTML = text ;
return e0 ;
}

function mkTextArea()
{
var e0 = document.createElement("TEXTAREA") ;
return e0 ;
}




///////////////////////////////////////////////////

function makeDiv()
{ return document.createElement("DIV") ; }

function makeForm()
{ return document.createElement("FORM") ; }

///////////////////////////////////////////////////////


function RadioSelectedValue(radio_buttons)
{
var i , value = undefined ;
for(i=0;i<radio_buttons.length;++i)
{ if (radio_buttons[i].checked)
    value = radio_buttons[i].value ;
}
return value ;
}

//////////////////////////////////////////////////////


function makeImgI(img_location)
{
var e = document.createElement("IMG") ;
e.setAttribute("src",img_location) ;
return e ;
}

function makeImgD(img_location)
{
var e = document.createElement("IMG") ;
e.setAttribute("src",img_location) ;
return e ;
}






/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


function position_alligator(h0)
{
var B , C , A , widthA , dimB , dimC , leftA ;
var  rightA , topA ;
B = root_container ;
C = h0.Dref ;
A = alli_container ;
widthA = width_of_alligator ;
dimB = CoordinatesInDoc(B) ;
dimC = CoordinatesInDoc(C) ;
leftA = dimC.left ;
rightA = leftA + widthA ;
if (rightA > dimB.right)
 { rightA = dimB.right ;
   leftA  = rightA - widthA ;
 }

/// November 2 2023, BUG - alli panel moving left of browser edge, fix that!
if (leftA < dimB.left)
 { leftA = dimB.left ;
   rightA = leftA + widthA ;
 }


topA = dimC.bottom + 15 ;
A.style.position = "absolute" ;
A.style.width    = widthA + "px" ;
A.style.left     = leftA  + "px" ;
A.style.top      = topA   + "px" ;
}


function CoordinatesInDoc(d0)
{
var info1 , info2 , left2 , top2 , right2 , bottom2 ;
var width2 , height2 ;
info1 = d0.getBoundingClientRect() ;
info2 = {} ;
left2   = info1.left   + window.scrollX ;
top2    = info1.top    + window.scrollY ;
right2  = info1.right  + window.scrollX ;
bottom2 = info1.bottom + window.scrollY ;
width2  = info1.width ;
height2 = info1.height ;
info2.left   = Math.round(left2) ;
info2.top    = Math.round(top2) ;
info2.right  = Math.round(right2) ;
info2.bottom = Math.round(bottom2) ;
info2.width  = Math.round(width2) ;
info2.height = Math.round(height2) ;
info2.x = info2.left ;
info2.y = info2.top ;
return info2 ;
}


function update_position_of_alligator() 
{
if (PANEL_FIXATE_BOX===undefined) position_alligator(CURRENT_BOX) ;
else position_alligator(PANEL_FIXATE_BOX) ;
}


////////////////////////////////////////////////////////////////



function scroll_up_alligator()
{
var e , how_much_to_see , screen_size ;
e = alli_container.getBoundingClientRect() ;
how_much_to_see = e.bottom ;
screen_size = document.documentElement.clientHeight ;
if (how_much_to_see>screen_size)
  window.scrollBy(0,how_much_to_see-screen_size) ;
}


function scroll_up_alligator_conservative()
{
var e , how_much_to_see , screen_size ;
e = alli_container.getBoundingClientRect() ;
how_much_to_see = e.bottom ;
if (e.top+50<e.bottom) how_much_to_see = e.top+50 ;
screen_size = document.documentElement.clientHeight ;
if (how_much_to_see>screen_size)
  window.scrollBy(0,how_much_to_see-screen_size) ;
}









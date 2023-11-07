

explain.create = function()
{
var mgr_obj , f0 , d0 , div1 ;
mgr_obj = this ;
f0 = makeForm() ;
d0 = makeDiv() ;
d0.appendChild(f0) ;

let [ div_cancel , b_cancel ] = simButtonRow("Go back","") ;

div1 = simLabel(long_explain_string) ;

f0.appendChild(div_cancel);
f0.appendChild(div1) ;

b_cancel.onclick = mgr_obj.hit_cancel ;
mgr_obj.panel = d0 ;
}   /// end explain.create()


explain.hit_cancel = function() { reset_back_to_default_alli(); }

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var long_explain_string =
`
This app is for quickly drawing up a web page.
<br><br>
You start with one box, call it the "starter box". Underneath the starter box is the user interface panel (I sometimes call this panel the "alligator"), for giving commands to split boxes, put content in, and so on.
<br>
You create smaller boxes, and inside the smaller boxes you may put even smaller boxes. All of the boxes are inside the "starter box". The starter box is the web page that you are building.
<br>
Inside any box (as long as that box does not contain smaller boxes), you may put a mixture of images and formatted text (i.e., text marked up with HTML). Actually you can put any kind of HTML inside a box, but start with text and photos.
<br><br>
It is recommended that you specify the width and height (in pixels) of the starter box before creating smaller boxes inside the starter box. This is done via the "Prelim Config" button.
<br><br>
It is important to understand what I mean by the "box in focus". It is a little bit like the cursor in a word processor. It is the box, at that particular moment, where any changes you ask for are applied. The yellow dashed outline shows the four sides of the box that is currently in focus. 
<br>
If there is any box that you want to select as the "box in focus", and that box has no boxes inside, just click on that box with your computer mouse, and that box becomes the box in focus. When you click on that box, you will see the yellow dashed outline surround the four sides of that box. Then you may split that box into smaller boxes, or put photos/text into that box.
<br><br>
The navigational buttons are important. They will not be of any use until you have at least 2 boxes. The yellow dashed outline, which initially surrounds the starter box, indicates which box is the "box currently in focus", the box to which any edits you execute will apply. 
<br>
So, being able to move from box to box, to change the "box currently in focus", is quite important. If a box has no smaller boxes inside, a mouse click on that box will make that box the box in focus. But sometimes you might want the "box currently in focus" to be a box that does contain smaller boxes. For that, you need the navigational buttons, which look like this:
<br>
"+" "-" ">>" "<<"
<br>
These 4 buttons will appear at the top of the primary user interface panel right away, but they do not do anything until the starter box contains 2 or more boxes. The "+" button will "zoom in", whichever box is the box in focus, you will be moved to the first box inside that box, that smaller box becomes the new "box in focus". The "-" button, obviously does the opposite: whichever box is the box in focus, you will be moved to the larger box that contains the box in focus, and that larger box becomes the new box in focus.
<br>
As you click on the navigational buttons, pay attention to that yellow dotted outline, as it changes, you see what the new box in focus is.
<br>
Suppose that a box G has three smaller boxes inside, call them boxes A, B, and C. And suppose that one of those three inside boxes is currently the box in focus. That is what the ">>" and "<<" buttons are for, for switching from A to B to C and from C to B to A.

<br><br>
Typically, the user interface panel, which I call the alligator, and which is where you specify the changes you want to execute, typically the alligator is right underneath whatever box is currently the box in focus. But if you have a lot of small boxes, the alligator constantly moving around might be a distraction. If the starter box is not too big, one option is, as soon as you start creating smaller boxes, first click once on the "Panel Lock" button, and the alligator is locked in place at the bottom of the "starter box". But remember, any changes you execute through the alligator apply to the box currently in focus, which is usually not the starter box. If you choose this option, you must pay close attention to the yellow dashed outline - that is the box you are about to make changes to.

<br><br>

FIRST DIVIDE THE STARTER BOXES INTO SMALLER BOXES. THEN PUT TEXT AND PHOTOS IN THE SMALL BOXES.
<br>
First, decide where you want your boxes to be. In CSS developer jargon, you are making an outline for your web page, you are deciding what your LAYOUT is. 
<br>
(And that may be enough, if you only want to use this tool for creating a layout, divide the starter box into smaller boxes, divide some of the smaller boxes into still smaller boxes, and when you are finished dividing into boxes, what you have is your chosen layout. Use the "PrintCSS" button to export your chosen layout as CSS and HTML. Save that as an HTML file, and use your own HTML skills to manually put content inside the boxes, which will show up as div elements. Of course my tool has other useful features, but you can use my tool to create the layout, export it, and use other tools to finish the web page if that is what you wish.)
<br>
The box in focus, that box that currently has the yellow dashed outline, to divide that box into smaller boxes, click on the button next to the "Split this box into smaller boxes" command.
<br><br>
Next, put content inside the boxes (text or photos). There is an inventory of available test photos and samples of formatted text to put inside the boxes. This inventory is available via the "Browse for images, plain text, HTML" feature. You must choose the test samples you want to use, and give each sample a short description. After that, you can use the "Put content into this box" feature to put content into your boxes, choosing from among the items that you previously selected from the inventory page.
<br><br>
To expand the inventory of available HTML samples, usually formatted text snippets and photos, to expand beyond the test inventory of paragraphs of text and photos, MORE SPECIFICALLY TO USE YOUR OWN PHOTOS - you need to download this application and read the documents. The version of Javascript DRAW that is hosted directly on my GitHub account (so that you don't need to download the app) is for PRACTICING with the application with the test data that the inventory page provides. To finish your web page with your own photos and your own custom HTML, you need to download the application, which only takes a minute.

` ;

/// here is END OF EXPLAIN DOCUMENT STRING ;





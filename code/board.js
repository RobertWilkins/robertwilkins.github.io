
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


function board_display_set_up()
{
var d0 ;
Board.panel = makeDiv() ;
Board.inner_panel = makeDiv() ;
d0 = simLabel("This is the clipboard, for complex copy/paste of web page sub-blocks.");
let [ d1 , b1 ] = simButtonRow("Go back","(Go back to default user interface)") ;
b1.onclick = Board.hit_cancel ;
Board.panel.appendChild(d0);
Board.panel.appendChild(d1);
Board.panel.appendChild(Board.inner_panel) ;
Board.data = [] ;
}

Board.hit_cancel = function() { reset_back_to_default_alli(); }

///////////////////////////////

Board.transfer_current_box_to_board = function(descript)
{
var h_new = NodeH();
deepcopy_H_internals(CURRENT_BOX,h_new) ;
h_new.description = descript ;
Board.data.push(h_new);
Board.AddEntryBoardPanel(descript) ;
}

Board.AddEntryBoardPanel = function(descript)
{
let [ d0 , b0 ] = simButtonRow("Copy Over",descript) ;
var slot_this_entry = Board.data.length - 1 ;
b0.onclick = function () { Board.hit_clip_to_box(slot_this_entry); }
Board.inner_panel.appendChild(d0) ;
}

Board.hit_clip_to_box = function(slot_to_execute)
{
var h0 = Board.data[slot_to_execute] ;
clip_to_current_box(h0) ;
reset_back_to_default_alli() ;
}



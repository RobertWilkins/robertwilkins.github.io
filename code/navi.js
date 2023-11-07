
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 


function goto_smaller_box()
{
if (!("under" in CURRENT_BOX)) return ;
reassign_current_box(CURRENT_BOX.under[0]) ;
if (PANEL_FIXATE_BOX==undefined) position_alligator(CURRENT_BOX) ;
}

function goto_bigger_box()
{
if (CURRENT_BOX==ROOT_H) return ;
reassign_current_box_and_maybe_cancel_panel_lock_status(CURRENT_BOX.above) ;
if (PANEL_FIXATE_BOX==undefined) position_alligator(CURRENT_BOX) ;
}

function goto_sibling_boxL()
{
if (CURRENT_BOX==ROOT_H) return ;
var P = CURRENT_BOX.above ;
var index1 = CURRENT_BOX.slot ;
if (index1==0) return ;
reassign_current_box_and_maybe_cancel_panel_lock_status(P.under[index1-1]) ;
if (PANEL_FIXATE_BOX==undefined) position_alligator(CURRENT_BOX) ;
}

function goto_sibling_boxR()
{
if (CURRENT_BOX==ROOT_H) return ;
var P = CURRENT_BOX.above ;
var index1 = CURRENT_BOX.slot ;
if (index1==P.under.length-1) return ;
reassign_current_box_and_maybe_cancel_panel_lock_status(P.under[index1+1]) ;
if (PANEL_FIXATE_BOX==undefined) position_alligator(CURRENT_BOX) ;
}



/// May 24 - May 28 2023 , bug fix , .target vs .currentTarget
function mouse_click_to_change_CB(event_obj)
{
/// var div0 = event_obj.target ;       // no! could give img tag instead of div
var div0 = event_obj.currentTarget ;    // May 2023 bug fix
var hhid = div0.getAttribute("data-hhid") ;
var h0 = Hash_H[hhid] ;
reassign_current_box_and_maybe_cancel_panel_lock_status(h0) ;
if (PANEL_FIXATE_BOX==undefined) position_alligator(CURRENT_BOX) ;
}



///////////////////////////////////////////////////////////////////

function refresh_current_box_dotted_outline()
{
CURRENT_BOX.Dref.style.outline = "4px dotted yellow" ;
CURRENT_BOX.Dref.style.outlineOffset = "2px" ;
}


function reassign_current_box(B)
{
CURRENT_BOX.Dref.style.outline = "none" ;
CURRENT_BOX = B ;
CURRENT_BOX.Dref.style.outline = "4px dotted yellow" ;
CURRENT_BOX.Dref.style.outlineOffset = "2px" ;
}

function reassign_current_box_and_maybe_cancel_panel_lock_status(B)
{
reassign_current_box(B) ;
check_panel_lock_status_maybe_cancel() ;
}


function check_panel_lock_status_maybe_cancel()
{
if (PANEL_FIXATE_BOX===undefined) return ;
var C2 = CURRENT_BOX ;     // CURRENT_BOX just been changed when this code called
while (!( C2===ROOT_H || C2===PANEL_FIXATE_BOX ))
     C2 = C2.above ;
if ( C2 !== PANEL_FIXATE_BOX )
    PANEL_FIXATE_BOX = undefined ;
/// do not call position_alli , code calling this function will do that
}


function toggle_panel_lock()
{
if (PANEL_FIXATE_BOX !== undefined) 
  { PANEL_FIXATE_BOX=undefined;  position_alligator(CURRENT_BOX); }
else
  { PANEL_FIXATE_BOX=CURRENT_BOX;  position_alligator(PANEL_FIXATE_BOX); }
}



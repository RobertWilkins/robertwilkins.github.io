
/// Copyright 2023 : Robert Wilkins, graduated from Newton North High School 
///                  in 1984, in Massachusetts, USA 

/// initialize very early global variables

/// Following 6 lines relocated to some_options.js  (June 2023)
/// Put back in this file, with UI to change leaf boxes' margin/border/padding  (Oct 2023)
var leaf_box_global_settings = true ;
var leaf_box_global_margin = 2 ;
var leaf_box_global_border = 2 ;
var leaf_box_global_padding = 0 ;
var leaf_box_global_border_style = "solid" ;
var leaf_box_global_border_color = "grey" ;

/// Declaration of root_width and root_height relocated to some_options.js  (June 2023)
/// Put back in this file, with UI to change root width/height    (Oct 2023)
var root_width=600 , root_height=600 ;



var RadioDefaultNameCounter = 0 ;
var CheckBoxDefaultNameCounter = 0 ;
var CheckRowDefaultNameCounter = 0 ;

var default1={} , default2={} , manual_type={} ;
var Tray={} , Board={} ;
var split_it=[{},{}] , insert_box=[{},{}] , change_dim={} ;

var Browse_Collect=[] , LOCALINV_DESCRIPTS_CHOSEN={} ;
var Hash_H={} , HHID_counter=0 ;

var AVAILABLE_IMAGES_THIS_PAGE=[] , AVAILABLE_TEXT_SNIPPETS_THIS_PAGE=[] ;

var ROOT_H , CURRENT_BOX , PANEL_FIXATE_BOX ;
var alli_container , root_container , div_main_page , div_inventory ;
var width_of_alligator ;



/// May-June 2023 , these two are for CSS printer, to use as if a CSS framework
var css_collect = []  ,  html_collect = [] ;
var css_window = {} ;
var hue = {} ;
var hue_more = {} ;   // Oct 2023 ;


/// October 2023 , for changing root width/height , for changing leaf box m/b/p
///           and for Explain buttons tutorial panel 
var prelim_config = {} , big_box = {} , leaf_mbp = {} , explain = {} ;


///////////////////////////////////////////////////

function htmlexample(big_string,descript)
{
AVAILABLE_TEXT_SNIPPETS_THIS_PAGE.push([big_string,descript]) ;
}
function imageexample(filename,descript)
{
AVAILABLE_IMAGES_THIS_PAGE.push(["photos/"+filename,descript]) ;
}

//////////////////////////////////////////////////


function early_initialize() 
{
split_it[0].inp = {} ;
split_it[1].inp = {} ;
insert_box[0].inp = {} ;
insert_box[1].inp = {} ;
change_dim.inp = {} ;

insert_box[1].create = split_it[1].create ;
change_dim.create    = split_it[1].create ;

insert_box[1].parse  = split_it[1].parse ;
change_dim.parse     = split_it[1].parse ;

// June 7 2023 input_box_sum_check() disabled
// insert_box[1].input_box_sum_check = split_it[1].input_box_sum_check ;
// change_dim.input_box_sum_check    = split_it[1].input_box_sum_check ;

// June 7 2023, need input_box_sum_compute and input_box_clear_red 
insert_box[1].input_box_sum_compute = split_it[1].input_box_sum_compute ;
change_dim.input_box_sum_compute    = split_it[1].input_box_sum_compute ;

insert_box[1].input_box_clear_red = split_it[1].input_box_clear_red ;
change_dim.input_box_clear_red    = split_it[1].input_box_clear_red ;


default1.create() ;
default2.create() ;

/// Oct 2023, for prelim_config (to root width/height or leaf-box m/b/p) and explain 
prelim_config.create() ;
explain.create() ;



/// load_up_available_images_text() ; // done by content.js

setup_initial_geometry() ;

inventory_page_set_up() ;
tray_display_set_up() ;
board_display_set_up() ;
manual_type.create() ;

}   /// end function early_initialize() 


window.onload = early_initialize ;


////////////////////////////////////////////////////////////


function setup_initial_geometry()
{
div_main_page = makeDiv() ;
div_inventory = makeDiv() ;
div_inventory.style.display = "none" ;
document.body.appendChild(div_main_page) ;
document.body.appendChild(div_inventory) ;

ROOT_H = NodeH() ;
root_container = NodeD() ;
alli_container = makeDiv() ;
div_main_page.appendChild(root_container) ;
div_main_page.appendChild(alli_container) ;

ROOT_H.Dref = root_container ;
root_container.setAttribute("data-hhid",ROOT_H.hhid) ;

ROOT_H.width0 = root_width ;
ROOT_H.height0 = root_height ;
create_mbp_config(ROOT_H) ;
inner_width_height_recalc(ROOT_H) ;
HtoD(ROOT_H,root_container) ;

width_of_alligator = Math.floor( 0.5*root_width ) ;
/// Nov 2 2023, set min-width of alligator to 450 pixels. 
if (width_of_alligator<450) width_of_alligator=450 ;

alli_container.style.backgroundColor = "white" ;

CURRENT_BOX = ROOT_H ;  // keep!! do not want C_B=undefined at next step
reassign_current_box(ROOT_H) ;
PANEL_FIXATE_BOX = undefined ;

alli_container.appendChild(default1.panel) ;
position_alligator(ROOT_H) ;
scroll_up_alligator();

}    /// end function setup_initial_geometry() 






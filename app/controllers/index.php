<?php

include "parseLib/simple_html_dom.php";

function select_artist_by_alpha($alpha){
	$html = file_get_html('http://www.music.com.bd/download/browse/');
	foreach($html->find('.autoindex_a') as $ul){
	$links_array[]  = $ul->href;
    }
    $alpha_links_pair = ['a' => $links_array[0] , 'b' => $links_array[1] , 'c' => $links_array[2],
    'd'=>$links_array[3], 'e'=>$links_array[4], 'f'=>$links_array[5], 'g'=>$links_array[6],
    'h'=>$links_array[7], 'i'=>$links_array[8], 'j'=>$links_array[9], 'k'=>$links_array[10],
    'l'=>$links_array[11], 'm'=>$links_array[12], 'n'=>$links_array[13], 'o'=>$links_array[14],
    'p'=>$links_array[15], 'q'=>$links_array[16], 'r'=>$links_array[17], 's'=>$links_array[18],
    't'=>$links_array[19], 'u'=>$links_array[20], 'v'=>$links_array[21], 'w'=>$links_array[22],
    'x'=>$links_array[23], 'y'=>$links_array[24], 'z'=>$links_array[25] ];

    if (array_key_exists($alpha, $alpha_links_pair)){
    	$link = $alpha_links_pair[$alpha];
    }
    return $link;
}

function select_artist_by_name($alpha){
	//$html = file_get_html('http://www.music.com.bd/download/browse/A/');
    $html = file_get_html(select_artist_by_alpha($alpha));

	foreach ($html->find('a.autoindex_a') as $link) {
      $al =$link->href;
  foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
            global $nisha[$name] = $al ;
       }
     }
  array_shift($nisha);
  $make_me_json = array_keys($nisha);

	return $make_me_json;
}

function get_music_list($artist_name){
  $html = $nisha[$artist_name] ;


}
?>

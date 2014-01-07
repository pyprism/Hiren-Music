<?php

include "parseLib/simple_html_dom.php";

function select_artist_by_alpha($alpha){
  $html = file_get_html('http://www.music.com.bd/download/browse/');
  foreach($html->
find('.autoindex_a') as $ul){
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

function select_artist_by_name($alpha="x"){
  $html = file_get_html('http://www.music.com.bd/download/browse/A/');
   // $html = file_get_html(select_artist_by_alpha($alpha));

  foreach ($html->find('a.autoindex_a') as $link) {
      $al =$link->href;
  foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
             $nisha[$name] = $al ;
       }
     }
  //Removed "parent directory"
  array_shift($nisha);

  return $nisha;
}

function get_album_list($artist_name){
  $html = file_get_html($nisha[$artist_name]) ;
    foreach ($html->find('a.autoindex_a') as $link) {
      $al =$link->href;
    foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
             $album_name[$name] = $al ;
       }
     }
     //To do - lonely mp3 file check
     array_shift($album_name); //Removed "parent directory"
     return $album_name ;
}

function get_music_list($name){
  $html = file_get_html($name);
  foreach ($html->find('.snap_shots') as $link) {
      $al =$link->href;
  foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
             //Todo : remove music.com.bd and .mp3 part
             $song_name[$name] = $al ;
       }
     }
     return $song_name;
}

function get_mp3(){
 //Todo get mp3 download link
  $html = file_get_html('http://www.music.com.bd/download/Music/N/Nancy/Bhalobasha%20Odhora/Nancy%20-%20Bhorer%20Hawa%20%28music.com.bd%29.mp3.html');
  foreach ($html->find('#mirror a') as $link) {
      $al[] =$link->href;
    }
    //Todo : link availablity checker
    return $al[0] ;
}

?>
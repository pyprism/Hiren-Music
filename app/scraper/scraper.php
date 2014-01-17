<?php

include "parseLib/simple_html_dom.php";

function select_artist_by_alpha(){
  $html = file_get_html('http://www.music.com.bd/download/browse/');
  foreach($html->find('.autoindex_a') as $ul){
  $links  = $ul->href;
  foreach ($ul->find('strong') as $strong) {
    $name = $strong->plaintext ;
    $links_array[$name] = $links;
    }
  }

   /** if (array_key_exists($alpha, $alpha_links_pair)){
      $link = $alpha_links_pair[$alpha];
    }**/
    return $links_array ;
}

function select_artist_by_name($alpha){
  //$html = file_get_html('http://www.music.com.bd/download/browse/A/');
  $html = file_get_html( 'http://www.music.com.bd/download/browse/' . $alpha);

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
  //var_dump($nisha);
}

//select_artist_by_name('A');

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
  $html = file_get_html('http://www.music.com.bd/download/Music/N/Nancy/Bhalobasha%20Odhora/Nancy%20-%20Bhorer%20Hawa%20%28music.com.bd%29.mp3.html');
  foreach ($html->find('#mirror a') as $link) {
      $al[] =$link->href;
    }
    //Todo : link availablity checker
    return $al[0] ;
}

?>
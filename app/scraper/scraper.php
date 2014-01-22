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

}



function get_album_list($alpha , $artist_name){
  //$html = file_get_html($nisha[$artist_name]) ;
  $html = file_get_html('http://www.music.com.bd/download/browse' . '/' . $alpha . '/' . rawurlencode($artist_name) . "/") ;
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

//http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions/834355#834355
function endsWith($haystack, $needle)
{
    return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
}

function get_music_list($alpha , $name , $album){
  $html = file_get_html('http://www.music.com.bd/download/browse' . "/" . $alpha . '/' . rawurlencode($name) . "/" . rawurlencode($album) . "/");
  foreach ($html->find('.snap_shots') as $link) {
      $al =$link->href;
  foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
            $final_name = str_replace("(music.com.bd).mp3", "", $name);
            if(!(endsWith($al , "zip.html")))   //Removes zip download
                 $x = preg_replace("/ /", '%20', $al);
            else
              break;
             $html = file_get_html( $x );
             foreach ($html->find('#mirror a') as $link) {
                $linku[] =$link->href;
             }
             $song_name[$final_name] = $linku[0] ;
       }
     }
     return $song_name;
}

//Todo : link availablity checker

?>
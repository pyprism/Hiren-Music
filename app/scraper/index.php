<?php

include "parseLib/simple_html_dom.php";

function select_artist_by_alpha(){
  $html = file_get_html('http://www.music.com.bd/download/browse/');
  foreach($html->find('a.autoindex_a') as $ul){
    foreach ($ul->find('strong') as $strong) {
     $name = $strong->plaintext ;
     $links_array[] = $name ;
    }
  }
    return $links_array ;
}


function select_artist_by_name($alpha){
  $html = file_get_html( 'http://www.music.com.bd/download/browse/' . $alpha);

  foreach ($html->find('a.autoindex_a') as $link) {
   foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
             $nisha[] = $name ;
       }
     }
  //Removed "parent directory"
   array_shift($nisha);

  return $nisha;

}

function naima(){
  //$html = file_get_html('http://www.music.com.bd/download/browse/A/Aashor/');
  $html = file_get_html('http://www.music.com.bd/download/browse/A/Abbasuddin%20Ahmed/');
  foreach ($html->find('a.snap_shots') as $link) {
    if(isset($link)){
   foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
             $nisha[] = $name ;
       }
     }
   }
     return $nisha;
}

var_dump(naima());


function get_album_list($alpha , $artist_name){

  $html = file_get_html('http://www.music.com.bd/download/browse' . '/' . $alpha . '/' . rawurlencode($artist_name) . "/") ;
    foreach ($html->find('a.autoindex_a') as $link) {
    foreach($link->find('strong') as $tag)
       {
             $name = $tag->plaintext ;
             $album_name[] = $name ;
       }
     }
     //To do - lonely mp3 file check
    foreach ($html->find('a.snap_shots') as $link) {
      if(isset($link)){
        $album_name[] = 'others';
     }
   }
     array_shift($album_name); //Removed "parent directory"
     return $album_name ;
}

//http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions/834355#834355
function endsWith($haystack, $needle)
{
    return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
}

function get_music_list($alpha , $name , $album){
  $song_collection = [] ;
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
             foreach ($html->find('#download_link a') as $link) {
                $linku =$link->href;
               // $song[$final_name] = $linku ;
                $song = [ 'name' => $final_name , 'url' => $linku];
                array_push($song_collection , $song) ;
             }
             //
       }
     }
     return $song_collection;
}
//Todo : link availablity checker
// $songs[$name]=$url;
//[13:52:40] Nirab kobi: $songs=array('name'=>$name,'url'=>$url);


?>

<?php

include "parseLib/simple_html_dom.php";

//Returns Alphabet
function select_artist_by_alpha()
{
    $html = file_get_html('http://www.music.com.bd/download/browse/');
    foreach ($html->find('a.autoindex_a') as $ul) {
        foreach ($ul->find('strong') as $strong) {
            $name = $strong->plaintext;
            $links_array[] = $name;
        }
    }
    return $links_array;
}

//Return artits name
function select_artist_by_name($alpha)
{
    $html = file_get_html('http://www.music.com.bd/download/browse/' . $alpha);

    foreach ($html->find('a.autoindex_a') as $link) {
        foreach ($link->find('strong') as $tag) {
            $name = $tag->plaintext;
            $nisha[] = $name;
        }
    }
    //Removed "parent directory"
    array_shift($nisha);

    return $nisha;

}


//return album name
function get_album_list($alpha, $artist_name)
{
    $html = file_get_html('http://www.music.com.bd/download/browse' . '/' . $alpha . '/' . rawurlencode($artist_name) . "/");
    foreach ($html->find('a.autoindex_a') as $link) {
        foreach ($link->find('strong') as $tag) {
            $name = $tag->plaintext;
            $raw_album_name[] = $name;
        }
    }

    foreach ($html->find('a[class=autoindex_a snap_shots]') as $link) {
        if (isset($link)) {
            foreach ($link->find('strong') as $tag) {
                $name = $tag->plaintext;
                $mp3[] = $name;
            }
        }
    }
    if (isset($mp3)) {
        $sorted_album = array_diff($raw_album_name, $mp3);
        array_shift($sorted_album); // removes "parent directory"
        array_push($sorted_album, 'Others');
        return $sorted_album;

    } else {
        array_shift($raw_album_name);
        return $raw_album_name;
    }

}


//http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions/834355#834355
function endsWith($haystack, $needle)
{
    return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
}

//Return music name and music link
function get_music_list($alpha, $name, $album)
{
    $song_collection = [];
    if ($album != "Others") {
        $html = file_get_html('http://www.music.com.bd/download/browse' . "/" . $alpha . '/' . rawurlencode($name) . "/" . rawurlencode($album) . "/");
        foreach ($html->find('.snap_shots') as $link) {
            $al = $link->href;
            foreach ($link->find('strong') as $tag) {
                $name = $tag->plaintext;
                $final_name = str_replace("(music.com.bd).mp3", "", $name);
                if (!(endsWith($al, "zip.html"))) //Removes zip download
                    $x = preg_replace("/ /", '%20', $al);
                else
                    break;
                $html = file_get_html($x);
                foreach ($html->find('#download_link a') as $link) {
                    $linku = $link->href;
                    // $song[$final_name] = $linku ;
                    $song = ['name' => $final_name, 'url' => $linku];
                    array_push($song_collection, $song);
                }
                //
            }
        }
        return $song_collection;
    } else {
        $html = file_get_html('http://www.music.com.bd/download/browse' . "/" . $alpha . '/' . rawurlencode($name) . "/");
        foreach ($html->find('a[class=autoindex_a snap_shots]') as $link) {
            if (isset($link)) {
                foreach ($link->find('strong') as $tag) {

                    $name = $tag->plaintext;
                    $final_name = str_replace("(music.com.bd).mp3", "", $name);
                    $link = $link->href;
                    $song = ['name' => $final_name, 'url' => $link];
                    array_push($song_collection, $song);
                }
            }
        }

        return $song_collection;

    }

}


?>

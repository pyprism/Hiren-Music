<?php
/*
 * Created By Prism
 * Date : March 18 , 2014
 */
include "parseLib/simple_html_dom.php";

use Illuminate\Redis\Database;

class Scraper{
    /*
     * Display Alphabet
     * @return array
     */
    public function select_artist_by_alpha()
    {

        return ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' ,'J' ,'K' ,'L' ,'M' , 'N' ,
            'O' , 'P' , 'Q' , 'R' ,'S' , 'T' , 'U' ,'V' , 'W' ,'X' , 'Y' , 'Z'];
    }

    /*
     * Alphabetically  find out artist name
     * @return array
     */
    public function select_artist_by_name($alpha)
    {
        $url = 'http://www.music.com.bd/download/browse/' . $alpha;
        //$result = $redis->get($url);
        $result = Redis::get($url);;
        //check if data already exists in redis server
        //if true, then return from Redis server.
        if($result) return unserialize($result);
        //or execute the whole process
        else{
            $html = file_get_html($url);

            foreach ($html->find('a.autoindex_a') as $link) {
                foreach ($link->find('strong') as $tag) {
                    $name = $tag->plaintext;
                    $nisha[] = $name;
                }
            }
            //Removed "parent directory"
            array_shift($nisha);
            //and save the result to Redis database
            Redis::set($url, serialize($nisha));
            return $nisha;
        }

}

    /**
     * Find Album Name
     * @param $alpha
     * @param $artist_name
     * @return array|mixed
     */
    public function get_album_list($alpha, $artist_name)
    {
        $url = 'http://www.music.com.bd/download/browse' . '/' . $alpha . '/' . rawurlencode($artist_name) . "/" ;
        $result = Redis::get($url);
        //check if data already exists in redis server
        //if true/not empty, then return from server.
        if($result) return unserialize($result);
        //or execute the whole process
        else{
            $html = file_get_html($url);
            foreach ($html->find('a.autoindex_a') as $link) {
                foreach ($link->find('strong') as $tag) {
                    $name = $tag->plaintext;
                    $raw_album_name[] = $name;
                }
            }
            //check if there is any "poor lonely" mp3 files
            foreach ($html->find('a[class=autoindex_a snap_shots]') as $link) {
                if (isset($link)) {
                    foreach ($link->find('strong') as $tag) {
                        $name = $tag->plaintext;
                        $mp3[] = $name;
                    }
                }
            }
            //if exists then make a new "others" album for them ! :O , so sad no love for "foreveralone" :D
            if (isset($mp3)) {
                $sorted_album = array_diff($raw_album_name, $mp3);
                array_shift($sorted_album); // removes "parent directory"
                array_push($sorted_album, 'Others');
                Redis::set($url, serialize($sorted_album));
                return $sorted_album;

            } else { //and if there are no poor "lonely" mp3 files , just return the default result
                array_shift($raw_album_name);
                Redis::set($url, serialize($raw_album_name));
                return $raw_album_name;
            }
        }

    }

    // @source : http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions/834355#834355
    static private function endsWith($haystack, $needle)
    {
        return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
    }

    /**
     * Return music name and music link
     * @param $alpha
     * @param $name
     * @param $album
     * @return array|mixed
     */
    public function get_music_list($alpha, $name, $album)
    {
        $song_collection = [];
        if ($album != "Others") {
            $url = 'http://www.music.com.bd/download/browse' . "/" . $alpha . '/' . rawurlencode($name) . "/" . rawurlencode($album) . "/" ;
            $result = Redis::get($url);
            if($result) return unserialize($result) ;
            else{
                $html = file_get_html($url);
                foreach ($html->find('.snap_shots') as $link) {
                    $al = $link->href;
                    foreach ($link->find('strong') as $tag) {
                        $name = $tag->plaintext;
                        $final_name = str_replace("(music.com.bd).mp3", "", $name);
                        if (!(Scraper::endsWith($al, "zip.html"))) //Removes zip download
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
                Redis::set($url,serialize($song_collection)) ;
                return $song_collection;
            }} else {
            $url = 'http://www.music.com.bd/download/browse' . "/" . $alpha . '/' . rawurlencode($name) . "/" ;
            $result = Redis::get($url);
            if($result) return unserialize($result);
            else{
                $html = file_get_html($url);
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
                Redis::set($url,serialize($song_collection)) ;
                return $song_collection;

            }
        }

    }
}
?>
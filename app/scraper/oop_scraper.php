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
     * Find out artist name by alphabetical
     * @return array
     */
    public function select_artist_by_name($alpha)
    {
        $url = 'http://www.music.com.bd/download/browse/' . $alpha;
        //$result = $redis->get($url);
        $result = Redis::get($url);;
        //check if data already exists in redis server
        //if true, then return from server.
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
            //and save the result to database
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
            //check if there is any "lonely" mp3 files
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

    // source : http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions/834355#834355
    function endsWith($haystack, $needle)
    {
        return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
    }
?>
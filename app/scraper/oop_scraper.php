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
?>
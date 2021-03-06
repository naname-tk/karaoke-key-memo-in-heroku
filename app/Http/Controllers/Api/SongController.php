<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use App\Http\Requests\Song;

class SongController extends Controller
{
    /**
     * @param DatabaseManager $db_manager
     * @return json
     */
    public function getSongs(DatabaseManager $db_manager)
    {
        return $db_manager->table('songs')->get();
    }

    /**
     * @param DatabaseManager $db_manager
     * @return json
     */
    public function storeSong(DatabaseManager $db_manager, Song\StoreRequest $request)
    {
        $param = $request->only([
            'song_name',
            'sing_key',
            'artist',
            'memo',
        ]);
        $db_manager->table('songs')->insert($param);
    }

    /**
     * @param DatabaseManager $db_manager
     * @return json
     */
    public function delete(DatabaseManager $db_manager, Song\DeleteRequest $request)
    {
        $db_manager->table('songs')->where('song_id', '=', $request->song_id)->delete();
    }
}

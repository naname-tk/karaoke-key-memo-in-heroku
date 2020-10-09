<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SongsTableSeeder extends Seeder
{
    const MAKE_DATA_NUM = 30;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $datas = [];
        for ($i=0; $i < self::MAKE_DATA_NUM; $i++) {
            $datas[] = [
                'song_name' => Str::random(10).' Song',
                'artist' => Str::random(10).' Singer',
                'sing_key' => mt_rand(-7, +7),
            ];
        }
        DB::table('songs')->insert($datas);
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id('song_id');
            $table->unsignedInteger('user_id')->nullable()->comment('ユーザーID');
            $table->string('song_name', 1000)->nullable()->comment('曲名');
            $table->string('artist', 100)->nullable()->comment('アーティスト');
            $table->tinyInteger('sing_key')->nullable()->comment('キー');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('songs');
    }
}

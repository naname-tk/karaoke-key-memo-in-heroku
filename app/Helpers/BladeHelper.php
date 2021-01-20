<?php
// Bladeで利用するヘルパメソッドを宣言する。

if (!function_exists('myAsset')) {
    function myAsset(string $directory) {
        $suffix = config('app.asset_suffix_code');
        // 本番環境じゃなければ日付コードを接尾辞に設定する
        if ( false === (config('app.env') === 'production') ) {
            $suffix = (new DateTime('now'))->format('ymdhis');
        }
        return config('app.url').'/'.$directory.'?'.$suffix;
    }
}

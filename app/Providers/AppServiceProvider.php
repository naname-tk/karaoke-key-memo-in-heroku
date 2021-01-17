<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // 本番環境の時、出力されるURLをHTTPSにする。
        // ※url()メソッドのにしか適用できないので注意する。
        if (\App::environment(['production'])) {
            \URL::forceScheme('https');
        }
    }
}

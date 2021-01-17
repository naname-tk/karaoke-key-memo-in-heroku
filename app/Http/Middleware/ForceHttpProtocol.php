<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ForceHttpProtocol
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // 本番環境のみ常時SSL化する
        if (App::environment(['production'])
                && $_SERVER["HTTP_X_FORWARDED_PROTO"] !== 'https'
        ) {
            return redirect()->secure($request->getRequestUri());
        }
        return $next($request);
    }
}

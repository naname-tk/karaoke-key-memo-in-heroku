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
        // envに設定しているURLで、httpsだった場合、リダイレクトするように設定
        if (0 === strpos(config('app.url'), 'https')
                && isset($_SERVER["HTTP_X_FORWARDED_PROTO"])
                && $_SERVER["HTTP_X_FORWARDED_PROTO"] !== 'https'
        ) {
            return redirect()->secure($request->getRequestUri());
        }
        return $next($request);
    }
}

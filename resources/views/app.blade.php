<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <title>{{ config('app.name', 'React導入テスト') }}</title>
      <script src="{!! myAsset('js/app.js') !!}" defer></script>
      <link rel="dns-prefetch" href="//fonts.gstatic.com">
      @include('common.favicon')
      <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
      <link href="{!! myAsset('css/app.css') !!}" rel="stylesheet">
  </head>
  <body>
    <script>
      // 本番環境上でコンソール上のdevtoolに関するメッセージを本番環境では表示しないようにする。
      @production
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
          supportsFiber: true,
          inject: function() {},
          onCommitFiberRoot: function() {},
          onCommitFiberUnmount: function() {},
        };
      @endproduction
      window.const = {!! $const !!}
    </script>
    <div id="app"></div>
  </body>
</html>

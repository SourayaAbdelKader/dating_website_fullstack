<?php

//s$app->configure('jwt');

//$app->register(App\Providers\AuthServiceProvider::class);

//$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);

//$app->routeMiddleware([
  //  'auth' => App\Http\Middleware\Authenticate::class,
//]);

$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

return $app;

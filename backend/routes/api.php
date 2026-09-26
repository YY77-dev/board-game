<?php

use Illuminate\Support\Facades\Route;

// ヘルスチェック用。GET /api/ で 200 を返す
Route::get('/', function () {
    return response()->json(['status' => 'ok']);
});

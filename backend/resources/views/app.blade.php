<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>
    <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}">
</head>
<body class="overflow-hidden" style="margin: 0 !important;">
<div id="app"></div>
@vite('resources/js/app.ts')
</body>
</html>

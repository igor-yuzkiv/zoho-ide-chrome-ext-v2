<?php

namespace App\Api\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MockApiController
{
    private const DISK = 'public';

    private const DIRECTORY = 'mock-api-data';

    public function get(string $fileName): ?array
    {
        $jsonData = Storage::disk('public')->get(sprintf('%s/%s', self::DIRECTORY, $fileName));
        $data = json_decode($jsonData, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        }

        return $data;
    }

    public function create(string $fileName, Request $request)
    {
        $request->validate(['data' => 'required|array']);
        $jsonData = json_encode($request->input('data'), JSON_PRETTY_PRINT);
        Storage::disk(self::DISK)->put(sprintf('%s/%s.json', self::DIRECTORY, $fileName), $jsonData);

        return response()->json(['message' => 'Data saved successfully.'], 201);
    }
}

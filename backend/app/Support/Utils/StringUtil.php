<?php

namespace App\Support\Utils;

class StringUtil
{
    public static function acronym(string $value, int $maxLength = 3): string
    {
        $words = preg_split('/\s+/', $value);
        $acronym = '';

        foreach ($words as $word) {
            if (isset($word[0])) {
                $acronym .= strtoupper($word[0]);
            }
            if (strlen($acronym) >= $maxLength) {
                break;
            }
        }

        if (strlen($acronym) < $maxLength) {
            $remainingLength = $maxLength - strlen($acronym);
            $acronym .= strtoupper(substr(preg_replace('/\s+/', '', $value), strlen($acronym), $remainingLength));
        }

        return str_pad($acronym, $maxLength, 'X');
    }

    public static function randomHexColor(): string
    {
        return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    }
}

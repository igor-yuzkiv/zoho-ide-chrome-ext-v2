<?php

namespace App\Application\Auth\Exceptions;

class LoginException extends \RuntimeException
{
    public function __construct(string $message = 'Invalid email or password', int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}

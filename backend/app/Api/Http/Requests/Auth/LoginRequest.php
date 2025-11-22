<?php

namespace App\Api\Http\Requests\Auth;

use App\Application\Auth\Commands\LoginCommand;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toCommand(): LoginCommand
    {
        return new LoginCommand(
            email: $this->input('email'),
            password: $this->input('password'),
            remember: $this->boolean('remember', false),
        );
    }
}

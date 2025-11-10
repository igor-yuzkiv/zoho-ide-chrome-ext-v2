<?php

namespace App\Api\Http\Requests\User;

use App\Application\User\Command\CreateUserCommand;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'unique:users,email'],
            'password' => ['required', 'confirmed'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toCommand(): CreateUserCommand
    {
        return new CreateUserCommand(
            name: $this->input('name'),
            email: $this->input('email'),
            password: $this->input('password'),
        );
    }
}

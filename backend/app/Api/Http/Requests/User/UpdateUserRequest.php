<?php

namespace App\Api\Http\Requests\User;

use App\Application\User\Command\UpdateUserCommand;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email,'.$this->route('userId')],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function toCommand(string $userId): UpdateUserCommand
    {
        return new UpdateUserCommand(
            userId: $userId,
            name: $this->input('name'),
            email: $this->input('email'),
        );
    }
}

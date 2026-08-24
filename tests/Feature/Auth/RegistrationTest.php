<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register()
    {
        $this->seed(RoleSeeder::class);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'Admin',
        ]);

        $this->assertAuthenticated();
        $user = User::where('email', 'test@example.com')->firstOrFail();

        $this->assertTrue($user->hasRole('Customer'));
        $this->assertFalse($user->hasRole('Admin'));
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}

<?php

namespace Tests\Unit;

use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_seeds_admin_and_customer_roles(): void
    {
        $this->seed(RoleSeeder::class);
        $this->seed(RoleSeeder::class);

        $this->assertSame(1, Role::where('name', 'Admin')->where('guard_name', 'web')->count());
        $this->assertSame(1, Role::where('name', 'Customer')->where('guard_name', 'web')->count());
    }
}

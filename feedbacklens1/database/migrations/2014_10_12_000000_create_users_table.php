<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        

        Schema::create('fl_users', function (Blueprint $table) {
            $table->increments('USER_ID');
            $table->string('FIRST_NAME');
            $table->string('LAST_NAME');
            $table->boolean('ISADMIN')->default(false);
            $table->integer('PLAN_ID')->unsigned();
            $table->integer('ORG_ID')->unsigned();
            $table->string('EMAIL')->unique();
            $table->string('PASSWORD');
            $table->string('ADDRESS');
            $table->string('PHONE_NO');
            $table->integer('ROLE_ID')->unsigned();
            $table->boolean('IS_ACTIVE');
            $table->rememberToken();
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nullable();
            //$table->foreign('ORG_ID')->references('ORG_ID')->on('fl_org')->onDelete('cascade');
        });
     }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fl_users');
    }
}

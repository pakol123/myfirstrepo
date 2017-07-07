<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganisation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
Schema::create('fl_org', function (Blueprint $table) {
            $table->increments('ORG_ID');
            $table->string('ORG_NAME');
            $table->string('SUPER_USER');
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nullable();

        });





    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        
        Schema::dropIfExists('fl_org');

    }
}

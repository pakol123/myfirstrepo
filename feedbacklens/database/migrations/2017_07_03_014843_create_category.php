<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
       schema::create('fl_category_master',function(Blueprint $table){
         
        $table->increments('CAT_ID');
            $table->string('CAT_NAME');
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
        
        Schema::dropIfExists('fl_category_master');

    }
}

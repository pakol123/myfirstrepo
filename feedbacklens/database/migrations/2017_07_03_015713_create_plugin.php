<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlugin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('fl_plugin',function(Blueprint $table){
           $table->increments('PLUGIN_ID');
           $table->string('ALIGNMENT');
           $table->string('PLUGIN_COLOR');
           $table->boolean('ISACTIVE')->default(false);
           $table->integer('DOMAIN_ID')->unsigned();
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nullable();
        });
Schema::table('fl_plugin',function(Blueprint $table){

           $table->foreign('DOMAIN_ID')->references('DOMAIN_ID')->on('fl_domain')->onDelete('cascade');
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
        
        Schema::dropIfExists('fl_plugin');

    }
}

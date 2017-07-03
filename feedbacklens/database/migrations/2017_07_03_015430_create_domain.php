<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDomain extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

            Schema::create('fl_domain',function(Blueprint $table){
            $table->increments('DOMAIN_ID');
            $table->integer('ORG_ID')->unsigned();
            $table->string('DOMAIN_URL');
            $table->string('DOMAIN_SECTOR');
            $table->DateTime('START_DATE');
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nullable();

        });

Schema::table('fl_domain',function(Blueprint $table){

$table->foreign('ORG_ID')->references('ORG_ID')->on('fl_org')->onDelete('cascade');
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
        Schema::dropIfExists('fl_domain');

    }
}

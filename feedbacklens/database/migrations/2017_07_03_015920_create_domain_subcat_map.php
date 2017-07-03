<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDomainSubcatMap extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        schema::create('fl_domain_subcat_map',function(Blueprint $table){

            $table->increments('DOMAIN_SUBCAT_ID');
            $table->integer('DOMAIN_ID')->unsigned();
            $table->integer('SUBCAT_ID')->unsigned();
            $table->boolean('ISACTIVE')->Default(false);
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nullable();
            
           

        });

     schema::table('fl_domain_subcat_map',function(Blueprint $table)
   {
    $table->foreign('DOMAIN_ID')->references('DOMAIN_ID')->on('fl_domain')->onDelete('cascade');
  $table->foreign('SUBCAT_ID')->references('SUBCAT_ID')->on('fl_subcategory_master')->onDelete('cascade');

}

);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('fl_domain_subcat_map');


    }
}

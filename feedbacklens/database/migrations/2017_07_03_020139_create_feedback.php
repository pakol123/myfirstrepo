<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeedback extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('fl_feedback', function (Blueprint $table) {
            $table->increments('FEEDBACK_ID');
            $table->integer('DOMAIN_ID')->unsigned();
            $table->string('URL');
            $table->integer('RATING');
            $table->integer('CAT_ID')->unsigned();
            $table->integer('SUBCAT_ID')->unsigned();
            $table->longtext('TEXT');
            $table->string('OS');
            $table->string('RESOLUTION');
            $table->string('BROWSER');
            $table->string('DEVICE');
            $table->string('COUNTRY');
            $table->string('IP');
            $table->string('EMAIL');
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nullable();
            

        });

          Schema::table('fl_feedback',function(Blueprint $table){
            $table->foreign('DOMAIN_ID')->references('DOMAIN_ID')->on('fl_domain')->onDelete('cascade');
            $table->foreign('CAT_ID')->references('CAT_ID')->on('fl_category_master')->onDelete('cascade');
            $table->foreign('SUBCAT_ID')->references('SUBCAT_ID')->on('fl_subcategory_master')->onDelete('cascade');
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
        Schema::dropIfExists('fl_feedback');

    }
}

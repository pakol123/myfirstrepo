<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubcategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('fl_subcategory_master', function (Blueprint $table) {
        $table->increments('SUBCAT_ID');
        $table->string('SUBCAT_NAME');
        $table->boolean('ISUSERDEF')->default(false);
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
        
        Schema::dropIfExists('fl_subcategory_master');

    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanMaster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //


            Schema::create('fl_plan_master', function (Blueprint $table) {
            $table->increments('PLAN_ID');
            $table->string('PLAN_NAME');
            $table->double('PLAN_AMOUNT');
            $table->integer('NO_OF_DOMAINS');
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nulable();
            
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
        Schema::dropIfExists('fl_plan_master');

    }
}

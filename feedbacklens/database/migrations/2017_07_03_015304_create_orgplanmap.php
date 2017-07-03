<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrgplanmap extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('fl_org_plan_map', function (Blueprint $table) {
            $table->increments('ORG_PLAN_MAP_ID');
            $table->integer('ORG_ID')->unsigned();
            $table->integer('PLAN_ID')->unsigned();
            $table->date('START_DATE');
            $table->date('END_DATE')->nullable();
            $table->boolean('IS_ACTIVE')->default(false);
            $table->timestamp('CREATED_AT');
            $table->integer('CREATED_BY');
            $table->timestamp('MODIFIED_AT')->nullable();
            $table->integer('MODIFIED_BY')->nullable();
        
            
        });
        Schema::table('fl_org_plan_map',function (Blueprint $table) {
$table->foreign('PLAN_ID')->references('PLAN_ID')->on('fl_plan_master')->onDelete('cascade');
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
        Schema::dropIfExists('fl_org_plan_map');

    }
}

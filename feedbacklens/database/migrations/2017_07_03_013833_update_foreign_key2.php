<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateForeignKey2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //


        Schema::table('fl_users', function(Blueprint $table)
    {
        //$table->foreign('PLAN_ID')->references('PLAN_ID')->on('fl_plan_master')->onDelete('cascade');
        $table->foreign('ROLE_ID')->references('ROLE_ID')->on('fl_role_master')->onDelete('cascade');
        
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

        Schema::table('fl_users', function(Blueprint $table)
    {
    // $table->dropForeign(['PLAN_ID']);
     $table->dropForeign(['ROLE_ID']);
 });
    }

    }


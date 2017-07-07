<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUserForeignKey extends Migration
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
    Schema::table('fl_users', function(Blueprint $table)
    {
     $table->dropForeign(['ORG_ID']);
    });

    }
}

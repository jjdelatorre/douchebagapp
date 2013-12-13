<?php

class DouchejarUser extends Eloquent {

    protected $table = 'douchejar';
    protected $softDelete = true;
    protected $guarded = array('id');

    
}
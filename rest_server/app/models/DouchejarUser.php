<?php

class DouchejarUser extends Eloquent {

    protected $table = 'douchejar_user';
    protected $softDelete = true;
    protected $guarded = array('id');

     public function user()
    {
        return $this->hasOne('User', 'id', 'user_id');
    }
}
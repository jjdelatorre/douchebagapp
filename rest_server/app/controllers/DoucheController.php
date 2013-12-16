<?php

class DoucheController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = DB::select('SELECT user.id, user.username, (SELECT the_thing FROM douchejar_user where douchejar_user.user_id = user.id ORDER BY created_at DESC LIMIT 1) as last_thing, SUM(douchejar_user.point) AS points FROM USER JOIN douchejar_user ON user.id = douchejar_user.user_id  GROUP BY user.id ORDER BY points  DESC');

		if (count($users) > 0) {
			return Response::json($users, 200);
		} else {
			return Response::json(array(), 404);
		}
		
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
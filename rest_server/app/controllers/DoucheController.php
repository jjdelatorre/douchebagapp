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
		$rules = array(
					'user_id' => 'required|alpha_dash|exists:user,id',
					'douche_type' => 'required|exists:douchejar,id',
					'the_thing' => 'required',

			);

		$validator = Validator::make(Input::only('user_id', 'douche_type', 'the_thing'), $rules);

		if (! $validator->fails()) {
			
			try {
				$douchejar = Douchejar::find(Input::get('douche_type'));

				$new_douchejar_user = DouchejarUser::create(array(
					'user_id' => Input::get('user_id'),
					'douchejar_id' => Input::get('douche_type'),
					'point' => $douchejar->multiplier,
					'the_thing' => Input::get('the_thing'),
					)
				);		

			return Response::json(array(
											'id' => $new_douchejar_user->user->id,
											'username' => $new_douchejar_user->user->username,
											'last_thing' => $new_douchejar_user->the_thing,
											'points' => DB::table('douchejar_user')->where('user_id', $new_douchejar_user->user->id)->sum('point'),
											), 201);
				
			} catch (Exception $e) {
				return Response::json(array(
											'id' => '',
											'username' => '',
											'last_thing' => '',
											'points' => ''
											), 500);	
			}
		} else {
			return Response::json(array(
										'id' => '',
										'username' => '',
										'last_thing' => '',
										'points' => ''
										), 400);	
		}
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
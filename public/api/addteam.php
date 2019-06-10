<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$user_id = $_SESSION['user_data']['id'];

if(empty($_GET['team_id'])){
	throw new Exception('You must send a team_id with your request');
}

$teams = $_GET['team_id'];

$query = "SELECT `team_full_name`, `team_name`, `team_code`, `image_url`, `colors`, `league_name`
	FROM `teams`
	WHERE `id` IN ($teams)";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception(mysqli_error($conn));
}

if( mysqli_num_rows($result) === 0){
	throw new Exception("no team matches team id $team_id");
}

$team_data = mysqli_fetch_assoc($result);

if(!$user_id){
	throw new Exception("You need to be logged in to add teams");
	if(!$homepage_result){
		throw new Exception(mysqli_error($conn));
	}

	if(mysqli_affected_rows($conn)===0){
		throw new Exception('data was not added to user_teams table');
	}
} else {
	$team_array = explode(",", $teams);

	foreach ($team_array as $value) {
		$homepage_create_query = "INSERT INTO `user_teams` (`user_id`, `team_id`)
			VALUES ($user_id, $value)";

		$homepage_result = mysqli_query($conn, $homepage_create_query);

		if(!$homepage_result){
			throw new Exception(mysqli_error($conn));
		}
		if(mysqli_affected_rows($conn)===0){
			throw new Exception('data was not added to user_teams table');
		}
	}
}

$output = [
	'success' => true
];

print( json_encode($output));
?>
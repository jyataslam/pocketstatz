<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$user_id = $_SESSION['user_data']['id'];

if(empty($_GET['team_id'])){
	throw new Exception('You must send a team_id with your request');
}

$team_id = $_GET['team_id'];

$query = "DELETE FROM `user_teams`
    WHERE `user_id` = $user_id AND `team_id` = $team_id";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception(mysqli_error($conn));
}

$output = [
	'success' => true
];

print( json_encode($output));
?>
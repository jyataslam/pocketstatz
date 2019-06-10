<?php 

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

if(empty($_GET['team_id'])){
    throw new Exception('team_id is a required value');
}

$team = $_GET['team_id'];

$query = "SELECT t.`id`, t.`team_full_name`, t.`team_name`, t.`team_code`, t.`colors`, t.`league_name`, t.`image_url`, t.`api_key`
	FROM `teams` AS t
    WHERE t.`id` = $team
";

$data = mysqli_query($conn, $query);

if(!$data){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($data) === 0) {
    throw new Exception('Unable to retrieve team data');
}

$output = [];

while($row = mysqli_fetch_assoc($data)){
    $output = [
        'team_id' => (int) $row['id'],
        'team_full_name' => $row['team_full_name'],
        'team_name' => $row['team_name'],
        'team_code' => $row['team_code'],
        'logo' => $row['image_url'],
        'colors' => $row['colors'],
        'league_name' => $row['league_name'],
        'api_key' => $row['api_key']
    ];
}

$output['success'] = true;

print(json_encode($output));

?>
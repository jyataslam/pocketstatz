<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

if(empty($_GET['team_ids'])){
    throw new Exception('team ids are a required value');
}

$teams = $_GET['team_ids'];

// $array_to_string = explode(",", $teams);
// $string_teams = implode(" , ", $array_to_string);

$teams_query = "SELECT 
    t.`id`, t.`api_key`, t.`team_full_name`, t.`team_name`, t.`team_code`, t.`colors`, t.`league_name`, t.`image_url`
    FROM `teams` AS `t`
    WHERE t.`id` IN ($teams)
";

$teams_data = mysqli_query($conn, $teams_query);

if(!$teams_data){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($teams_data) === 0) {
    throw new Exception('Unable to retrieve data about the user teams');
}

$output['user_teams'] = [];

while($row = mysqli_fetch_assoc($teams_data)){
    $output['user_teams'][] = [
        'id' => (int) $row['id'],
        'api_key' => $row['api_key'],
        'team_full_name' => $row['team_full_name'],
        'team_name' => $row['team_name'],
        'team_code' => $row['team_code'],
        'logo' => $row['image_url'],
        'colors' => $row['colors'],
        'league_name' => $row['league_name']
    ];
}

$output['success'] = true;

print(json_encode($output));

?>
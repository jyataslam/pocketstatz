<?php 

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

if(empty($_GET['sport_name'])){
    throw new Exception('sport_name is a required value');
}

$sport_type = $_GET['sport_name'];

$query = "SELECT t.`id`, t.`team_full_name`, t.`team_code`, t.`league_name`, t.`image_url`, t.`api_key`, t.`colors`
	FROM `teams` AS t
    JOIN `league` AS l ON t.`league_name` = l.`mid`
    WHERE l.`mid` = '$sport_type'
	ORDER BY t.`league_name`
";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception('invalid query: '. mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0) {
    throw new Exception('unable to retrieve team data');
}

$output['teams'] = [];

while($row = mysqli_fetch_assoc($result)){
    $output['teams'][] = [
        'id' => (int) $row['id'],
        'team_full_name' => $row['team_full_name'],
        'team_code' => $row['team_code'],
        'image_url' => $row['image_url'],
        'league_name' => $row['league_name'],
        'api_key' => $row['api_key'],
        'color' => $row['colors']
    ];
}

$output['success'] = true;

$json_output = json_encode( $output );
print( $json_output );
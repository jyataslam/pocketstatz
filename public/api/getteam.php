<?php 

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$sport_type = 'NBA';

$query = "SELECT t.`id`, t.`team_full_name`, t.`team_name`, t.`team_code`, t.`colors`, t.`image_url`
	FROM `teams` AS t
    WHERE t.`league_name` = '$sport_type'
	ORDER BY t.`id`
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
        'team_name' => $row['team_name'],
        'team_code' => $row['team_code'],
        'logo' => $row['image_url'],
        'colors' => $row['colors']
    ];
}

$output['success'] = true;

$json_output = json_encode( $output );
print( $json_output );
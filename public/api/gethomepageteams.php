<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    'success' => false
];

$user_id = $_SESSION['user_data']['id'];

$homepage_query = "SELECT 
    u_t.`team_id`,
    t.`id`, t.`team_full_name`, t.`team_name`, t.`team_code`, t.`colors`, t.`league_name`, t.`image_url`
    FROM `users` AS `u`
    JOIN `user_teams` AS `u_t` ON u_t.`user_id` = u.`id`
    JOIN `teams` AS `t` ON t.`id` = u_t.`team_id`
    WHERE u_t.`user_id` = '$user_id' AND u.`id` = '$user_id'";

$homepage_data = mysqli_query($conn, $homepage_query);

if(!$homepage_data){
    throw new Exception(mysqli_error($conn));
}

$output['homepage_items'] = [];

while($row = mysqli_fetch_assoc($homepage_data)){
    $output['homepage_items'][] = [
        'team_id' => (int) $row['team_id'],
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
<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    'success' => false
];

$jsonInput = file_get_contents("php://input");

$input = json_decode($jsonInput, true);

if(empty($input['username']))
{
    throw new Exception('Username is a required value');
}

if(empty($input['password']))
{
    throw new Exception('Password is a required value');
}

$username = $input['username'];
$password = $input['password'];

$username = addslashes($username);

$hashedPassword = sha1($password);
unset($input['password']);

$query = "SELECT `id`, `username` FROM `users`
    WHERE `username` = '$username' AND `password` = '$hashedPassword'";

$result = mysqli_query($conn, $query);

if(!$result)
{
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) !== 1)
{
    throw new Exception('Invalid username or password');
}

$data = mysqli_fetch_assoc($result);

$token = $username . $data['id'] . microtime();
$token = sha1($token);

$connectQuery = "INSERT INTO `user_connections` SET
    `token` = '$token',
    `users_id` =  {$data['id']},
    `created` = NOW(),
    `ip_address` = '{$_SERVER['REMOTE_ADDR']}'
";

$connectResult= mysqli_query($conn, $connectQuery);

if(!$connectResult)
{
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1)
{
    throw new Exception('Could not log you in: connection not saved');
}

$_SESSION['user_data'] = [
    'id' => $data['id'],
    'username' => $data['username'],
    'token' => $token
];

$output['success'] = true;
$output['username'] = $data['username'];
$output['token'] = $token;

$jsonOutput = json_encode($output);

print($jsonOutput);

?>

<?php
session_start();

unset($_SESSION['user_data']);

print json_encode(['success' => true]);

?>
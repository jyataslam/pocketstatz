<?php

$ch = curl_init();

$team = $_GET['team_name'];

curl_setopt($ch, CURLOPT_URL, "https://api.mysportsfeeds.com/v2.1/pull/nba/latest/games.json?date=until-today&limit=2&sort=game.starttime.d&team=$team");

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch, CURLOPT_ENCODING, "gzip");

curl_setopt($ch, CURLOPT_HTTPHEADER, [
	"Authorization: Basic " . base64_encode("3e6e4d51-a167-4f95-bd66-1e0b36" . ":" . "MYSPORTSFEEDS")
]);

$resp = curl_exec($ch);

if (!$resp) {
	die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
} else {
    $decodedResp = json_decode($resp);

    if ($decodedResp->games === []) {
        unset($resp, $decodedResp);
        $lastSeason = (date("Y")-1)."-".date("Y");
        curl_setopt($ch, CURLOPT_URL, "https://api.mysportsfeeds.com/v2.1/pull/nba/$lastSeason/games.json?limit=1&status=final&sort=game.starttime.d&team=$team");
        $resp = curl_exec($ch);
        $decodedResp = json_decode($resp);
    }

    $_GET['latestGameId'] = $decodedResp->games[0]->schedule->id;

    if (!empty($decodedResp->games[1])) {
        $_GET['backupGameId'] = $decodedResp->games[1]->schedule->id;
    }
    
    include 'getnbagamestats.php';
}

?>
<?php

$ch = curl_init();

$team = '100';

curl_setopt($ch, CURLOPT_URL, "https://api.sportsdata.io/v3/lol/scores/json/CompetitionDetails/100000005");

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch, CURLOPT_ENCODING, "gzip");

curl_setopt($ch, CURLOPT_HTTPHEADER, [
	"Ocp-Apim-Subscription-Key: 8e4fde7a044c4bea8eb71531fe44afb8"
]);

$resp = curl_exec($ch);

if (!$resp) {
	die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
} else {
    $decodedResp = json_decode($resp);
    $endOfArray = count($decodedResp->Games) - 1;
    for ($gameIndex = $endOfArray; $gameIndex; $gameIndex--) {
        if ($decodedResp->Games[$gameIndex]->TeamAKey === $team || $decodedResp->Games[$gameIndex]->TeamBKey === $team) {
            $gameId = $decodedResp->Games[$gameIndex]->GameId;
            $_GET['game_id'] = $gameId;
            include 'getlolgamestats.php';
            return;
        }
    }
}

?>
<?php

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.sportsdata.io/v3/lol/stats/json/BoxScore/".$_GET['game_id']);

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
    print_r($decodedResp);
}

curl_close($ch);

?>
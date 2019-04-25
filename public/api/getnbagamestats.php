<?php

// Get cURL resource
$ch = curl_init();

// Set url
curl_setopt($ch, CURLOPT_URL, "https://api.mysportsfeeds.com/v2.1/pull/nba/current/games/".$_GET['latestGameId']."/boxscore.json");

// Set method
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

// Set options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// Set compression
curl_setopt($ch, CURLOPT_ENCODING, "gzip");

// Set headers
curl_setopt($ch, CURLOPT_HTTPHEADER, [
	"Authorization: Basic " . base64_encode("3e6e4d51-a167-4f95-bd66-1e0b36" . ":" . "MYSPORTSFEEDS")
]);

// Send the request & save response to $resp
$resp = curl_exec($ch);

if (!$resp && curl_errno($ch) === 0) {
    //latestGameId is a game that has not started yet, try again with backupGameId
    unset($resp);
    curl_setopt($ch, CURLOPT_URL, "https://api.mysportsfeeds.com/v2.1/pull/nba/current/games/".$_GET['backupGameId']."/boxscore.json");
    $resp = curl_exec($ch);
} elseif (!$resp) {
    //some other error
    die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
}

$decodedResp = json_decode($resp);
$adjustedDate = date_sub(date_create($decodedResp->game->startTime), date_interval_create_from_date_string("7 hours"));
$formattedDate = date_format($adjustedDate, "F j, Y");
    
$output = [
    "success" => true,
    "gameDetails" => [
        "gameDate" => $formattedDate,
        "currentQuarter" => $decodedResp->scoring->currentQuarter,
        "quarterTimeRemaining" => $decodedResp->scoring->currentQuarterSecondsRemaining
    ],
    "homeTeam" => [
        "teamName" => $decodedResp->game->homeTeam->abbreviation,
        "teamScore" => $decodedResp->scoring->homeScoreTotal,
        "teamPlayers" => []
    ],
    "awayTeam" => [
        "teamName" => $decodedResp->game->awayTeam->abbreviation,
        "teamScore" => $decodedResp->scoring->awayScoreTotal,
        "teamPlayers" => []
    ]
];

$homePlayers = $decodedResp->stats->home->players;
$awayPlayers = $decodedResp->stats->away->players;

$playerNum = 1;

foreach($homePlayers as $player) {
    $name = $player->player->firstName.' '.$player->player->lastName;
    $position = $player->player->position;
    $points = $player->playerStats[0]->offense->pts;
    $triplePoints = $player->playerStats[0]->fieldGoals->fg3PtMade;
    $rebounds = $player->playerStats[0]->rebounds->reb;
    $assists = $player->playerStats[0]->offense->ast;
    $steals = $player->playerStats[0]->defense->stl;

    $output["homeTeam"]["teamPlayers"]["player".$playerNum]["name"] = $name;
    $output["homeTeam"]["teamPlayers"]["player".$playerNum]["position"] = $position;
    $output["homeTeam"]["teamPlayers"]["player".$playerNum]["points"] = $points;
    $output["homeTeam"]["teamPlayers"]["player".$playerNum]["triplePoints"] = $triplePoints;
    $output["homeTeam"]["teamPlayers"]["player".$playerNum]["rebounds"] = $rebounds;
    $output["homeTeam"]["teamPlayers"]["player".$playerNum]["assists"] = $assists;
    $output["homeTeam"]["teamPlayers"]["player".$playerNum]["steals"] = $steals;

    $playerNum++;
}

$playerNum = 1;

foreach($awayPlayers as $player) {
    $name = $player->player->firstName.' '.$player->player->lastName;
    $position = $player->player->position;
    $points = $player->playerStats[0]->offense->pts;
    $triplePoints = $player->playerStats[0]->fieldGoals->fg3PtMade;
    $rebounds = $player->playerStats[0]->rebounds->reb;
    $assists = $player->playerStats[0]->offense->ast;
    $steals = $player->playerStats[0]->defense->stl;

    $output["awayTeam"]["teamPlayers"]["player".$playerNum]["name"] = $name;
    $output["awayTeam"]["teamPlayers"]["player".$playerNum]["position"] = $position;
    $output["awayTeam"]["teamPlayers"]["player".$playerNum]["points"] = $points;
    $output["awayTeam"]["teamPlayers"]["player".$playerNum]["triplePoints"] = $triplePoints;
    $output["awayTeam"]["teamPlayers"]["player".$playerNum]["rebounds"] = $rebounds;
    $output["awayTeam"]["teamPlayers"]["player".$playerNum]["assists"] = $assists;
    $output["awayTeam"]["teamPlayers"]["player".$playerNum]["steals"] = $steals;

    $playerNum++;
}

$jsonOutput = json_encode($output);
print($jsonOutput);

// Close request to clear up some resources
curl_close($ch);

?>
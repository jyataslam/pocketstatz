<?php

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.mysportsfeeds.com/v2.1/pull/nhl/current/games/".$_GET['latestGameId']."/boxscore.json");

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch, CURLOPT_ENCODING, "gzip");

curl_setopt($ch, CURLOPT_HTTPHEADER, [
	"Authorization: Basic " . base64_encode("3e6e4d51-a167-4f95-bd66-1e0b36" . ":" . "MYSPORTSFEEDS")
]);

$resp = curl_exec($ch);

if (!$resp && curl_errno($ch) === 0) {
    unset($resp);
    curl_setopt($ch, CURLOPT_URL, "https://api.mysportsfeeds.com/v2.1/pull/nhl/current/games/".$_GET['backupGameId']."/boxscore.json");
    $resp = curl_exec($ch);
} elseif (!$resp) {
    die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
}

$decodedResp = json_decode($resp);
$adjustedDate = date_sub(date_create($decodedResp->game->startTime), date_interval_create_from_date_string("7 hours"));
$formattedDate = date_format($adjustedDate, "F j, Y");
    
$output = [
    "success" => true,
    "gameDetails" => [
        "gameDate" => $formattedDate,
        "gameStatus" => $decodedResp->game->playedStatus,
        "currentPeriod" => $decodedResp->scoring->currentPeriod,
        "periodTimeRemaining" => $decodedResp->scoring->currentPeriodSecondsRemaining,
        "currentIntermission" => $decodedResp->scoring->currentIntermission
    ],
    "homeTeam" => [
        "teamName" => $decodedResp->game->homeTeam->abbreviation,
        "teamScore" => $decodedResp->scoring->homeScoreTotal,
        "teamPlayers" => [
            "forwards" => [],
            "defensemen" => [],
            "goalies" => []
        ]
    ],
    "awayTeam" => [
        "teamName" => $decodedResp->game->awayTeam->abbreviation,
        "teamScore" => $decodedResp->scoring->awayScoreTotal,
        "teamPlayers" => [
            "forwards" => [],
            "defensemen" => [],
            "goalies" => []
        ]
    ]
];

$homePlayers = $decodedResp->stats->home->players;
$awayPlayers = $decodedResp->stats->away->players;

$playerNum = 1;

foreach($homePlayers as $player) {
    $name = $player->player->firstName.' '.$player->player->lastName;
    $position = $player->player->position;
    
    switch ($position) {
        case "C":
        case "LW":
        case "RW":
            $goals = $player->playerStats[0]->scoring->goals;
            $assists = $player->playerStats[0]->scoring->assists;
            $shots = $player->playerStats[0]->skating->shots;
            $shotPercentage = $player->playerStats[0]->skating->shotPercentage;
            $output["homeTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["name"] = $name;
            $output["homeTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["position"] = $position;
            $output["homeTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["goals"] = $goals;
            $output["homeTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["assists"] = $assists;
            $output["homeTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["shots"] = $shots;
            $output["homeTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["shotPercentage"] = $shotPercentage;
            break;
        case "D":
            $goals = $player->playerStats[0]->scoring->goals;
            $assists = $player->playerStats[0]->scoring->assists;
            $blockedShots = $player->playerStats[0]->skating->blockedShots;
            $hits = $player->playerStats[0]->skating->hits;
            $output["homeTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["name"] = $name;
            $output["homeTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["position"] = $position;
            $output["homeTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["goals"] = $goals;
            $output["homeTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["assists"] = $assists;
            $output["homeTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["blockedShots"] = $blockedShots;
            $output["homeTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["hits"] = $hits;
            break;
        case "G":
            $shotsAgainst = $player->playerStats[0]->goaltending->shotsAgainst;
            $goalsAgainst = $player->playerStats[0]->goaltending->goalsAgainst;
            $saves = $player->playerStats[0]->goaltending->saves;
            $savePercentage = $player->playerStats[0]->goaltending->savePercentage;
            $output["homeTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["name"] = $name;
            $output["homeTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["position"] = $position;
            $output["homeTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["shotsAgainst"] = $shotsAgainst;
            $output["homeTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["goalsAgainst"] = $goalsAgainst;
            $output["homeTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["saves"] = $saves;
            $output["homeTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["savePercentage"] = $savePercentage;
            break;
    }

    $playerNum++;
}

$playerNum = 1;

foreach($awayPlayers as $player) {
    $name = $player->player->firstName.' '.$player->player->lastName;
    $position = $player->player->position;
    
    switch ($position) {
        case "C":
        case "LW":
        case "RW":
            $goals = $player->playerStats[0]->scoring->goals;
            $assists = $player->playerStats[0]->scoring->assists;
            $shots = $player->playerStats[0]->skating->shots;
            $shotPercentage = $player->playerStats[0]->skating->shotPercentage;
            $output["awayTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["name"] = $name;
            $output["awayTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["position"] = $position;
            $output["awayTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["goals"] = $goals;
            $output["awayTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["assists"] = $assists;
            $output["awayTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["shots"] = $shots;
            $output["awayTeam"]["teamPlayers"]["forwards"]["player".$playerNum]["shotPercentage"] = $shotPercentage;
            break;
        case "D":
            $goals = $player->playerStats[0]->scoring->goals;
            $assists = $player->playerStats[0]->scoring->assists;
            $blockedShots = $player->playerStats[0]->skating->blockedShots;
            $hits = $player->playerStats[0]->skating->hits;
            $output["awayTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["name"] = $name;
            $output["awayTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["position"] = $position;
            $output["awayTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["goals"] = $goals;
            $output["awayTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["assists"] = $assists;
            $output["awayTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["blockedShots"] = $blockedShots;
            $output["awayTeam"]["teamPlayers"]["defensemen"]["player".$playerNum]["hits"] = $hits;
            break;
        case "G":
            $shotsAgainst = $player->playerStats[0]->goaltending->shotsAgainst;
            $goalsAgainst = $player->playerStats[0]->goaltending->goalsAgainst;
            $saves = $player->playerStats[0]->goaltending->saves;
            $savePercentage = $player->playerStats[0]->goaltending->savePercentage;
            $output["awayTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["name"] = $name;
            $output["awayTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["position"] = $position;
            $output["awayTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["shotsAgainst"] = $shotsAgainst;
            $output["awayTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["goalsAgainst"] = $goalsAgainst;
            $output["awayTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["saves"] = $saves;
            $output["awayTeam"]["teamPlayers"]["goalies"]["player".$playerNum]["savePercentage"] = $savePercentage;
            break;
    }

    $playerNum++;
}

$jsonOutput = json_encode($output);
print($jsonOutput);

curl_close($ch);

?>
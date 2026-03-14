
let player1Choice = '';
let player2Choice = '';
let scores = { player1: 0, player2: 0, roundsPlayed: 0, totalRounds: 5 };
let pickStats = { king: 0, queen: 0, thief: 0, police: 0 };

const outcomes = {
  king: { king: "draw", queen: "lose", thief: "win", police: "lose" },
  queen: { king: "win", queen: "draw", thief: "lose", police: "win" },
  thief: { king: "lose", queen: "win", thief: "draw", police: "lose" },
  police: { king: "win", queen: "lose", thief: "win", police: "draw" }
};

function setChoice(player, role) {
  if (player === 'player1') {
    player1Choice = role;
    trackPick(role);
  } else if (player === 'player2') {
    player2Choice = role;
    trackPick(role);
  }
}

function trackPick(choice) {
  pickStats[choice]++;
  renderPickStats();
}

function renderPickStats() {
  const statsDiv = document.getElementById('pickStats');
  if (statsDiv) {
    statsDiv.textContent = `Pick Stats: ${JSON.stringify(pickStats)}`;
  }
}

function getWinPercentage(player) {
  return ((scores[player] / scores.roundsPlayed) * 100 || 0).toFixed(1) + "%";
}


function checkWinner() {
  const resultDiv = document.getElementById('result');

  if (!player1Choice || !player2Choice) {
    resultDiv.textContent = "Both players must choose! This field cannot be empty!";
    resultDiv.style.color = "red";
    return;
  }

  const outcome = outcomes[player1Choice][player2Choice];

  if (outcome === "draw") {
    resultDiv.textContent = `It's a Draw! Both chose ${player1Choice}`;
    resultDiv.style.color = "green";
  } else if (outcome === "win") {
    resultDiv.textContent = `Player 1 wins! ${player1Choice} beats ${player2Choice}`;
    resultDiv.style.color = "red";
    scores.player1++;
  } else if (outcome === "lose") {
    resultDiv.textContent = `Player 2 wins! ${player2Choice} beats ${player1Choice}`;
    resultDiv.style.color = "purple";
    scores.player2++;
  } else {
    resultDiv.textContent = "No clear rule for this matchup!";
    resultDiv.style.color = "black";
  }

 
  scores.roundsPlayed++;
  renderScoreboard();

 
  if (scores.roundsPlayed >= scores.totalRounds) {
    endGame();
  }

  player1Choice = '';
  player2Choice = '';
}

function renderScoreboard() {
  const p1Div = document.getElementById('player1Score');
  const p2Div = document.getElementById('player2Score');
  const roundDiv = document.getElementById('rounds');

  if (p1Div) p1Div.textContent = `Player 1: ${scores.player1} (${getWinPercentage('player1')})`;
  if (p2Div) p2Div.textContent = `Player 2: ${scores.player2} (${getWinPercentage('player2')})`;
  if (roundDiv) roundDiv.textContent = `Round: ${scores.roundsPlayed}/${scores.totalRounds}`;
}

function endGame() {
  const winner = scores.player1 > scores.player2
    ? "Player 1 wins the game!"
    : scores.player2 > scores.player1
      ? "Player 2 wins the game!"
      : "The game ends in a Draw!";
  alert(`Game Over! ${winner}`);
}


function aiChoice(difficulty="easy") {
  const choices = ["king", "queen", "thief", "police"];
  if (difficulty === "easy") {
    return choices[Math.floor(Math.random()*choices.length)];
  } else {
    const counterMap = { king: "police", queen: "king", thief: "queen", police: "thief" };
    return counterMap[player1Choice] || choices[Math.floor(Math.random()*choices.length)];
  }
}

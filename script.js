let player1Choice = '';
let player2Choice = '';

function setChoice(player, role) {
  if (player === 'player1') {
    player1Choice = role;
  } else {
    player2Choice = role;
  }
}

function checkwinner() {
  const result = document.getElementById('result');

  if (!player1Choice || !player2Choice) {
    result.textContent = "Both players must choose,this field cannot be empty!";
    result.style.color = "red";
    return;
  }


  const winMap = {
    king: { beats: "thief" },
    thief: { beats: "queen" },
    police: { beats: "thief" },
    queen: { beats: "king" }
  };

  if (player1Choice === player2Choice) {
    result.textContent = " It's a Draw! Both chosen " + player1Choice;
    result.style.color = "green";
  } else if (winMap[player1Choice]?.beats === player2Choice) {
    result.textContent = `Player 1 wins! ${player1Choice} beats ${player2Choice}`;
    result.style.color = "red";
  } else if (winMap[player2Choice]?.beats === player1Choice) {
    result.textContent = `Player 2 wins! ${player2Choice} beats ${player1Choice}`;
    result.style.color = "purple";
  } else {
    result.textContent = "No clear rule for this matchup!";
    result.style.color = "black";
  }

  
  player1Choice = '';
  player2Choice = '';
}


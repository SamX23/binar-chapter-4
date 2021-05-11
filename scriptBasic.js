// Initiation
let playerPick;
let comPick;
let resultState = [];

// Player
const batu = document.getElementById("batu-player");
const kertas = document.getElementById("kertas-player");
const gunting = document.getElementById("gunting-player");
// Com
const batuCom = document.getElementById("batu-com");
const kertasCom = document.getElementById("kertas-com");
const guntingCom = document.getElementById("gunting-com");
// Result initiation
const resultText = document.createElement("H1");
const resultContainer = document.getElementById("vs_result");
const resetResult = document.getElementById("reset");

// Add listener to button picker
batu.addEventListener("click", () => {
  playerPick = "batu";
  console.log("batu");
  play();
});
kertas.addEventListener("click", () => {
  playerPick = "kertas";
  console.log("kertas");
  play();
});
gunting.addEventListener("click", () => {
  playerPick = "gunting";
  console.log("gunting");
  play();
});

batuCom.addEventListener("click", () => console.log("batu-com"));
kertasCom.addEventListener("click", () => console.log("kertas-com"));
guntingCom.addEventListener("click", () => console.log("gunting-com"));

// Normal result
const defaultResult = () => {
  resultText.innerHTML = "VS";
  resultContainer.appendChild(resultText);
  resultContainer.classList.remove("versus_result");
  resultContainer.classList.remove("draw");
};

// Win result
const winResult = () => {
  resultText.innerHTML = "PLAYER WIN";
  resultContainer.appendChild(resultText);
  resultContainer.classList.add("versus_result");
  resultContainer.classList.remove("draw");
};

// Lose result
const loseResult = () => {
  resultText.innerHTML = "COM WIN";
  resultContainer.appendChild(resultText);
  resultContainer.classList.add("versus_result");
  resultContainer.classList.remove("draw");
};

// Draw result
const drawResult = () => {
  resultText.innerHTML = "DRAW";
  resultContainer.appendChild(resultText);
  resultContainer.classList.add("versus_result");
  resultContainer.classList.add("draw");
};

// Reset Result
resetResult.addEventListener("click", () => defaultResult());

// Result switch
const play = () => {
  switch (playerPick) {
    case "batu":
      winResult();
      break;

    case "kertas":
      loseResult();
      break;

    case "gunting":
      drawResult();
      break;

    default:
      defaultResult();
      break;
  }
};

play();

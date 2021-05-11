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
const resetButton = document.getElementById("reset");

const onClick = (button, value) => {
  button.setAttribute("value", value);
  playerPick = value;
  play();
};

// Add listener to button picker
const playerListener = () => {
  batu.addEventListener("click", () => {
    onClick(batu, "batu");
  });
  kertas.addEventListener("click", () => {
    onClick(kertas, "kertas");
  });
  gunting.addEventListener("click", () => {
    onClick(gunting, "gunting");
  });
};
const botListener = () => {
  batuCom.addEventListener("click", () => {
    onClick(batuCom, "batu");
  });
  kertasCom.addEventListener("click", () => {
    onClick(kertasCom, "kertas");
  });
  guntingCom.addEventListener("click", () => {
    onClick(guntingCom, "gunting");
  });
};

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

const resetClass = (arrayButton) => {
  arrayButton.forEach((item) => {
    item.classList.remove("active_choice");
  });
};

// Reset Result
const resetResult = () => {
  resetButton.addEventListener("click", () => {
    resetClass([batu, kertas, gunting, batuCom, kertasCom, guntingCom]);
    defaultResult();
  });
};

const activeChoice = () => {
  switch (playerPick) {
    case "batu":
      batu.classList.add("active_choice");
      kertas.classList.remove("active_choice");
      gunting.classList.remove("active_choice");
      break;

    case "kertas":
      batu.classList.remove("active_choice");
      kertas.classList.add("active_choice");
      gunting.classList.remove("active_choice");
      break;

    case "gunting":
      batu.classList.remove("active_choice");
      kertas.classList.remove("active_choice");
      gunting.classList.add("active_choice");
      break;

    default:
      break;
  }
};

const resultIndicator = () => {
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

// Result switch
const play = () => {
  playerListener();
  // botListener();
  resetResult();
  activeChoice();
  resultIndicator();
};

play();

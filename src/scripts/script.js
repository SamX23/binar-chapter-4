class Player {
  constructor() {
    this.choice;
    this.batu = document.getElementsByClassName("batu");
    this.kertas = document.getElementsByClassName("kertas");
    this.gunting = document.getElementsByClassName("gunting");
  }
}

class Human extends Player {
  constructor(choice, batu, kertas, gunting) {
    super(choice, batu, kertas, gunting);
    this._initiation();
  }

  _initiation() {
    this.batu[0].id = "batu-player";
    this.kertas[0].id = "kertas-player";
    this.gunting[0].id = "gunting-player";
  }
}

class Bot extends Player {
  constructor(choice, batu, kertas, gunting) {
    super(choice, batu, kertas, gunting);
    this._initiation();
  }

  _initiation() {
    this.batu[1].id = "batu-com";
    this.kertas[1].id = "kertas-com";
    this.gunting[1].id = "gunting-com";
  }
}

class Rules {
  constructor() {
    this.resultText = document.createElement("H1");
    this.resultContainer = document.getElementById("vs_result");
  }

  defaultState = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.remove("versus_result");
    this.resultText.innerHTML = "VS";
    this.resultContainer.appendChild(this.resultText);
  };

  _winResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    console.log("Result : PLAYER Win");
  };

  _loseResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    console.log("Result : COM Win");
  };

  _drawResult = () => {
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.add("draw");
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    console.log("Result : Draw");
  };

  decision = (userChoice, botChoice) => {
    if (
      (userChoice === "batu" && botChoice === "batu") ||
      (userChoice === "kertas" && botChoice === "kertas") ||
      (userChoice === "gunting" && botChoice === "gunting")
    ) {
      return this._drawResult();
    } else if (
      (userChoice === "batu" && botChoice === "gunting") ||
      (userChoice === "kertas" && botChoice === "batu") ||
      (userChoice === "gunting" && botChoice === "kertas")
    ) {
      return this._winResult();
    } else if (
      (userChoice === "batu" && botChoice === "kertas") ||
      (userChoice === "kertas" && botChoice === "gunting") ||
      (userChoice === "gunting" && botChoice === "batu")
    ) {
      return this._loseResult();
    }
  };

  randomizer = (max) => Math.floor(Math.random() * max);
}

class Game extends Rules {
  constructor() {
    super();
    this.result = [];
    this.resetResult = document.getElementById("reset");
    this._initiation();
  }

  _initiation() {
    this.user = new Human();
    this.com = new Bot();
    this.defaultState();
    this.reset();
    console.log("Game Initiated");
  }

  getUserPick = (choice) => {
    this.user.choice = choice;
    console.log("Player pick: ", this.user.choice);
    return this.user.choice;
  };

  getComPick = (choice) => {
    this.com.choice = choice;
    console.log("Com pick: ", this.com.choice);
    return this.com.choice;
  };

  setPlayerListener = () => {
    this.user.batu[0].addEventListener("click", () => {
      this.result[0] = this.getUserPick("batu");
      this.user.batu[0].classList.add("active_choice");
      this.user.kertas[0].classList.remove("active_choice");
      this.user.gunting[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.decideResult();
    });

    this.user.kertas[0].addEventListener("click", () => {
      this.result[0] = this.getUserPick("kertas");
      this.user.batu[0].classList.remove("active_choice");
      this.user.kertas[0].classList.add("active_choice");
      this.user.gunting[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.decideResult();
    });

    this.user.gunting[0].addEventListener("click", () => {
      this.result[0] = this.getUserPick("gunting");
      this.user.batu[0].classList.remove("active_choice");
      this.user.kertas[0].classList.remove("active_choice");
      this.user.gunting[0].classList.add("active_choice");
      this.removePlayerListener();
      this.decideResult();
    });
  };

  setComListener = () => {
    this.com.batu[1].addEventListener("click", () => {
      this.result[1] = this.getComPick("batu");
      this.com.batu[1].classList.add("active_choice");
      this.com.kertas[1].classList.remove("active_choice");
      this.com.gunting[1].classList.remove("active_choice");
      this.decideResult();
    });
    this.com.kertas[1].addEventListener("click", () => {
      this.result[1] = this.getComPick("kertas");
      this.com.batu[1].classList.remove("active_choice");
      this.com.kertas[1].classList.add("active_choice");
      this.com.gunting[1].classList.remove("active_choice");
      this.decideResult();
    });
    this.com.gunting[1].addEventListener("click", () => {
      this.result[1] = this.getComPick("gunting");
      this.com.batu[1].classList.remove("active_choice");
      this.com.kertas[1].classList.remove("active_choice");
      this.com.gunting[1].classList.add("active_choice");
      this.decideResult();
    });
  };

  removePlayerListener = () => {
    document.getElementsByClassName("batu")[0].disabled = true;
    document.getElementsByClassName("kertas")[0].disabled = true;
    document.getElementsByClassName("gunting")[0].disabled = true;
  };

  removeComListener = () => {
    document.getElementsByClassName("batu")[1].disabled = true;
    document.getElementsByClassName("kertas")[1].disabled = true;
    document.getElementsByClassName("gunting")[1].disabled = true;
  };

  decideResult() {
    console.log("Current result: ", this.result);

    if (this.user.choice !== null && !this.com.choice) {
      this.setComListener();
    }

    if (this.user.choice && this.com.choice) {
      this.decision(this.user.choice, this.com.choice);
      document.querySelectorAll(".choice").forEach((x) => (x.disabled = true));
    }
  }

  play() {
    console.log("Lets play!");
    this.setPlayerListener();
  }

  reset() {
    this.resetResult.addEventListener("click", () => {
      this.defaultState();
      this.result.splice(0, this.result.length);
      this.user.choice = null;
      this.com.choice = null;
      document.querySelectorAll(".choice").forEach((x) => {
        x.classList.remove("active_choice");
        x.disabled = false;
      });
      console.log("Restart Games");
    });
  }
}

const gas = new Game();
gas.play();

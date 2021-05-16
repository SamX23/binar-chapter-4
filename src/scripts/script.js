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

  defaultResult = () => {
    this.resultText.innerHTML = "VS";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.remove("versus_result");
    this.resultContainer.classList.remove("draw");
  };

  winResult = () => {
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.remove("draw");
  };

  loseResult = () => {
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.remove("draw");
  };

  drawResult = () => {
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.add("draw");
  };

  decision = (userChoice, botChoice) => {
    if (userChoice === botChoice) {
      return this.drawResult();
    } else if (
      (userChoice === "batu" && botChoice === "gunting") ||
      (userChoice === "kertas" && botChoice === "batu") ||
      (userChoice === "gunting" && botChoice === "kertas")
    ) {
      return this.winResult();
    } else if (
      (userChoice === "batu" && botChoice === "kertas") ||
      (userChoice === "kertas" && botChoice === "gunting") ||
      (userChoice === "gunting" && botChoice === "batu")
    ) {
      return this.loseResult();
    }
  };
}

class Game extends Rules {
  constructor() {
    super();
    this.result = [];
    this.playerHasPick = false;
    this.resetResult = document.getElementById("reset");
    this._initiation();
  }

  _initiation() {
    this.user = new Human();
    this.com = new Bot();
    this.defaultResult();
    this.reset();
  }

  reset() {
    this.resetResult.addEventListener("click", () => {
      this.defaultResult();
      this.result = [];
      this.playerHasPick = false;
      this.user.batu[0].classList.remove("active_choice");
      this.user.kertas[0].classList.remove("active_choice");
      this.user.gunting[0].classList.remove("active_choice");
      console.log("reset");
    });
  }

  getUserPick = (choice) => {
    this.user.choice = choice;
    this.playerHasPick = true;
    console.log("Player pick: ", this.user.choice);
    return this.user.choice;
  };

  getComPick = (choice) => {
    this.com.choice = choice;
    this.comHasPick = true;
    console.log("Com pick: ", this.com.choice);
    return this.com.choice;
  };

  listener = () => {
    this.user.batu[0].addEventListener("click", () => {
      this.result[0] = this.getUserPick("batu");
      this.decideResult();
    });

    this.user.kertas[0].addEventListener("click", () => {
      this.result[0] = this.getUserPick("kertas");
      this.decideResult();
    });

    this.user.gunting[0].addEventListener("click", () => {
      this.result[0] = this.getUserPick("gunting");
      this.decideResult();
    });

    if (this.playerHasPick) {
      this.com.batu[1].addEventListener("click", () => {
        this.result[1] = this.getComPick("batu");
        this.decideResult();
      });
      this.com.kertas[1].addEventListener("click", () => {
        this.result[1] = this.getComPick("kertas");
        this.decideResult();
      });
      this.com.gunting[1].addEventListener("click", () => {
        this.result[1] = this.getComPick("gunting");
        this.decideResult();
      });
    }
  };

  decideResult() {
    console.log("Current result: ", this.result);
    switch (this.user.choice) {
      case "batu":
        this.winResult();
        this.user.batu[0].classList.add("active_choice");
        this.user.kertas[0].classList.remove("active_choice");
        this.user.gunting[0].classList.remove("active_choice");
        break;
      case "kertas":
        this.loseResult();
        this.user.batu[0].classList.remove("active_choice");
        this.user.kertas[0].classList.add("active_choice");
        this.user.gunting[0].classList.remove("active_choice");
        break;
      case "gunting":
        this.drawResult();
        this.user.batu[0].classList.remove("active_choice");
        this.user.kertas[0].classList.remove("active_choice");
        this.user.gunting[0].classList.add("active_choice");
        break;
      default:
        this.defaultResult();
        break;
    }
  }

  play() {
    console.log("Lets play!");
    this.listener();
  }
}

const gas = new Game();
gas.play();

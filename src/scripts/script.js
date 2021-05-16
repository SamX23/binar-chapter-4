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
    console.log("Human loaded");
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
    console.log("Com loaded");
  }
}

class Rules {
  constructor() {
    this.resultText = document.createElement("H1");
    this.resultContainer = document.getElementById("vs_result");
  }

  defaultState = () => {
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
    this.listener();
  }

  reset() {
    this.resetResult.addEventListener("click", () => {
      this.defaultState();
      this.result = [];
      console.log("reset");
    });
  }

  listener() {
    this.reset();

    const getUserPick = (choice) => {
      this.user.choice = choice;
      console.log(this.user.choice);
      return this.user.choice;
    };

    const getComPick = (choice) => {
      this.com.choice = choice;
      console.log(this.com.choice);
      return this.com.choice;
    };

    // User listener section
    this.user.batu[0].addEventListener("click", () => {
      // this.user.batu[0].classList.add("active_choice");
      this.result[0] = getUserPick("batu");
      this.decision();
    });

    this.user.kertas[0].addEventListener("click", () => {
      this.result[0] = getUserPick("kertas");
      this.decision();
    });

    this.user.gunting[0].addEventListener("click", () => {
      this.result[0] = getUserPick("gunting");
      this.decision();
    });

    // Com listener section
    this.com.batu[1].addEventListener("click", () => {
      this.result[1] = getComPick("batu");
      this.decision();
    });
    this.com.kertas[1].addEventListener("click", () => {
      this.result[1] = getComPick("kertas");
      this.decision();
    });
    this.com.gunting[1].addEventListener("click", () => {
      this.result[1] = getComPick("gunting");
      this.decision();
    });
  }

  play() {
    console.log("Lets play!");
    this.decision();
  }

  decision() {
    console.log("Current result: ", this.result);
    switch (this.user.choice) {
      case "batu":
        this.winResult();
        break;
      case "kertas":
        this.loseResult();
        break;
      case "gunting":
        this.drawResult();
        break;
      default:
        this.defaultState();
        break;
    }

    // if (this.result.length <= 2) {
    //   this.listener();
    // switch (this.user.choice) {
    //   case "batu":
    //     this.winResult();
    //     break;
    //   case "kertas":
    //     this.loseResult();
    //     break;
    //   case "gunting":
    //     this.drawResult();
    //     break;
    //   default:
    //     this.defaultState();
    //     break;
    // }
    // }
  }
}

const gas = new Game();
gas.play();

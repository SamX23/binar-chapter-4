class Player {
  constructor() {
    this.choice = "none";
    this.batu = document.getElementById("batu-player");
    this.kertas = document.getElementById("kertas-player");
    this.gunting = document.getElementById("gunting-player");
    this._initiation();
  }

  _initiation() {
    this.batu.addEventListener("click", () => {
      this.choice = "batu";
      console.log(this.choice);
    });
    this.kertas.addEventListener("click", () => {
      this.choice = "kertas";
      console.log(this.choice);
    });
    this.gunting.addEventListener("click", () => {
      this.choice = "gunting";
      console.log(this.choice);
    });
  }
}

class Bot {
  constructor() {
    this.choice = "none";
    this.batu = document.getElementById("batu-com");
    this.kertas = document.getElementById("kertas-com");
    this.gunting = document.getElementById("gunting-com");
    this._initiation();
  }

  _initiation() {
    this.batu.addEventListener("click", () => {
      this.choice = "batu";
      console.log(this.choice);
    });
    this.kertas.addEventListener("click", () => {
      this.choice = "kertas";
      console.log(this.choice);
    });
    this.gunting.addEventListener("click", () => {
      this.choice = "gunting";
      console.log(this.choice);
    });
  }
}

class Game {
  constructor() {
    this.result = [];
    this.resultText = document.createElement("H1");
    this.resultContainer = document.getElementById("vs_result");
    this.resetResult = document.getElementById("reset");
    this._initiation();
  }

  _initiation() {
    this.resetResult.addEventListener("click", () => {
      console.log("reset");
      this._defaultResult();
    });
  }

  _defaultResult = () => {
    this.resultText.innerHTML = "VS";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.remove("versus_result");
    this.resultContainer.classList.remove("draw");
  };
  _winResult = () => {
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.remove("draw");
  };
  _loseResult = () => {
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.remove("draw");
  };
  _drawResult = () => {
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.add("draw");
  };

  play() {
    const user = new Player();
    const bot = new Bot();

    switch (user.choice) {
      case "batu":
        this._winResult();

      case "kertas":
        this._loseResult();

      case "gunting":
        this._drawResult();

      default:
        this._defaultResult();
        break;
    }

    console.log("Script jalan");
  }
}

const go = new Game();
go.play();

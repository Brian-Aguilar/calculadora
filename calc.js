const Calculadora = (function () {
  const Constructor = function (props) {
    this.number = "0";
    this.oldNumber = "0";
    this.textOperationH = "0";
    this.operation = null;
    this.textNumber = props.textNumber;
    this.textOperation = props.textOperation;
    this.historyContent = props.historyContent;
  };

  Constructor.prototype.getNumber = function () {
    return this.number;
  };
  Constructor.prototype.render = function () {
    this.textNumber.innerText = this.number;
    this.textOperation.innerText = this.textOperationH;
  };

  Constructor.prototype.setNumbers = function (n) {
    if (isNaN(Number(n))) {
      if (n === "limpiar") this.clearNumber();
      if (n === "resultado") this.operationEjec();
      if (n === "punto") this.addDot();
      if (n === "cambiar") this.changeSign();
      if (n === "porcentaje") this.percent();
      if (n === "sumar") this.assingOperation(n, "+");
      if (n === "restar") this.assingOperation(n, "-");
      if (n === "multiplicar") this.assingOperation(n, "x");
      if (n === "dividir") this.assingOperation(n, "/");
      return;
    } else {
      if (this.number === "0") {
        this.number = n;
      } else {
        this.number += n;
      }
      this.render();
    }
  };

  Constructor.prototype.clearNumber = function () {
    this.number = "0";
    this.oldNumber = "0";
    this.operation = null;
    this.textOperationH = "0";
    this.render();
  };
  Constructor.prototype.addDot = function () {
    if (!this.number.includes(".")) {
      this.number = `${this.number}.`;
      this.render();
    }
  };
  Constructor.prototype.changeSign = function () {
    this.number = `${this.number * -1}`;
    this.render();
  };
  Constructor.prototype.percent = function () {
    this.number = `${this.number * 0.01}`;
    this.render();
  };
  Constructor.prototype.selectOperation = function () {
    if (this.operation === "sumar") {
      return this.sumar();
    }
    if (this.operation === "restar") {
      return this.restar();
    }
    if (this.operation === "multiplicar") {
      return this.multiplicar();
    }
    if (this.operation === "dividir") {
      return this.dividir();
    }
  };
  Constructor.prototype.sumar = function () {
    return `${Number(this.oldNumber) + Number(this.number)}`;
  };
  Constructor.prototype.restar = function () {
    return `${Number(this.oldNumber) - Number(this.number)}`;
  };
  Constructor.prototype.multiplicar = function () {
    return `${Number(this.oldNumber) * Number(this.number)}`;
  };
  Constructor.prototype.dividir = function () {
    return `${Number(this.oldNumber) / Number(this.number)}`;
  };

  Constructor.prototype.assingOperation = function (operation, sign) {
    if (Number(this.number) === 0 && this.operation !== null) {
      console.log(this.textOperationH.trim().length);
      this.textOperationH = `${this.textOperationH
        .trim()
        .slice(0, this.textOperationH.trim().length - 1)}${sign} `;
      this.render();
      this.operation = this.operation !== operation && operation;
      return;
    }
    if (Number(this.number) === 0) return;
    if (this.operation !== null) return;
    if (Number(this.oldNumber) === 0) {
      this.textOperationH = `${this.number} ${sign} `;
      this.oldNumber = this.number;
      this.operation = operation;
      this.number = "0";
    } else {
      this.textOperationH = `${this.number} ${sign} `;
      this.oldNumber = this.number;
      this.operation = operation;
      this.number = "0";
    }
    this.render();
  };
  Constructor.prototype.operationEjec = function () {
    if (Number(this.number) === 0 || Number(this.oldNumber) === 0) return;
    if (this.operation === null) return;
    this.textOperationH += this.number;
    this.number = this.selectOperation();
    this.setLocalStorage();
    this.operation = null;
    this.render();
    this.renderLS();
  };
  Constructor.prototype.deleteLastText = function () {
    if (Number(this.number) === 0) return;
    this.number =
      this.number.length === 1
        ? "0"
        : `${this.number.slice(0, this.number.length - 1)}`;
    this.render();
  };

  Constructor.prototype.getLocalStorage = function () {
    return localStorage.getItem("history") === null
      ? []
      : JSON.parse(localStorage.getItem("history"));
  };
  Constructor.prototype.deleteLocalStorage = function () {
    localStorage.removeItem("history");
    this.renderLS();
  };
  Constructor.prototype.setLocalStorage = function () {
    const historial = this.getLocalStorage();
    const h = {
      id: historial.length + 1,
      title: this.textOperationH,
      value: this.number,
    };
    historial.push(h);
    localStorage.setItem("history", JSON.stringify(historial));
  };
  Constructor.prototype.renderLS = function () {
    const historial = this.getLocalStorage();
    let elements = "";
    if (historial.length != 0) {
      elements = historial
        .sort((a, b) => {
          if (a.id < b.id) return 1;
          if (b.id < a.id) return -1;
          return 1;
        })
        .map(
          (el) => `<li>
        <span>${el.title}</span>
        <span>= ${el.value}</span>
      </li>`
        )
        .join("");
    } else {
      elements = `<li class="center">No hay datos</li>`;
    }
    this.historyContent.innerHTML = elements;
  };

  return Constructor;
})();

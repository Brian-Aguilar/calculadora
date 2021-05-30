const body = document.getElementById("body");
const historyContent = document.getElementById("history-content");
const numerics = document.querySelectorAll(".n");
const textNumber = document.getElementById("text-number");
const textOperation = document.getElementById("text-operations");
const historyMain = document.getElementById("history-main");
const textDelete = document.getElementById("text-delete");
const mode = document.getElementById("mode");
const history = document.getElementById("history");
const closeHistory = document.getElementById("close-history");
const deleteHistory = document.getElementById("delete-history");

// document.addEventListener("DOMContentLoaded", () => {});

const calculadora = new Calculadora({
  textNumber: textNumber,
  textOperation: textOperation,
  historyContent: historyMain,
});

calculadora.render();
calculadora.renderLS();

if (numerics) {
  numerics.forEach((d) => {
    d.addEventListener("click", () => {
      calculadora.setNumbers(d.dataset.value);
    });
  });
}

textDelete.addEventListener("click", () => {
  calculadora.deleteLastText();
});
mode.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
  } else {
    body.classList.add("light");
    body.classList.remove("dark");
  }
});
history.addEventListener("click", () => {
  historyContent.classList.toggle("active");
});
closeHistory.addEventListener("click", () => {
  historyContent.classList.toggle("active");
});
deleteHistory.addEventListener("click", () => {
  calculadora.deleteLocalStorage();
});

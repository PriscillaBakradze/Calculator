"use strict";

const displayOne = document.querySelector(".display-one");
const displayTwo = document.querySelector(".display-two");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clear = document.querySelector(".clear");

let disOneNum = "";
let disTwoNum = "";
let display = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        disTwoNum += e.target.innerText;
        displayTwo.innerText = disTwoNum;
    });
});

operations.forEach(operation => {
    operation.addEventListener("click", (e) => {
        if (!disTwoNum) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (disOneNum && disTwoNum && lastOperation) {
            mathOperation();
        } else {
            display = parseFloat(disTwoNum);
        }
        clean(operationName);
        lastOperation = operationName;
    });
});

function clean(name = "") {
    disOneNum += disTwoNum + " " + name + " ";
    displayOne.innerText = disOneNum;
    displayTwo.innerText = "";
    disTwoNum = "";
};

function mathOperation() {
    if (lastOperation === "x") {
        display = parseFloat(display) * parseFloat(disTwoNum); 
    } else if (lastOperation === "/") {
        display = parseFloat(display) / parseFloat(disTwoNum);
    } else if (lastOperation === "+") {
        display = parseFloat(display) + parseFloat(disTwoNum);
    } else if (lastOperation === "-") {
        display = parseFloat(display) - parseFloat(disTwoNum);
    } else if (lastOperation === "%") {
        display = parseFloat(display) % parseFloat(disTwoNum);
    }
};

equal.addEventListener("click", (e) => {
    if (!disOneNum || !disTwoNum) return;
    haveDot = false;
    mathOperation();
    clean();
    displayTwo.innerText = display;
    disTwoNum = display;
    disOneNum = "";

});

clearAll.addEventListener("click", (e) => {
    displayOne.innerHTML = "0";
    displayTwo.innerHTML = "0";
    disOneNum = "";
    disTwoNum = "";
    display = "";
});

clear.addEventListener("click", () => {
    displayTwo.innerHTML = "";
    disTwoNum = "";
});
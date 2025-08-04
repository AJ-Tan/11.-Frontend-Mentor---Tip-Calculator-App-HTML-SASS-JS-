export class Calculator {
  #billAmount = 0;
  #tipAmount = 0.05;
  #numberOfPeople = 0;

  initializeEvents() {
    this.initializeBillAmount();
    this.initializeNumberOfPeople();
    this.initializeTip();
    this.initializeReset();
  }

  calculate() {
    this.isResetActive();

    const outputTip = document.getElementById("result-tip");
    const outputTotal = document.getElementById("result-total");

    if (this.#billAmount < 0 || this.#tipAmount < 0 || this.#numberOfPeople < 1) {
      outputTip.textContent = `$0.00`;
      outputTotal.textContent = `$0.00`;
      return false;
    }

    const calcTipAmount = this.#billAmount * this.#tipAmount;
    const calcTipPerson = calcTipAmount / this.#numberOfPeople;
    const calcTotal = (this.#billAmount + calcTipAmount) / this.#numberOfPeople;

    outputTip.textContent = `$${calcTipPerson.toFixed(2)}`;
    outputTotal.textContent = `$${calcTotal.toFixed(2)}`;
  }

  initializeBillAmount() {
    const billAmount = document.getElementById("bill__amount-input");
    billAmount.addEventListener("input", (e) => {
      const billValue = Number(e.currentTarget.value) || 0;
      this.#billAmount = billValue;

      this.calculate();
    });
  }

  initializeNumberOfPeople() {
    const numberOfPeople = document.getElementById("bill__people-input");
    numberOfPeople.addEventListener("input", (e) => {
      const numPeopleValue = Number(e.currentTarget.value) || 0;
      this.#numberOfPeople = numPeopleValue;

      this.calculate();
    });
  }

  initializeTip() {
    const tipFieldSet = document.querySelector(".tip-list");
    const tipFieldCustom = document.getElementById("tip-list__custom");

    const tipElements = Array.from(
      tipFieldSet.querySelectorAll(".tip-list__option")
    );
    tipElements.push(tipFieldCustom);
    for (const tipElement of tipElements) {
      this.selectTipEvents("click", tipElement, tipElements);
    }
    this.selectTipEvents("input", tipFieldCustom);
  }

  selectTipEvents(triggerEvent, nodeElement, tipElements = null) {
    const tipClickFunction = (e) => {
      if (tipElements) {
        for (const tipElement of tipElements) {
          tipElement.setAttribute("aria-pressed", "false");
        }
      }

      if (triggerEvent === "input") {
        e.currentTarget.dataset["value"] = Number(e.currentTarget.value) / 100;
      }

      const tipAmount = Number(e.currentTarget.dataset["value"]) || 0;
      this.#tipAmount = tipAmount;
      e.currentTarget.setAttribute("aria-pressed", "true");
      this.calculate();
    };

    nodeElement.addEventListener(triggerEvent, tipClickFunction);
  }

  initializeReset() {
    const resetButton = document.getElementById("result-reset");

    resetButton.addEventListener("click", (e) => {
      const currentElement = e.currentTarget;

      if (currentElement.classList.contains("active")) {
        this.resetBill();
        this.resetTip();
        this.resetNumberOfPeople();

        this.calculate();
        this.isResetActive();
      }
    });
  }

  resetBill() {
    const billAmount = document.getElementById("bill__amount-input");
    billAmount.value = "";
    this.#billAmount = 0;
  }

  resetTip() {
    const tipFieldSet = document.querySelector(".tip-list");
    const tipFieldCustom = document.getElementById("tip-list__custom");
    const tipElements = Array.from(
      tipFieldSet.querySelectorAll(".tip-list__option")
    );
    tipElements.push(tipFieldCustom);

    for (const tipElement of tipElements) {
      tipElement.setAttribute("aria-pressed", "false");
    }
    tipElements[0].setAttribute("aria-pressed", "true");
    tipFieldCustom.value = "";
    tipFieldCustom.dataset["value"] = 0;
    this.#tipAmount = 0.05;
  }

  resetNumberOfPeople() {
    const numberOfPeople = document.getElementById("bill__people-input");
    numberOfPeople.value = "";
    this.#numberOfPeople = 0;
  }

  isResetActive() {
    const resetButton = document.getElementById("result-reset");

    if (
      !(this.#billAmount === 0) ||
      !(this.#tipAmount === 0.05) ||
      !(this.#numberOfPeople === 0)
    ) {
      resetButton.classList.remove("muted");
      resetButton.classList.add("active");
    } else {
      resetButton.classList.remove("active");
      resetButton.classList.add("muted");
    }
  }
}

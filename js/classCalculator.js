export class Calculator {
   #billAmount = 0;
   #tipAmount = 0.05;
   #numberOfPeople = 1;

   initializeEvents() {
      this.initializeBillAmount();
      this.initializeNumberOfPeople();
      this.initializeTip();
      this.initializeReset();
   }

   calculate() {
      const outputTip = document.getElementById('result-tip');
      const outputTotal = document.getElementById('result-total');

      if (!this.#billAmount || !this.#tipAmount || !this.#numberOfPeople) {
         outputTip.textContent = `$0.00`;
         outputTotal.textContent = `$0.00`;
         return false;
      }

      const calcTipAmount = this.#billAmount * this.#tipAmount;
      const calcTipPerson = calcTipAmount / this.#numberOfPeople;
      const calcTotal = (this.#billAmount + calcTipAmount) / this.#numberOfPeople;

      outputTip.textContent = `$${calcTipPerson.toFixed(2)}`;
      outputTotal.textContent = `$${calcTotal.toFixed(2)}`;;
   }

   initializeBillAmount() {
      const billAmount = document.getElementById('bill__amount-input');
      billAmount.addEventListener("input", (e) => {
         const inputValue = Number(e.currentTarget.value) || 0;
         if(inputValue) {
            this.isResetActive(true);
         } else {
            this.isResetActive(false);
         }
         this.#billAmount = inputValue;
         this.calculate();
      })
   }

   initializeNumberOfPeople() {
      const numberOfPeople = document.getElementById('bill__people-input');
      numberOfPeople.addEventListener("input", (e) => {
         this.#numberOfPeople = Number(e.currentTarget.value) || 0;
         this.calculate();
      })
   }

   initializeTip() {
      const tipFieldSet = document.querySelector(".tip-list");
      const tipFieldCustom = document.getElementById('tip-list__custom');

      const tipElements = Array.from(tipFieldSet.querySelectorAll(".tip-list__option"));
      tipElements.push(tipFieldCustom);
      for(const tipElement of tipElements) {
         this.selectTipClick("click", tipElement, tipElements);
      }
      this.selectTipClick("input",tipFieldCustom)
   }

   selectTipClick(triggerEvent, nodeElement, tipElements = null) {
      const tipClickFunction = (e) => {
         if(tipElements) {
            for(const tipElement of tipElements) {
               tipElement.setAttribute('aria-pressed', 'false');
            }
         }

         if(triggerEvent === "input") {
            e.currentTarget.dataset['value'] = Number(e.currentTarget.value) / 100;
         }

         this.#tipAmount = Number(e.currentTarget.dataset['value']);
         e.currentTarget.setAttribute('aria-pressed', 'true');
         this.calculate();
      };

      nodeElement.addEventListener(triggerEvent, tipClickFunction);
   }

   isResetActive(isActive = true) {
      const resetButton = document.getElementById('result-reset');

      if(isActive) {
         resetButton.classList.remove('muted');
         resetButton.classList.add('active');
      } else {
         resetButton.classList.remove('active');
         resetButton.classList.add('muted');
      }
   }

   initializeReset() {
      const resetButton = document.getElementById('result-reset');

      const billAmount = document.getElementById('bill__amount-input');

      const tipFieldSet = document.querySelector(".tip-list");
      const tipFieldCustom = document.getElementById('tip-list__custom');
      const tipElements = Array.from(tipFieldSet.querySelectorAll(".tip-list__option"));
      tipElements.push(tipFieldCustom);

      const numberOfPeople = document.getElementById('bill__people-input');

      resetButton.addEventListener("click", (e) => {
         const currentElement = e.currentTarget;

         if(currentElement.classList.contains('active')) {
            billAmount.value = "";
            this.#billAmount = 0;

            for(const tipElement of tipElements) {
               tipElement.setAttribute('aria-pressed', 'false');
            }
            tipElements[0].setAttribute('aria-pressed','true');
            tipFieldCustom.value = "";
            tipFieldCustom.dataset['value'] = 0;
            this.#tipAmount = 0.05;

            numberOfPeople.value = "1";
            this.#numberOfPeople = 1;

            this.calculate();
            this.isResetActive(false);
         }
      });
   }
}
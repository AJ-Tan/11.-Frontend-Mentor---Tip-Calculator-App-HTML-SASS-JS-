# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-  [Overview](#overview)
   -  [The challenge](#the-challenge)
   -  [Screenshot](#screenshot)
   -  [Links](#links)
-  [My process](#my-process)
   -  [Built with](#built-with)
   -  [What I learned](#what-i-learned)
-  [Author](#author)

## Overview

### The challenge

Users should be able to:

-  View the optimal layout for the app depending on their device's screen size
-  See hover states for all interactive elements on the page
-  Calculate the correct tip and total cost of the bill per person

### Screenshot

![Desktop](<screenshot/Desktop - Tip Calculator.png>)
![Desktop Input](<screenshot/Desktop (Input) - Tip Calculator.png>)
![Desktop Error](<screenshot/Desktop (Error) - Tip Calculator.png>)
![Tablet](<screenshot/Tablet - Tip Calculator.png>)
![Mobile](<screenshot/Mobile - Tip Calculator.png>)

### Links

-  Solution URL: [GitHub Repository](https://github.com/AJ-Tan/11.-Frontend-Mentor---Tip-Calculator-App-HTML-SASS-JS-)
-  Live Site URL: [GitHub Pages](https://aj-tan.github.io/11.-Frontend-Mentor---Tip-Calculator-App-HTML-SASS-JS-/)

## My process

### Built with

-  Semantic HTML5 markup
-  CSS custom properties
-  Flexbox
-  CSS Grid
-  Mobile-first workflow
-  Javascript

### What I learned

1. Array.from to convert node list into array.

```js
const tipElements = Array.from(
   tipFieldSet.querySelectorAll(".tip-list__option")
);
```

2. Adding the icon in the input. Since input is a void element and I cant use ::before. We have to wrap the input in a wrapper.

```html
<div class="bill__amount-wrapper input__wrapper">
   <input
      type="number"
      step="any"
      min="0"
      class="input__number"
      name="bill__amount-input"
      id="bill__amount-input"
   />
</div>
```

## Author

-  GitHub - [AJ-Tan](https://github.com/AJ-Tan)
-  Frontend Mentor - [@AJ-Tan](https://www.frontendmentor.io/profile/AJ-Tan)

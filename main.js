// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

//This function makes a copy of an array and verifies if the numbers in it corresponds to a valid credit card number
const validateCred = (array) => {
  let newArray = [...array]; //Makes the copy
  newArray.reverse();
  const droppedEl = newArray[0]; //Stores the last digit (now first) to be summed at the end
  newArray.shift();

  //Multiply every second digit (0, 2, 4...) per 2
  for (let i = 0; i < newArray.length; i += 2) {
    newArray[i] *= 2;
  }
  //If the resulted number from multiplication is > than 9, it subtracts 9
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] > 9) {
      newArray[i] -= 9;
    }
  }
  //Makes the sum of the not multiplied numbers, the multiplied numbers and the last digit
  const sum =
    newArray.reduce((acc, curr) => {
      return acc + curr;
    }) + droppedEl;

  //Checks if the sum divided by 10 is an integer. If so, it is a valid credit card number
  if (sum % 10 === 0) {
    //console.log("The credit card is valid!");
    return true;
  } else {
    //console.log("The credit card is not valid!");
    return false;
  }
};

let invalidCards = [];

//This function checks if nested arrays contain valid/invalid credit card numbers and return a new array with invalid ones only
const findInvalidCards = (nested) => {
  for (let i = 0; i < nested.length; i++) {
    if (!validateCred(nested[i])) {
      invalidCards.push(nested[i]);
    }
  }
  console.log(invalidCards);
  return invalidCards;
};

//This function calls the previous one and then creates and returns a new array with the names (not repeated) of the companies that issued the invalid credit cards
const idInvalidCardCompanies = (invalid) => {
  findInvalidCards(batch);
  let companies = [];

  for (let i = 0; i < invalid.length; i++) {
    switch (invalid[i][0]) {
      case 3:
        if (companies.indexOf("Amex") === -1) {
          companies.push("Amex");
        }
        break;
      case 4:
        if (companies.indexOf("Visa") === -1) {
          companies.push("Visa");
        }
        break;
      case 5:
        if (companies.indexOf("Mastercard") === -1) {
          companies.push("Mastercard");
        }
        break;
      case 6:
        if (companies.indexOf("Discover") === -1) {
          companies.push("Discover");
        }
        break;
      default:
        console.log("Company not found");
        break;
    }
  }
  console.log(companies);
  return companies;
};

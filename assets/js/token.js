let letter = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  
  let number = ["1","2","3","4","5","6","7","8","9","0","@","?","%","*","$"]
  let Word = "";
  let random2 = 0;
  let random = 0;

  function Token() {
    Word = ""
      for (let i = 0; i < 5; i++) {
          random = Math.floor(Math.random() * letter.length)
          random2 = Math.floor(Math.random() * number.length)
          Word = Word + letter[random] + number[random2]
      }
      return Word
  }

  module.exports = Token



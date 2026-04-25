function judgeCircle(moves) {
  let x = 0;
  let y = 0;

  for (const move of moves) {
    switch (move) {
      case 'U': y++; break;
      case 'D': y--; break;
      case 'L': x--; break;
      case 'R': x++; break;
    }
  }

  return x === 0 && y === 0;
}

console.log(judgeCircle("LR") === true);
console.log(judgeCircle("URURD") === false);
console.log(judgeCircle("RUULLDRD") === true);
console.log(judgeCircle("LLLL") === false);
console.log(judgeCircle("LLLLRRRR") === true);

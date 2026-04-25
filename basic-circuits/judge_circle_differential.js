/**
 * Differential Drive Model:
 * Robot has a position (x, y) and an orientation (dir).
 * Orientation 0: North, 1: East, 2: South, 3: West
 * L: Rotate 90 deg counter-clockwise (dir = (dir - 1 + 4) % 4)
 * R: Rotate 90 deg clockwise (dir = (dir + 1) % 4)
 * U/D: Move forward (or backward) based on orientation
 */
function judgeCircleDifferential(moves) {
  let x = 0, y = 0;
  let dir = 0; // 0: N, 1: E, 2: S, 3: W

  for (const move of moves) {
    if (move === 'L') {
      dir = (dir + 3) % 4;
    } else if (move === 'R') {
      dir = (dir + 1) % 4;
    } else if (move === 'U') {
      // Move Forward
      if (dir === 0) y++;
      else if (dir === 1) x++;
      else if (dir === 2) y--;
      else if (dir === 3) x--;
    } else if (move === 'D') {
      // Move Backward (or rotate 180 depending on definition)
      if (dir === 0) y--;
      else if (dir === 1) x--;
      else if (dir === 2) y++;
      else if (dir === 3) x++;
    }
  }

  return x === 0 && y === 0;
}

// Test a square: Turn left, move, turn left, move...
// For this model, L usually means rotate, U means move forward.
console.log(judgeCircleDifferential("ULULULUL") === true); // Square path
console.log(judgeCircleDifferential("LLLL") === true);     // Just rotates back to start orientation

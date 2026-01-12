# All Game Code Snippets for MakeCode

Use these code snippets to create blocks in MakeCode and capture GIFs/screenshots.

## Game 1: Blinking Heart
**Status:** ✅ Video already added

```javascript
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
})
```

---

## Game 2: Coin Flipper
**File needed:** `coin-flipper.gif` or `coin-flipper.gif`

```javascript
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(200)
    if (Math.randomBoolean()) {
        basic.showString("H")
    } else {
        basic.showString("T")
    }
})
```

---

## Game 3: Magic 8 Ball
**File needed:** `magic-8-ball.gif` or `magic-8-ball.gif`

```javascript
input.onGesture(Gesture.Shake, function () {
    let choice = randint(1, 6)
    if (choice == 1) {
        basic.showString("Yes")
    } else if (choice == 2) {
        basic.showString("No")
    } else if (choice == 3) {
        basic.showString("Maybe")
    } else if (choice == 4) {
        basic.showString("Ask again")
    } else if (choice == 5) {
        basic.showString("Definitely")
    } else {
        basic.showString("Unlikely")
    }
})
```

---

## Game 4: Clap the Loudest
**File needed:** `clap-loudest.gif` or `clap-loudest.gif`

```javascript
input.onButtonPressed(Button.A, function () {
    basic.showString("GO!")
    basic.pause(500)
    let maxSound = 0

    for (let i = 0; i < 100; i++) {
        let soundLevel = input.soundLevel()
        if (soundLevel > maxSound) {
            maxSound = soundLevel
        }
        basic.pause(10)
    }

    basic.showNumber(maxSound)
})
```

---

## Game 5: Steady Hand Challenge
**File needed:** `steady-hand.gif` or `steady-hand.gif`

```javascript
basic.forever(function () {
    let tilt = input.acceleration(Dimension.X)

    if (tilt > 200 || tilt < -200) {
        music.playTone(262, 100)
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(100)
})
```

---

## Game 6: Design Your Board Game (Dice Roller)
**File needed:** `dice-roller.gif` or `dice-roller.gif`

```javascript
input.onButtonPressed(Button.A, function () {
    let roll = randint(1, 6)
    basic.showNumber(roll)
    basic.pause(2000)
    basic.clearScreen()
})
```

---

## Instructions:

1. For each game, copy the code above
2. Go to https://makecode.microbit.org/
3. Paste the code in the JavaScript editor
4. Switch to Blocks view
5. Take a screenshot or record a GIF of the blocks
6. Save as the filename mentioned above in the `assets/` folder
7. I'll update the presentation to use your media files

## Recommended Naming:
- Use lowercase with hyphens
- Use `.gif` format for all block animations
- Save files in the `assets/` folder

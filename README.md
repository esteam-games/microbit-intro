# micro:bit Introduction Presentation

An interactive Reveal.js-based presentation to introduce micro:bit to kids aged 8-12.

## 🌐 View Online

- **Meet the micro:bit!**: [https://esteam-games.github.io/do-n-learn/](https://esteam-games.github.io/do-n-learn/)
- **Basic Circuits**: [https://esteam-games.github.io/do-n-learn/basic-circuits/](https://esteam-games.github.io/do-n-learn/basic-circuits/)
- **Pixel Art Animations (Session 2)**: [https://esteam-games.github.io/do-n-learn/session-2/](https://esteam-games.github.io/do-n-learn/session-2/)

## 📚 Content Overview

The presentation includes:
- Introduction to micro:bit
- Exploring micro:bit parts and features
- 6 hands-on game projects:
  1. Blinking Heart - LED animations
  2. Digital Dice - Shake sensor
  3. Mind Reader - Binary search game
  4. Steady Hand Challenge - Tilt sensor
  5. Reaction Time Tester - Timing and speed
  6. Design Your Board Game - Creative project
- Pseudocode and JavaScript code examples
- Summary of concepts learned

## 🚀 GitHub Pages Setup

### Initial Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click Save

2. **Wait for deployment**:
   - GitHub will automatically build and deploy
   - Check the Actions tab for deployment status
   - Once complete, visit: `https://esteam-games.github.io/do-n-learn/`

### Making Updates

After making changes to the presentation:
```bash
git add .
git commit -m "Update presentation"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes within a few minutes.

## 💻 Local Development

### View Locally

Option 1 - Python:
```bash
python3 -m http.server 8000
```

Option 2 - Node.js:
```bash
npx http-server
```

Option 3 - VS Code:
- Install "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

Then open http://localhost:8000 in your browser.

### Keyboard Controls

- **→ / ←** : Navigate between main slides (horizontal)
- **↓ / ↑** : Navigate nested slides (vertical)
- **Space** : Next slide
- **ESC / O** : Overview mode
- **F** : Full screen

## 📁 File Structure

```
.
├── index.html           # Main presentation file
├── microbit-front.png   # Front side diagram
├── microbit-back.png    # Back side diagram
└── README.md           # This file
```

## ✏️ Customization

Edit `index.html` to modify:
- Slide content (inside `<section>` tags)
- Styles (in the `<style>` section)
- Reveal.js settings (in the `Reveal.initialize()` call)

## 🎨 Theme

Currently using the "sky" theme. Other available themes:
- black, white, league, beige, night, serif, simple, solarized, moon

Change the theme by modifying this line in `index.html`:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/theme/sky.css">
```

## 📖 Resources

- [Reveal.js Documentation](https://revealjs.com/)
- [micro:bit Official Site](https://microbit.org/)
- [MakeCode Editor](https://makecode.microbit.org/)

## 📝 License


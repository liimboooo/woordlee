# 🟩 Woordle — Wordle Clone

A fully functional Wordle clone built with **React** and **Tailwind CSS** as part of the Frontend Intern Technical Challenge.

---

## 🛠️ Tech Stack

- **React** (Functional Components + Hooks)
- **Vite** (Development & Build Tool)
- **Tailwind CSS** (Utility-first styling)

---

## ✅ Core Features

- 5×6 game grid (maximum of 6 attempts)
- Accurate color evaluation logic:
  - 🟩 Green — Correct letter, correct position
  - 🟨 Yellow — Correct letter, wrong position
  - ⬜ Gray — Letter not in the word
- Correct handling of **duplicate letters**
- Physical keyboard input support
- Win / Game Over modal
- Fully responsive design (Desktop & Mobile)

---

## ⭐ Bonus Features

- Interactive on-screen keyboard with dynamic key color updates
- Smooth tile flip animations
- Game state persistence using `localStorage`

---

## 🧠 State Management

Game logic is managed using a custom React hook (`useGame.js`) which handles:

- Current guess state
- Guess history tracking
- Turn management (max 6 attempts)
- Game over detection
- Keyboard letter color states

The evaluation logic is implemented in a separate module to ensure clean separation of concerns and maintainable code structure.

---

## 📁 Project Structure


## 📁 Project Structure

```
woordle/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # Entry point
│   ├── index.css              # Tailwind imports + animations
│   ├── App.jsx                # Main app component
│   ├── words.js               # Word list + evaluation logic
│   ├── hooks/
│   │   └── useGame.js         # Game state management hook
│   └── components/
│       ├── Header.jsx         # App header
│       ├── Grid.jsx           # 5×6 game grid
│       ├── Tile.jsx           # Individual letter tile
│       ├── Keyboard.jsx       # On-screen keyboard
│       ├── Toast.jsx          # Toast notifications
│       └── GameOverModal.jsx  # Win/Loss modal
```

## 🎮 How to Play

1. Type a 5-letter word and press **Enter** to submit
2. Each tile will flip to reveal its color:
   - 🟩 **Green** — Correct letter, correct position
   - 🟨 **Yellow** — Correct letter, wrong position
   - ⬜ **Gray** — Letter not in the word
3. Use the feedback to guess the word in **6 tries or fewer**
4. You can also click the on-screen keyboard

u can see demo :
https://woordlee-k1o623fmu-liimboooos-projects.vercel.app/

---








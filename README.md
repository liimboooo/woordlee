# 🟩 Woordle — A Wordle Clone

A fully functional Wordle clone built with **React** and **Tailwind CSS**.

## 🛠️ Tech Stack

- **React 19** — Functional components with Hooks
- **Vite** — Fast development and build tooling
- **Tailwind CSS v4** — Utility-first styling

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/woordle.git
cd woordle

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

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

Built by **Mohammed Limami** for the Frontend Intern Technical Challenge.




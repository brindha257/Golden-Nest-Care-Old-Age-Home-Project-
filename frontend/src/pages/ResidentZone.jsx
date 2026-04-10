import { useState, useEffect } from "react";

function ResidentZone() {

  /* ================= DAILY QUOTE ================= */
  const quotes = [
    "Age is just a number.",
    "Every day is a blessing.",
    "Happiness grows when shared.",
    "Stay strong and positive.",
    "You inspire everyone around you."
  ];

  const [dailyQuote, setDailyQuote] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setDailyQuote(quotes[random]);
  }, []);

  /* ================= MEMORY CARD GAME ================= */
  const emojis = ["🍎","🍌","🍇","🍉","🍒","🥝"];
  const shuffledCards = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    }));

  const [cards, setCards] = useState(shuffledCards);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (card) => {
    if (card.flipped || card.matched || selected.length === 2) return;

    const updatedCards = cards.map(c =>
      c.id === card.id ? { ...c, flipped: true } : c
    );

    const newSelected = [...selected, card];
    setCards(updatedCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(prev => prev + 1);

      if (newSelected[0].emoji === newSelected[1].emoji) {
        setCards(prev =>
          prev.map(c =>
            c.emoji === newSelected[0].emoji
              ? { ...c, matched: true }
              : c
          )
        );
        setSelected([]);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === newSelected[0].id ||
              c.id === newSelected[1].id
                ? { ...c, flipped: false }
                : c
            )
          );
          setSelected([]);
        }, 800);
      }
    }
  };

  const resetGame = () => {
    setCards(
      [...emojis, ...emojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({
          id: index,
          emoji,
          flipped: false,
          matched: false
        }))
    );
    setSelected([]);
    setMoves(0);
  };

  /* ================= MATH GAME ================= */
  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { question: `${a} + ${b}`, answer: a + b };
  };

  const [mathQ, setMathQ] = useState(generateQuestion());
  const [mathScore, setMathScore] = useState(0);
  const [mathMessage, setMathMessage] = useState("");

  const handleMathClick = (num) => {
    if (num === mathQ.answer) {
      setMathScore(prev => prev + 5);
      setMathMessage("✅ Correct!");
    } else {
      setMathMessage("❌ Wrong!");
    }

    setTimeout(() => {
      setMathQ(generateQuestion());
      setMathMessage("");
    }, 800);
  };

  /* ================= DAILY ROUTINE ================= */
  const tasks = [
    "Morning Walk",
    "Medication Taken",
    "Exercise",
    "Talked to Family"
  ];

  const [completed, setCompleted] = useState([]);

  const toggleTask = (task) => {
    setCompleted(prev =>
      prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  const progress = (completed.length / tasks.length) * 100;

  /* ================= HOBBY ================= */
  const hobbies = [
    "Try gardening today 🌱",
    "Do 15 minutes of painting 🎨",
    "Read a short story 📖",
    "Light stretching 🧘",
    "Call a friend ☎️"
  ];

  const [hobbyTip, setHobbyTip] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-teal-200 p-8">

      <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">
        🌿 Resident Wellness Zone
      </h1>

      {/* DAILY QUOTE */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 text-center">
        <h2 className="text-xl font-bold mb-4">🌞 Daily Motivation</h2>
        <p className="italic">{dailyQuote}</p>
      </div>

      {/* MEMORY CARD GAME */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">🧩 Memory Match Game</h2>
        <p>Moves: {moves}</p>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="h-16 flex items-center justify-center bg-blue-500 text-white rounded cursor-pointer text-2xl hover:scale-105 transition"
            >
              {card.flipped || card.matched ? card.emoji : "?"}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
        >
          Restart Game
        </button>
      </div>

      {/* MATH GAME */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 text-center">
        <h2 className="text-xl font-bold mb-4">➕ Quick Math</h2>
        <p className="text-2xl mb-4">{mathQ.question}</p>
        <p>Score: {mathScore}</p>

        <div className="flex justify-center gap-4 mt-4">
          {[mathQ.answer, mathQ.answer + 1, mathQ.answer - 1]
            .sort(() => Math.random() - 0.5)
            .map((num, index) => (
              <button
                key={index}
                onClick={() => handleMathClick(num)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                {num}
              </button>
            ))}
        </div>

        {mathMessage && (
          <p className="mt-4 font-semibold">{mathMessage}</p>
        )}
      </div>

      {/* DAILY ROUTINE */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">📅 Daily Routine</h2>

        {tasks.map(task => (
          <div key={task}>
            <label>
              <input
                type="checkbox"
                checked={completed.includes(task)}
                onChange={() => toggleTask(task)}
              />{" "}
              {task}
            </label>
          </div>
        ))}

        <div className="mt-4 bg-gray-200 h-4 rounded">
          <div
            className="bg-green-500 h-4 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2">Progress: {progress}%</p>
      </div>

      {/* HOBBY */}
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">🎨 Hobby Suggestion</h2>
        <button
          onClick={() =>
            setHobbyTip(
              hobbies[Math.floor(Math.random() * hobbies.length)]
            )
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Get Idea
        </button>
        {hobbyTip && <p className="mt-3">{hobbyTip}</p>}
      </div>

    </div>
  );
}

export default ResidentZone;

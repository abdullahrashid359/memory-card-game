import { useEffect, useState } from 'react'
import './styles/App.css'
import Header from './components/Header';
import Card from './components/Card';

const ids = [106, 107, 149, 226, 313, 332, 346, 414, 620, 630, 659, 697];

function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startFetching() {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");

        if (!response.ok)
          throw new Error("Failed to load superheroes. Please try again.");

        const data = await response.json();
        const result = data.filter(element => ids.includes(element.id));
        setCards(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    startFetching();

  }, [])

  function handleCardClick(id) {
    if (!clickedIds.includes(id)) {
      setScore(prevScore => prevScore + 1);
      if(score + 1 === 12)
        setBestScore(12);
      setClickedIds(prevClickedIds => [...prevClickedIds, id]);
      shuffleArray();
    } else {
      setBestScore(Math.max(score, bestScore));
      setIsGameOver(true);
    }
  }

  function handlePlayAgainClick() {
    setIsGameOver(false);
    setClickedIds([]);
    setScore(0);
    shuffleArray();
  }

  function shuffleArray() {
    let remaining = cards.slice();
    let shuffled = [];

    while(remaining.length > 0) {
      let index = Math.floor(Math.random() * remaining.length);

      shuffled.push(remaining[index]);
      remaining.splice(index, 1);
    }

    setCards(shuffled);
  }

  if (loading)
    return <p className="status-message">Loading superheroes...</p>

  if (error)
    return <p className="status-message error-message">{error.message}</p>

  if (isGameOver) {
    return (
      <div className="game-over">
        <h2>Game Over!</h2>
        <p>Score: {score}</p>
        <button onClick={handlePlayAgainClick}>Play Again</button>
      </div>
    )
  }

  if(score === 12) { // Game won case
    return (
      <div className="game-won">
        <h2>You Won!</h2>
        <p>You remembered all 12 heroes. Such a genius.</p>
        <p>Final Score: {score}</p>
        <button onClick={handlePlayAgainClick}>Play Again</button>
      </div>
    )
  }

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <main className="card-container">
        {cards.map(card => <Card key={card.id} name={card.name} imgUrl={card.images["md"]} onClick={() => handleCardClick(card.id)} />)}
      </main>
    </>
  )
}

export default App

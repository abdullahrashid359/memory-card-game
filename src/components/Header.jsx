function Header({score, bestScore}) {
    return (
        <header className="app-header">
            <section className="header-main">
                <h1>Memory Game</h1>
                <p>Test your memory. Pick a hero, but never pick the same one twice!</p>
            </section>

            <section className="header-score">
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </section>
        </header>
    )
}

export default Header;
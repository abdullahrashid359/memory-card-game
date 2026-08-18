function Card({name, imgUrl, onClick}) {
    return (
        <button className="card" onClick={onClick}>
            <img src={imgUrl} alt={name}/>
            <span>{name}</span>
        </button>
    )
}

export default Card;
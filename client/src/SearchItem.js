export default function SearchItem(props) {
    return (
      <div className="search-item">
        <img src="https://picsum.photos/300/150" className="item-image" alt={props.name} />
        <a href={props.link}>
          <h4 className="item-title">{props.name}</h4>
        </a>
        <div className="item-rank">
          <label>Rank: </label>
          <p>#{props.rank}</p>
        </div>
      </div>
    );
  }

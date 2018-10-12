export default function SearchItem(props) {
  return (
    <div className="search-item" id={props.app._id}>
      <img src={"https://picsum.photos/300/150"} className="item-image" alt={props.app.name} />
      <a href={props.app.link}>
        <h5 className="item-title">{props.app.name}</h5>
      </a>
      <div className="item-rank">
        <label>Rank: #{props.app.rank}</label>
      </div>
      <i class="far fa-trash-alt" 
            onClick={props.handleDeleteClick}></i>
    </div>
  );
}

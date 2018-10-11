export default function FacetList(props) {
  if (!props.hits || !props.content.getFacetValues) return '';
  const facets = props.content.getFacetValues('category');
  return (
    <div>
      <ul>
        {
          facets.map((facet) => {
            return (
              <li>
                <input type="checkbox" id={`fl-${facet.name}`} 
                    value={facet.name} onChange={props.handleFacetClick} 
                    checked={facets.length < 2} />
                <label for={`fl-${facet.name}`}>{facet.name}</label>
              </li>
            );
          })
        } 
      </ul>
    </div>
  );
}

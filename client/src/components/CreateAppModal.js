export default function CreateAppModal(props) {
    return (
        <div className="modal create-app-modal hidden">
            <div className="modal-content">
                <span className="close" onClick={props.handleModalClose}>
                    &times;
                </span>

                <h2>Add A New App!</h2>
                <div className="input-row">
                    <input type="text" autocomplete="off" id="name" 
                            placeholder="Name" className="modal-input" />
                </div>    
                <div className="input-row">
                    <input type="text" autocomplete="off" id="image" 
                            placeholder="Image Link" className="modal-input" />
                </div>
                <div className="input-row">
                    <input type="text" autocomplete="off" id="link" 
                            placeholder="Link to App" className="modal-input" />
                </div>
                <div className="input-row">
                    <input type="text" autocomplete="off" id="category" 
                            placeholder="App Category" className="modal-input" />
                </div>
                <div className="input-row">
                    <input type="number" autocomplete="off" id="rank" 
                            placeholder="App Rank" className="modal-input" />
                </div>

                <button className="button add-app-button" onClick={props.handleCreateAppClick}>
                    CREATE!
                </button>
            </div>
        </div>
    );
}

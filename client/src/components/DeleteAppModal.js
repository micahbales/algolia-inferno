export default function DeleteAppModal(props) {
    return (
        <div className="modal delete-app-modal hidden">
            <div className="modal-content">
                <span className="close" onClick={props.handleModalClose}>
                    &times;
                </span>

                <h2>Are you sure you want to delete this app?</h2>
                <p>This action cannot be undone.</p>

                <button className="button delete-app-button" onClick={props.handleDeleteAppClick}>
                    DELETE
                </button>
            </div>
        </div>
    );
}

import React, { useContext } from 'react';
import noteContext from '../Context/noteContext';
const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card border-4 border-success shadow p-3 mb-5 bg-white rounded" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h4 className="card-title">{note.title}</h4>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-solid fa-pen-to-square mx-4" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}
export default Noteitem;
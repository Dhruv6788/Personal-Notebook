import React, { useContext, useState } from 'react'
import noteContext from '../Context/noteContext';

const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" });
    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    };
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <h2 className="mt-3">
                <strong>Add a Note</strong>
            </h2>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-light"
                            id="title"
                            name="title"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                        />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            className="form-control bg-transparent text-light"
                            id="description"
                            name="description"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Tags
                        </label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-light"
                            id="tag"
                            name="tag"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                        />

                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleOnClick}>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
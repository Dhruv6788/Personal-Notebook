import NoteContext from "./noteContext";
// import { useState } from "react";
import React from "react";
const NoteState = (props)=>{
    return (
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
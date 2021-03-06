import React from 'react';


function Search({ value, onChange, children, onSubmit }) {
    return (
        <form
            onSubmit={onSubmit}>

            <input type="text" value={value} onChange={onChange} />

            <button type="submit"> {children} </button>

        </form>
    )
}


export default Search;
import React, { useState } from 'react';

const ChangePasswordForm = ({ handleSubmit }) => {
    const [value,setValue] = useState(); 
    return (
        <form id="password">
            <label>Hasło</label>
            <input type="password" onChange={(e) => setValue(e.target.value)}/>
            <button type="button" onClick={e => handleSubmit(e, value)}>Zatwierdź</button>
        </form>
    )
}

export default ChangePasswordForm;
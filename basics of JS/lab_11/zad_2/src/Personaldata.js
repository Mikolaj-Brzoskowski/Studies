const Personaldata = ({data: {name, surname, age}}) => {
    
    return (
        <div>
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <p>Age: {age}</p>
        </div>
    )
}

export default Personaldata;
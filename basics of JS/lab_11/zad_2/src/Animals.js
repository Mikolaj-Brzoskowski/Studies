const Animals = (props) => {

    return (
        <p>
            {props.array.map(item => (
            <li key={item}>{item}</li>
            ))}
        </p>
    )
}

export default Animals;
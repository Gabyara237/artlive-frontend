const IconCard =({icon, description}) =>{
    return(
        <div>
            {icon}
            <p style={{ whiteSpace: "pre-line" }}>
                {description}
            </p>
        </div>
    )
}

export default IconCard
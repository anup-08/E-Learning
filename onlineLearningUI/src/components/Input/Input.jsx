export default function Input(
    {type = "text",
    placeholder ,
    className,
    ...props}
){
    return (
        <>
            <input type={type} placeholder={placeholder} className = {`${className}`} {...props} ref={props.ref} />
        </>
    )
}
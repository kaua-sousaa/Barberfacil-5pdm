function Title (props){

    return (
        <h1 className="text-center text-2xl font-bold text-slate-50 m-2">
            {props.children}
        </h1>
    )
}

export default Title
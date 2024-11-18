function Form(props){

    return (
        <div className="flex flex-col bg-slate-200 p-5 rounded-md gap-4">
            {props.children}
        </div>
    )
}

export default Form;
function Button (props){

    return (
        <button {...props} className="bg-slate-500 py-2 rounded-md text-slate-50 font-bold"      
        >
            {props.children}
        </button>
    )
}

export default Button
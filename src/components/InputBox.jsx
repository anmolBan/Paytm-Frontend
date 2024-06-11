export function InputBox({label, placeholder, onChange, type}){
    console.log(type);
    return(
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-500" onChange={onChange} type={type || "text"} required></input>
        </div>
    )
}
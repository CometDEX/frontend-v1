export default (enumValue) => {
    if(enumValue){
        let string = enumValue.split("_").filter(v => v !== "").join(" ")
        return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : string
    }
    
    return enumValue
}
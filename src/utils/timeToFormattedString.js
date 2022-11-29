const timeToFormattedString = dateObject => {
    if(!dateObject) return ""

    const date = new Date(dateObject)
    const hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const formattedTime = `${hours}.${minutes}`
    
    return formattedTime;
}

export default timeToFormattedString;
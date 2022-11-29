import timeToFormattedString from "./timeToFormattedString"

const timeRangeString = datePairObjArray => {
    if(!datePairObjArray) return ""
    if(datePairObjArray?.length === 0) return ""
    const dateStart = timeToFormattedString(datePairObjArray[0])
    const dateEnd = timeToFormattedString(datePairObjArray[1])

    return `${dateStart} - ${dateEnd}`
}

export default timeRangeString;
function toDate(dateString){
    const date = new Date(dateString);
     date.toDateString()   
    return `${date}`;
}
export default toDate;
export function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...'; 
    } else {
        return text; 
    }
}
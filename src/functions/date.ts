export function dateFormatter(date: string) {
    return new Date(new Date(date).getTime()).toLocaleString()
}
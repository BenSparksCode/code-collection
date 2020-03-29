import {useState, useEffect} from 'react'

//Debounce Hook - Can be easily reused elsewhere
export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}


export function removeHTMLTags(str) {
    return str.replace(/<[^>]*>?/gm, '');
};
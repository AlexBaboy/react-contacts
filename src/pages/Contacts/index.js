import {useState, useEffect} from 'react'

const useContacts = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {

        const getContacts = async () => {

            setIsLoading(true)

            try {

                const response = await fetch('https://randomuser.me/api/?results=200')
                const {results, error} = await response.json()
                if(error) {
                    throw new Error(error)
                }
                setData(results)
                setIsError(false)

            } catch (e) {
                setIsError(true)

            } finally {
                setIsLoading(false)
            }
        }
        getContacts()
    },[])

    return {
        data, isLoading, isError
    }
}

export const Contacts = () => {

    const contacts = useContacts([])
    const {isLoading, isError, data} = contacts

    if (isLoading)  return <div>Loading...</div>
    if (isError)  return <div>Error...</div>

    return <div>Contacts {data[0].name.first}</div>
}
import './challenge3.css'
import Input from '../../components/Input'
import Output from '../../components/Output'
import { useEffect, useState } from 'react'

export default function Challenge3(){
    const [sackContents, setSackContents] = useState([])
    const [commonLetters, setCommonLetters] = useState([])
    const [priorities, setPriorities] = useState([])
    const [newPriorities, setNewPriorities] = useState([])
    
    
    
    //parse the input into an array
    const handleSubmit = (event) => {
        event.preventDefault()
        setSackContents((event.target.textInput.value).split('\n'))
    }
    
    
    const getCommonLetters = () => {
        const commonLetter = sackContents.map(str => {
            //for each item in the array, split into two equal compartments
            const sliceOnVal = str.length % 2 === 0 ? (str.length / 2) : (str.length / 2 - 1) 
            const compartmentFront = [...str].slice(0,sliceOnVal)
            const compartmentBack = [...str].slice(sliceOnVal,str.length)
            //find the common letter in each of compartment
            const result = compartmentFront.filter(letter => compartmentBack.includes(letter))
            return (result[0])
        })
        setCommonLetters(commonLetter)
    }
    
    

    //decode the letters into priorities: a - z = 1-26 ; A - Z = 27 - 52
    const getPriorities = (arr, set) => {
        const priorityOrder = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        const priorities = arr.map(letter => {
            return ( priorityOrder.indexOf(letter) + 1 )
        })
        set(priorities)
    }
    
    //what is the total of all the priorities combined
    const getSolution = (state) => state.length && state.reduce((acc,val) => acc + val)


    //part 2: group every three lines and find the letter that's common among those three lines.

    //make a new array grouping by three
    const makeSackGroups = () => {
        let groupedArr = []
        sackContents.forEach((line, index) => {
            let indexGroup = Math.floor(index / 3)
            if (!groupedArr[indexGroup]) { groupedArr[indexGroup] = [] } 
            groupedArr[indexGroup].push(line)
        })
        return (groupedArr)
    }

    // find the common letter in each group
    const commonLetterInGroup = makeSackGroups().map((group, index) => {
        const commonInGroups1and2 = [...group[0]].filter(letter => [...group[1]].includes(letter))
        const commonInGroups2and3 = [...group[1]].filter(letter => [...group[2]].includes(letter))
        const commonLetter = commonInGroups1and2.filter(letter => commonInGroups2and3.includes(letter))
        return (commonLetter[0])
    })
    

    useEffect(()=>{
        getCommonLetters()
        console.log(commonLetterInGroup)
    },[sackContents])

    useEffect(() => {
        getPriorities(commonLetters, setPriorities)
        getPriorities(commonLetterInGroup, setNewPriorities)
    },[commonLetters])

    useEffect(()=>{
        getSolution(priorities)
    },[priorities])


    return (
        <>
            <div className='day3'>
                <Input
                    title= "Day 3"
                    heading= "Sort the Rucksacks"
                    handleSubmit= {handleSubmit}
                />
                <Output
                    solution={getSolution(priorities)}
                    part2Solution={getSolution(newPriorities)}
                />
            </div>
        </>
    )
}
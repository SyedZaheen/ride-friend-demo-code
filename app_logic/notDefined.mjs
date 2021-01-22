export default function notDefined (parentFunction) {
    if (parentFunction) {
        throw Error(`The function "${parentFunction.name}" that you called isn't defined!
    Go to "${parentFunction.name}" and write the function definition.
    `)
    } else {
        throw Error(`The function you called is not defined, and contains notDefined().
        notDefined() takes the parent function as a single argument which you forgot to provide.
        `)
    }
    
    
}
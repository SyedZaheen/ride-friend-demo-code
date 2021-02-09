function asynch(a,b) {
    return new Promise( (resolve, reject) => {
        let sum;
        setTimeout(() => {sum = a+b; resolve(sum);}, 3000 )
        
    })
}

async function getSum() {
    const sum = await asynch( 6,10);
    console.log(sum)
}

getSum()
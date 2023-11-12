function* getDeal(data, index) {
    // let index = 0;

    // while (index < data.length) {
    while (true) {
        yield data[index];
        // index += 1;
    }
}

const tapeReadingMotor = (iterator) => {
    // const iterator = getDeal(data);
    // console.log(iterator.next().value);
    // console.log(iterator.next().value);
    return iterator.next().value;

    // console.log('tapeReadingMotor:', data[0])
    // return data[0];
}

const  chartMotor = () => {
    // TODO: 
}

export {
    getDeal,
    tapeReadingMotor
}
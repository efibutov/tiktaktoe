function size(ar){
    let row_count = ar.length;
    let row_sizes = [];

    for(let i=0; i<row_count; i++){
        row_sizes.push(ar[i].length)
    }

    return [row_count, Math.min.apply(null, row_sizes)]
}

function getFileDateAsFileName() {
    function addZero(v) {
        if (v < 10) {
            v = `0${v}`;
        }
        return v;
    }

    let t = new Date();
    const year = t.getFullYear();
    const month = addZero(t.getMonth() + 1);
    const day = addZero(t.getDate());
    const hrs = addZero(t.getHours());
    const minutes = addZero(t.getMinutes());
    const seconds = addZero(t.getSeconds());
    const milliseconds = t.getMilliseconds();
    return `${year}.${month}.${day}__${hrs}.${minutes}.${seconds}(${milliseconds}).json`
}

export {size, getFileDateAsFileName};

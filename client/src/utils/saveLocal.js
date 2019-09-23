export default (label, data, stringify = false) => {
    try {
        localStorage.setItem(label, data, stringify ? JSON.stringify(data) : data);
    } catch(err) {
        throw err;
    }
}
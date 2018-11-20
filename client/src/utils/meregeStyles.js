export default (stylesheets) => {
    if(Array.isArray(stylesheets)) {
        let allStyle = {}
        stylesheets.forEach((stylesheet) => {
            allStyle = Object.assign(allStyle, stylesheet);
        });

        return allStyle;
    } else {
        throw new Error('You must pass an array!')
    }
}
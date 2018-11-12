export default (tokenName) => {
    return window.localStorage.getItem(tokenName);
}
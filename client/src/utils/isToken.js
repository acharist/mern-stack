export default (tokenName) => {
    return !!localStorage.getItem(tokenName);
}
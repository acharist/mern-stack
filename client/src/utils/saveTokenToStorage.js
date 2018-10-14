export default (name, token) => {
    localStorage.setItem(name, `Bearer ${token}`);
}
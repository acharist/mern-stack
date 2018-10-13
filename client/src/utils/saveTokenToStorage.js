export default (token) => {
    localStorage.setItem('token', `Bearer ${token}`);
}
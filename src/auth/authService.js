const getUser = () => {
    const user = sessionStorage.getItem('user');

    if(user === 'undefined' || !user){
        return null;
    }else{
        return JSON.parse(user);
    }
}


const getToken = () => {

    return sessionStorage.getItem('token');

}

const setUserSession = (user, token) => {

    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
}

const resetUserSession = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
}


module.exports = {
    getUser,
    getToken,
    setUserSession,
    resetUserSession
}
class Auth {
    constructor(){
        this.isAuthenticated = false
        if (localStorage.getItem('token')){
            this.isAuthenticated=true
        }
    }

    logout=()=>{
     localStorage.removeItem('token');
    }

    isAuthenticated(){
        return this.isAuthenticated
    }
}
export default new Auth()
class Auth {
    constructor(){
        this.isAuthenticated = false
        if (localStorage.getItem('token')){
            this.isAuthenticated=true
        }
    }

    logout=(cb)=>{
     localStorage.removeItem('token');
     cb();
    }

    isAuthenticated(){
        return this.isAuthenticated
    }
}
export default new Auth()
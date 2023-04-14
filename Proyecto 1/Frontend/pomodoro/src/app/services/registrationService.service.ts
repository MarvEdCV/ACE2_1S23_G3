export class RegistrationService{

    private username:string = "";
    public LOCALSTORAGE_KEY_FOR_USERNAME = "username";

    setUsername(username:string):void{
        this.username = username;
        localStorage.setItem(this.LOCALSTORAGE_KEY_FOR_USERNAME, username);
    }

    getUsername():string{

        if(this.username == ""){
            let userCredential = localStorage.getItem(this.LOCALSTORAGE_KEY_FOR_USERNAME)
            if(userCredential){
                this.username = userCredential;
            }
        }
        return this.username;
    }
}
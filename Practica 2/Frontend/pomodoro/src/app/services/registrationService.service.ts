export class RegistrationService{

    private username:string = "";

    setUsername(username:string):void{
        this.username = username;
    }

    getUsername():string{
        return this.username;
    }
}
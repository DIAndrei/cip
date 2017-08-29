import { Component } from '@angular/core';
import { UserService } from '../user.service';


@Component({
    moduleId: module.id,
    selector: 'pass-form',
    templateUrl: './user-pass.html'
})
export class UserPasswordComponent {

    private isEditing: boolean = false;

    constructor(private _userService: UserService) { }

    changePass(oldPass: string, newPass: string, confirmPass: string) {
        if (newPass !== confirmPass) {
            return console.log('Passwords don\'t match')
        }
        let editedUser: Object = {
            oldPassword: oldPass,
            newPassword: newPass
        }
        this._userService.changePass(editedUser).subscribe(
            res => {
                this.disableEdit();
                console.log(res);
            },
            err => console.error(err)
        );
    }

    enableEdit() {
        this.isEditing = true;
    }

    disableEdit() {
        this.isEditing = false;
    }

}

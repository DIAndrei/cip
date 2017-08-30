import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'pass-form',
    templateUrl: './user-pass.html'
})
export class UserPasswordComponent {

    private isEditing: boolean = false;
    private passForm: FormGroup;

    private oldPassword = new FormControl('', [Validators.required,
    Validators.minLength(6)]);
    private newPassword = new FormControl('', [Validators.required,
    Validators.minLength(6)]);
    private confirmPassword = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

    constructor(
        private formBuilder: FormBuilder,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.passForm = this.formBuilder.group({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
        });
    }

    changePass() {
        this._userService.changePass(this.passForm.value).subscribe(
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
        this.passForm.setValue({ oldPassword: null, newPassword: null, confirmPassword: null });
    }

}

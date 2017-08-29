import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user/user.service';
import { SessionService } from '../util/session.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: './register.html'
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    email = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_.@\\s]*')]);

    password = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService,
        private _sessionService: SessionService
    ) { }

    ngOnInit() {
        if (this._sessionService.isLoggedIn()) {
            this._router.navigate(['/']);
        }
        this.registerForm = this._formBuilder.group({
            email: this.email,
            password: this.password
        });
    }

    register() {
        this._userService.register(this.registerForm.value).subscribe(
            res => {
                this._router.navigate(['/login']);
            },
            err => {
                console.error(err);
            }
        );
    }
}

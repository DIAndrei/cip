import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotService } from './forgot.service';

@Component({
    moduleId: module.id,
    selector: 'forgot',
    templateUrl: './forgot.html'
})
export class ForgotPasswordComponent implements OnInit {
    private forgotForm: FormGroup;

    email = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_.@\\s]*')]);

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _forgotService: ForgotService
    ) { }

    ngOnInit() {
        this.forgotForm = this._formBuilder.group({
            email: this.email
        });
    }

    sendRequest() {
        this._forgotService.postForgot(this.forgotForm.value).subscribe(
            res => {
                console.log(res);
                // Redirect user to the password reset page
            },
            err => console.log(err)
        );
    }
}
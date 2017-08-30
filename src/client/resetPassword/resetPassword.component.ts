import { Component } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { SessionService } from '../util/session.service';
import { ResetPasswordService } from './resetPassword.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'resetPassword',
    templateUrl: './resetPassword.component.html'
})

export class ResetPasswordComponent {

    private url = '/api/users/reset/:token';
    private passForm: FormGroup;

    private newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
    private confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private sessionService: SessionService,
        private resetPasswordService: ResetPasswordService
    ) { }

    ngOnInit() {
        this.passForm = this.formBuilder.group({
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
        });
    }

    resetPassword() {
        this.route.params.subscribe(
            params => {
                let user = this.passForm.value;
                this.resetPasswordService.postReset(user, params['token']).subscribe(
                res => {
                    console.log(res._body);
                },
                err => {
                    console.error(err._body);
                })
            },
            err => {
                console.error(err);
            })
    }

}
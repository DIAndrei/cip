import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from './profile.service';
import { SessionService } from '../../util/session.service';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(private _sessionService: SessionService) { }

  getUser() {
    return this._sessionService.profile.email;
  }
}

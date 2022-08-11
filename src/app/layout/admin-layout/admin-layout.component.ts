import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../data/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../data/models/user";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public authService : AuthService, private router :Router) {
      // this.authService.verifyToken();

  }

  ngOnInit(): void {
  }

}

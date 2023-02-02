import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../data/services/auth.service";
import {API_CONSTANTES} from "../../constants/API_CONSTANTES";
import {Router} from "@angular/router";
import {AuthServiceJwt} from "../../services/AuthServiceJwt";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService : AuthServiceJwt) {}

  ngOnInit(): void {


  }

}

import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../../../data/models/user";
import {RequestMeta} from "../../../data/models/request-meta";
import {UserService} from "../../../data/services/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$  = new Observable<User[]>();
  isLoading: boolean = false;
  meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0 } ;

  searchText : string = '';
  constructor(private userService : UserService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {this.getUsers();}

  search() {
    if(this.searchText.length > 2){
      this.userService.search(this.searchText).subscribe(
        {
          next: (data)=> {
            console.log(data);
            this.users$ = of(data['data'] as User[]);
            this.meta = data['meta'] as RequestMeta;
            this.isLoading = false;
          },
          error: (err)=> {
            console.log(err);
            this.isLoading = false;
          }
        }
      )
    }
    else{
      this.getUsers();
    }

  }

  getUsers() {
    this.isLoading = true;
    this.userService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.users$ = of(data['data'] as User[]);
          console.log(data['data']);
          this.meta = data['meta'] as RequestMeta;
        },
        error: (err)=> {
          console.log(err);
          this.isLoading = false;
        }, complete : ()=> {
          this.isLoading = false;

        }
      }
    )

  }

  deleteUser(id : number){
    return this.userService.delete(id).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Utilisateur supprimé avec succès', 'Succès');
          this.getUsers();
        },
        error : (error)=> {
          this.toastr.error(error.message(), 'Erreur');
        }
      }
    )
  }

  updateUser(id: number){
    this.router.navigateByUrl('dashboard/utilisateurs/edit/' + id).then(r => {} );
  }

  loadPage(number: number) {
    this.meta.current_page = number;
    this.getPagination();
  }

  getPagination(){
    this.userService.call(this.meta).subscribe(
      {
        next: (data)=> {
          this.users$ = of(data['data'] );
          this.meta = data['meta'] as RequestMeta;
          console.log(this.meta);
          this.isLoading = false;

        },
        error: (err)=> {
          this.isLoading = false;
        }
      }
    )

  }
}



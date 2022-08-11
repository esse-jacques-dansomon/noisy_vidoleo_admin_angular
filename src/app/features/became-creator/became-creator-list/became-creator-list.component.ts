import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BecameCreatorService} from "../../../data/services/became-creator.service";
import {BecameCreator} from "../../../data/models/became-creator";
import {CreatorService} from "../../../data/services/creator.service";

@Component({
  selector: 'app-became-creator-list',
  templateUrl: './became-creator-list.component.html',
  styleUrls: ['./became-creator-list.component.scss']
})
export class BecameCreatorListComponent implements OnInit {

  becameCreators$  = new Observable<BecameCreator[]>();
  isLoading: boolean = false;
  meta : any;
  status = [
    {value: 'all', viewValue: 'tous'},
    {value: 'accepted', viewValue: 'Accepté'},
    {value: 'refused', viewValue: 'Refusé'},
    {value: 'pending', viewValue: 'En attente'},
    {value: 'cancel', viewValue: 'Annulé'},

  ]

  searchText : string = '';
  constructor(private becameCreatorService : BecameCreatorService, private toastr : ToastrService, private creatorService : CreatorService) {
    this.meta = { current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0 , path:''} as RequestMeta;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAll();}

  search() {
    if(this.searchText.trim().length > 2){
      this.becameCreatorService.search(this.searchText).subscribe(
        {
          next: (data)=> {
            console.log(data);
            this.becameCreators$ = of(data['data'] as BecameCreator[]);
            this.meta = data['meta'] as RequestMeta;
            this.isLoading = false;
          },
          error: (err)=> {
            this.isLoading = false;
          }
        }
      )
    }
    else if(this.searchText.trim().length == 0){
      this.getAll();
    }

  }

  getAll() {
    this.isLoading = true;
    this.becameCreatorService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.becameCreators$ = of(data['data'] as BecameCreator[]);
          console.log(data['data']);
          console.log(data['meta']);
          this.meta = data['meta'] as RequestMeta;
          this.isLoading = false;
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

  delete(id : number){
    return this.becameCreatorService.delete(id).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Utilisateur supprimé avec succès', 'Succès');
          this.getAll();
        },
        error : (error)=> {
          this.toastr.error(error.message(), 'Erreur');
        }
      }
    )
  }

  create(becameCreator : BecameCreator){
    this.creatorService.create(becameCreator).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Utilisateur créé avec succès', 'Succès');
          this.getAll();
        },
        error: err => {
          this.toastr.error(err.message(), 'Erreur');
        }
      }
    )
  }


  statusBg(status : string){
    if(status == 'refused'){
      return 'text-danger'
    }
    else if(status == 'accepted'){
      return 'text-success'
    }else{
      return  'text-warning'
    }

  }

  filterByStatus(status: string) {
    this.isLoading = true;
    if(status == 'all'){
      this.getAll();
    }else{
      this.becameCreatorService.status(status).subscribe(
        {
          next: (data)=> {
            this.becameCreators$ = of(data['data'] as BecameCreator[]);
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


  loadPage(number: number) {
    this.meta.current_page = number;
    this.getPagination();
  }

  getPagination(){
    this.becameCreatorService.call(this.meta).subscribe(
      {
        next: (data)=> {
          this.becameCreators$ = of(data['data'] as BecameCreator[]);
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

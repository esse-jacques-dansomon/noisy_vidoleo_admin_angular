import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {Creator} from "../../../data/models/creator";
import {RequestMeta} from "../../../data/models/request-meta";
import {CreatorService} from "../../../data/services/creator.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BecameCreator} from "../../../data/models/became-creator";

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.scss']
})
export class CreatorListComponent implements OnInit {

  creators$  = new Observable<Creator[]>();
  isLoading: boolean = false;
  meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 10, total: 0 } ;

  searchText : string = '';
  constructor(private creatorService : CreatorService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAll();}

  search() {
    if(this.searchText.trim().length > 2){
      this.creatorService.search(this.searchText).subscribe(
        {
          next: (data)=> {
            console.log(data);
            this.creators$ = of(data['data'] as Creator[]);
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
    this.creatorService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.creators$ = of(data['data'] as Creator[]);
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

  delete(id : number){
    return this.creatorService.delete(id).subscribe(
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

  update(creator: Creator){
    // alert(JSON.stringify(creator));
    this.creatorService.update(creator.id, creator).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Utilisateur mis à jour avec succès', 'Succès');
          // this.getAll();
        }
      }
    );
  }


  loadPage(number: number) {
    this.meta.current_page = number;
    this.getPagination();
  }

  getPagination(){
    this.creatorService.call(this.meta).subscribe(
      {
        next: (data)=> {
          this.creators$ = of(data['data']);
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

  block(creator : Creator){
    creator.is_blocked= !creator.is_blocked;
    this.update(creator);
  }

  disponibility(creator : Creator){
    creator.is_available= !creator.is_available;
    this.update(creator);
  }

  vedette(creator : Creator){
    creator.is_featured= !creator.is_featured;
    this.update(creator);
  }
}

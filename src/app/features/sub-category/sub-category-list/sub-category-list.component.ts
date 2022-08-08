import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {SubCategoryService} from "../../../data/services/sub-category.service";
import {SubCategory} from "../../../data/models/sub-category";

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

  subCategories$  = new Observable<SubCategory[]>();
  isLoading: boolean = false;
  meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0 } ;

  searchText : string = '';
  constructor(private subCategoryService : SubCategoryService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {this.getCategories();}

  search() {
    if(this.searchText.length > 2){
      this.subCategoryService.search(this.searchText).subscribe(
        {
          next: (data)=> {
            console.log(data);
            this.subCategories$ = of(data['data'] as SubCategory[]);
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
      this.getCategories();
    }

  }

  getCategories() {
    this.isLoading = true;
    this.subCategoryService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.subCategories$ = of(data['data'] as SubCategory[]);
          console.log(data['data']);
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

  delete(id : number){
    return this.subCategoryService.delete(id).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Utilisateur supprimé avec succès', 'Succès');
          this.getCategories();
        },
        error : (error)=> {
          this.toastr.error(error.message(), 'Erreur');
        }
      }
    )
  }

  update(id: number){
    this.router.navigateByUrl('dashboard/deamndes/edit/' + id).then(r => {} );
  }

  loadPage(number: number) {
    this.meta.current_page = number;
    this.getCategories();
  }

}

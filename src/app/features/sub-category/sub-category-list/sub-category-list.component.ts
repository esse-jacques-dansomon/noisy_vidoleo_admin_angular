import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {SubCategoryService} from "../../../data/services/sub-category.service";
import {SubCategory} from "../../../data/models/sub-category";
import {Category} from "../../../data/models/category";
import {AppFormHelper} from "../../../core/app-helper/app-form-helper";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../data/services/category.service";

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
  form: any;
  categoryUpdateId : any;
  formLoading: boolean = false;
  categories$ : Observable<Category[]> = new Observable<Category[]>();
  constructor(private subCategoryService : SubCategoryService,
              private toastr : ToastrService,
              private categoryService : CategoryService,
            ) { }

  ngOnInit(): void {
    this.getCategories();
    this.categoryService.getAll(1, 1000000).subscribe(
      {
        next: (data)=> {
          this.categories$ = of(data['data'] as Category[]);
        }
      }
    )

    this.form = new FormGroup(
    {
      name : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      category_id : new FormControl('', [Validators.required]),
    }
  );}

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


  loadPage(number: number) {
    this.meta.current_page = number;
    this.getCategories();
  }

  update(id: number){
    this.formLoading = true;
    this.subCategoryService.update(id, this.form.value).subscribe(
      {
        next: (data)=> {
          this.formLoading = false;
          this.form.reset();
          this.getCategories();
          this.toastr.success('Category updated successfully', 'Success');
        },
        error: (err)=> {
          this.formLoading = false;
          this.toastr.error('Something went wrong', 'Error');
        }
      }
    )
  }

  create(){
    this.formLoading = true;
    this.subCategoryService.create(this.form.value).subscribe(
      {
        next: (data)=> {
          this.formLoading = false;
          this.getCategories();
          this.form.reset();
          this.toastr.success('Category created successfully', 'Success');
        },
        error: (err)=> {
          this.formLoading = false;
          this.toastr.error('Something went wrong', 'Error');
        }
      }
    )
  }

  submitForm(){
    if(this.categoryUpdateId){
      this.update(this.categoryUpdateId);
    }
    else{
      this.create();
    }
    this.reset();

  }

  onUpdateButtonCLicked(category : SubCategory){
    this.form.patchValue(category);
    this.categoryUpdateId = category.id
  }

  validateFormControlName(name: string) {
    return AppFormHelper.validateFormControlName(this.form, name);
  }

  reset(){
    this.form.reset();
    this.categoryUpdateId = null;
  }

}

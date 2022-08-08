import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CategoryService} from "../../../data/services/category.service";
import {Category} from "../../../data/models/category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppFormHelper} from "../../../core/app-helper/app-form-helper";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories$  = new Observable<Category[]>();
  isLoading: boolean = false;
  meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0 } ;
  searchText : string = '';
  form: any;
  categoryUpdateId : any;
  formLoading: boolean = false;
  constructor(private userService : CategoryService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = new FormGroup(
      {
        name : new FormControl('', [Validators.required]),
        description : new FormControl('', [Validators.required]),
      }
    )

  }

  search() {
    if(this.searchText.length > 2){
      this.userService.search(this.searchText).subscribe(
        {
          next: (data)=> {
            console.log(data);
            this.categories$ = of(data['data'] as Category[]);
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
    this.userService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.categories$ = of(data['data'] as Category[]);
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

  update(id: number){
     this.formLoading = true;
      this.userService.update(id, this.form.value).subscribe(
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
    this.userService.create(this.form.value).subscribe(
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

  }

  loadPage(number: number) {
    this.meta.current_page = number;
    this.getCategories();
  }

  onUpdateButtonCLicked(category : Category){
    this.form.patchValue({
      name : category.name,
      description : category.description,
    });
    this.categoryUpdateId = category.id
  }

  validateFormControlName(name: string) {
    return AppFormHelper.validateFormControlName(this.form, name);
  }
}

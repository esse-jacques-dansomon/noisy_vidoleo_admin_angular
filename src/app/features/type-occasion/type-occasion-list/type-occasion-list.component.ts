import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TypeOccasionService} from "../../../data/services/type-occasion.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OccasionType} from "../../../data/models/occasion-type";
import {Occasion} from "../../../data/models/occasion";

@Component({
  selector: 'app-type-occasion-list',
  templateUrl: './type-occasion-list.component.html',
  styleUrls: ['./type-occasion-list.component.scss']
})
export class TypeOccasionListComponent implements OnInit {

  typesOccasions$  = new Observable<OccasionType[]>();
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  typeOccasionUpdateId : any;
  form: any;
  meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0 } ;

  searchText : string = '';
  constructor(private typeOccasionService : TypeOccasionService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {
    this.getAll();
    this.form = new FormGroup(
      {
        name : new FormControl('', [Validators.required])
      }
    )

  }


  getAll() {
    this.isLoading = true;
    this.typeOccasionService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.typesOccasions$= of(data['data'] as OccasionType[]);
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
    return this.typeOccasionService.delete(id).subscribe(
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

  loadPage(number: number) {
    this.meta.current_page = number;
    this.getAll();
  }

  update(id: number){
    this.typeOccasionService.update(id, this.form.value).subscribe(
      {
        next: (data) => {
          this.toastr.success('Occasion modifié avec succès', 'Succès');
          this.form.reset();
          this.isSubmitting = false;
          this.typeOccasionUpdateId = null;
          this.getAll();
        },
        error : err => {
          this.toastr.error(err.message(), 'Erreur');
        }
      }
    );
  }
  create() {
    this.isSubmitting = true;
    this.typeOccasionService.create(this.form.value).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Type Occasion créé avec succès', 'Succès');
          this.form.reset();
          this.isSubmitting = false;
          this.typeOccasionUpdateId = null;
          this.getAll();
        },
        error : err => {
          this.toastr.error(err.message(), 'Erreur');
          this.isSubmitting = false;

        }
      }
    )
  }

  formSubmit() {
    if(this.typeOccasionUpdateId){
      this.update(this.typeOccasionUpdateId);
    }else{
      this.create();
    }
  }

  onUpdateButtonClicked(occasion : OccasionType){
    this.typeOccasionUpdateId = occasion.id;
    this.form.patchValue(occasion);
  }

  validateFormControlName(controlName: string) {
    if (this.form.get(controlName).valid && (this.form.get(controlName).touched || this.form.get(controlName).dirty)) {
      return 'is-valid';
    } else if (this.form.get(controlName).invalid && (this.form.get(controlName).touched || this.form.get(controlName).dirty)) {
      return 'is-invalid'
    } else {
      return ''
    }
  }

  resetForm(){
    this.form.reset();
    this.typeOccasionUpdateId = null;
  }




}

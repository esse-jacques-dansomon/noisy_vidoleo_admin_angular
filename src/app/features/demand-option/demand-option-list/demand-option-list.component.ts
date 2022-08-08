import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {DemandeOption} from "../../../data/models/demande-option";
import {DemandOptionService} from "../../../data/services/demand-option.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppFormHelper} from "../../../core/app-helper/app-form-helper";
import {Occasion} from "../../../data/models/occasion";
import {OccasionType} from "../../../data/models/occasion-type";

@Component({
  selector: 'app-demand-option-list',
  templateUrl: './demand-option-list.component.html',
  styleUrls: ['./demand-option-list.component.scss']
})
export class DemandOptionListComponent implements OnInit {

  demandeOptions$  = new Observable<DemandeOption[]>();
  isLoading: boolean = false;
  meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0 } ;
  formLoading: boolean = false;
  form: any ;
  demandOptionUpdateId : any

  constructor(private demandOptionService : DemandOptionService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {
    this.getAll();
    this.form = new FormGroup(
      {
        name : new  FormControl('', [Validators.required]),
        price : new  FormControl('', [Validators.required])
      }
    )
  }

  getAll() {
    this.isLoading = true;
    this.demandOptionService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.demandeOptions$= of(data['data'] as DemandeOption[]);
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
    return this.demandOptionService.delete(id).subscribe(
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

  onFormSubmit(){
    if(this.demandOptionUpdateId){
      this.update(this.demandOptionUpdateId);
    }else{
      this.create();
    }
  }

  update(id: number){
    this.formLoading = true;
    this.demandOptionService.update(id, this.form.value).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Occasion modifié avec succès', 'Succès');
          this.form.reset();
          this.formLoading = false;
          this.getAll();
        },
        error : (error)=> {
          this.toastr.error(error.message(), 'Erreur');
          this.formLoading = false;
        }
      }
    );
    this.formLoading = false;

  }

  loadPage(number: number) {
    this.meta.current_page = number;
    this.getAll();
  }


  create(){
    this.formLoading = true;
    this.demandOptionService.create(this.form.value).subscribe(
      {
        next: (data)=> {
          this.toastr.success('Occasion créé avec succès', 'Succès');
          this.form.reset();
          this.formLoading = false;
          this.getAll();
        },
        error : (error)=> {
          this.toastr.error(error.message(), 'Erreur');
        }
      }
    )
  }


  validFormControl(controlName: string) {
    return AppFormHelper.validateFormControlName(this.form, controlName);
  }


  onUpdateButtonClicked(occasion : OccasionType){
    this.demandOptionUpdateId = occasion.id;
    this.form.patchValue(occasion);
  }

  resetForm(){
    this.form.reset();
    this.demandOptionUpdateId = null;
  }



}

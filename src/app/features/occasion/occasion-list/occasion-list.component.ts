import { Component, OnInit } from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Occasion} from "../../../data/models/occasion";
import {OccasionService} from "../../../data/services/occasion.service";
import {OccasionType} from "../../../data/models/occasion-type";
import {TypeOccasionService} from "../../../data/services/type-occasion.service";

@Component({
  selector: 'app-occasion-list',
  templateUrl: './occasion-list.component.html',
  styleUrls: ['./occasion-list.component.scss']
})
export class OccasionListComponent implements OnInit {

  occasions$ = new Observable<Occasion[]>();
  occasionsTypes$ : OccasionType[] = [];
  isLoading: boolean = false;
  formLoading: boolean = false;
  form: any ;
  occasionUpdateId : any;
  meta: RequestMeta = {current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0};

  searchText: string = '';

  constructor(private occasionService: OccasionService,
              private occasionTypeService : TypeOccasionService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name : new FormControl('', [Validators.required]),
        icon : new FormControl('', [Validators.required]),
        occasion_type_id : new FormControl('', [Validators.required]),
      }
    );
    this.occasionTypeService.getAll().subscribe(
      {
        next: (data) => {
          this.occasionsTypes$ = data['data'] as OccasionType[];
        }
      }
    );
    this.getAll();

  }

  search() {
    if (this.searchText.length > 2) {
      this.occasionService.search(this.searchText).subscribe(
        {
          next: (data) => {
            console.log(data);
            this.occasions$ = of(data['data'] as Occasion[]);
            this.meta = data['meta'] as RequestMeta;
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          }
        }
      )
    } else {
      this.getAll();
    }

  }

  getAll() {
    this.isLoading = true;
    this.occasionService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data) => {
          this.occasions$ = of(data['data'] as Occasion[]);
          console.log(data['data']);
          this.meta = data['meta'] as RequestMeta;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      }
    )

  }

  delete(id: number) {
    return this.occasionService.delete(id).subscribe(
      {
        next: (data) => {
          this.toastr.success('Utilisateur supprimé avec succès', 'Succès');
          this.getAll();
        },
        error: (error) => {
          this.toastr.error(error.message(), 'Erreur');
        }
      }
    )
  }

  update(id: number) {
    this.occasionService.update(id, this.form.value).subscribe(
      {
        next: (data) => {
          this.toastr.success('Occasion modifié avec succès', 'Succès');
          this.form.reset();
          this.formLoading = false;
          this.occasionUpdateId = null;
          this.getAll();
        },
        error : err => {
          this.toastr.error(err.message(), 'Erreur');
        }
      }
    )
  }


  loadPage(number: number) {
    this.meta.current_page = number;
    this.getPagination();
  }

  getPagination(){
    this.occasionService.call(this.meta).subscribe(
      {
        next: (data)=> {
          this.occasions$ = of(data['data'] );
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

  onUpdateButtonClicked(occasion : Occasion){
    this.occasionUpdateId = occasion.id;
    this.form.patchValue(occasion);
  }

  resetForm(){
    this.form.reset();
    this.occasionUpdateId = null;
  }
  formSubmit() {
    if(this.occasionUpdateId){
      this.update(this.occasionUpdateId);
    }else{
      this.submit();
    }
    this.resetForm();
  }

  submit(){
    this.formLoading = true;
    this.occasionService.create(this.form.value).subscribe(
      {
        next: (data) => {
          this.formLoading = false;

          this.toastr.success('Occasion créé avec succès', 'Succès');
          this.form.reset();
          this.getAll();
        },
        error: (error) => {
          this.formLoading = false;
          this.toastr.error(error.message(), 'Erreur');
        }
      }
    )
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


}

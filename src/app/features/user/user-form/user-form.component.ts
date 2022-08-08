import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../data/services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../data/models/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  roles$ = this.userService.getRoles();
  userForm : any
  isLoading = false;
  user : any;
  idUser : any
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr : ToastrService,
    private route : ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email]),
        role_id: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmedPassword: new FormControl('', [Validators.required]),
      }
    )
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      //clear validation on password
      this.userForm.get('password').clearValidators(); // 6. Clear All Validators
      this.userForm.get('confirmedPassword').clearValidators();
      this.userService.getOne(id).subscribe(
        {
          next: (data)=> {
            this.userForm.patchValue(data['data']);
            this.user = data['data'] as User;// 6. Clear All Validators
            this.idUser = id;// 6. Clear All Validators
          },
          error : (data)=> {
            this.toastr.error('Erreur lors de la récupération de l\'utilisateur', 'Erreur');
            this.router.navigateByUrl('dashboard/utilisateurs');
          }
        }
      )
    }
  }

  userFormSubmit() {
    this.isLoading = true;
    if(this.idUser){
      console.log(this.userForm.value);
      alert('update')
      this.update(this.idUser);
    }else{
      this.create()
    }

  }



  validateFormControlName(controlName: string) {
    if(this.userForm.get(controlName).valid && (this.userForm.get(controlName).touched||this.userForm.get(controlName).dirty))
    {
      return 'is-valid';
    }
    else if(this.userForm.get(controlName).invalid && (this.userForm.get(controlName).touched||this.userForm.get(controlName).dirty)){
      return  'is-invalid'
    }else{
      return ''
    }

  }

  hasError(controlName: string){
    return this.userForm.get(controlName).invalid && (this.userForm.get(controlName).touched||this.userForm.get(controlName).dirty)
  }

  update(id : number){
    this.isLoading = true;
    this.userService.update(id ,this.userForm.value).subscribe(
      {
        next: (data)=> {
          this.isLoading = false;
          this.toastr.success('Utilisateur créé avec succès', 'Succès');
        },
        error : (err) => {
          this.toastr.error( err.message, 'Erreur');
          this.isLoading = false;
        },
        complete: ()=> {
          this.isLoading = false;
          this.router.navigateByUrl('dashboard/utilisateurs');
        }
      }
    )
  }

  create(){
    this.userService.create(this.userForm.value).subscribe(
      {
        next: (data)=> {
          this.isLoading = false;
          this.toastr.success('Utilisateur créé avec succès', 'Succès');
        },
        error : (err) => {
          this.toastr.error('Erreur lors de la création de l\'utilisateur', 'Erreur');
          this.isLoading = false;
        },
        complete: ()=> {
          this.isLoading = false;
          this.router.navigateByUrl('dashboard/utilisateurs');
        }
      }
    )
  }

}

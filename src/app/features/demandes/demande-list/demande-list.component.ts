import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Demande} from "../../../data/models/demande";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {DemandeService} from "../../../data/services/demande.service";
import {Status} from "../../../core/enum/status";

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss']
})
export class DemandeListComponent implements OnInit {

  demandes$  = new Observable<Demande[]>();
  isLoading: boolean = false;
  meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0 } ;

  searchText : string = '';
  constructor(private demandeService : DemandeService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAll();}

  search() {
    if(this.searchText.trim().length > 2){
      this.demandeService.search(this.searchText).subscribe(
        {
          next: (data)=> {
            console.log(data);
            this.demandes$ = of(data['data']);
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
    this.demandeService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data)=> {
          this.demandes$ = of(data['data']);
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
    return this.demandeService.delete(id).subscribe(
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

  update(id: number){
    this.router.navigateByUrl('dashboard/utilisateurs/edit/' + id).then(r => {} );
  }

  loadPage(number: number) {
    this.meta.current_page = number;
    this.getAll();
  }

  statusBg(status: Status) {
    if (status == Status.Rejected) {
      return 'text-danger'
    } else if (status == 'accepted') {
      return 'text-success'
    } else {
      return 'text-warning'
    }
  }


}

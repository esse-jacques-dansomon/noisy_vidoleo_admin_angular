import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {RequestMeta} from "../../../data/models/request-meta";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {RetraitService} from "../../../data/services/retrait.service";
import {Retrait} from "../../../data/models/retrait";

@Component({
  selector: 'app-retrait-list',
  templateUrl: './retrait-list.component.html',
  styleUrls: ['./retrait-list.component.scss']
})
export class RetraitListComponent implements OnInit {


  retraits$ = new Observable<Retrait[]>();
  isLoading: boolean = false;
  meta: RequestMeta = {current_page: 1, from: 1, last_page: 1, per_page: 25, total: 0};

  searchText: string = '';

  constructor(private retraitService: RetraitService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAll();
  }

  search() {
    if (this.searchText.trim().length > 2) {
      this.retraitService.search(this.searchText).subscribe(
        {
          next: (data) => {
            console.log(data);
            this.retraits$ = of(data['data'] as Retrait[]);
            this.meta = data['meta'] as RequestMeta;
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
          }
        }
      )
    } else if (this.searchText.trim().length == 0) {
      this.getAll();
    }

  }

  getAll() {
    this.isLoading = true;
    this.retraitService.getAll(this.meta.current_page, this.meta.per_page).subscribe(
      {
        next: (data) => {
          this.retraits$ = of(data['data'] as Retrait[]);
          console.log(data['data']);
          this.meta = data['meta'] as RequestMeta;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }, complete: () => {
          this.isLoading = false;

        }
      }
    )

  }

  delete(id: number) {
    return this.retraitService.delete(id).subscribe(
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
    this.router.navigateByUrl('dashboard/utilisateurs/edit/' + id).then(r => {
    });
  }

  loadPage(number: number) {
    this.meta.current_page = number;
    this.getPagination();
  }

  getPagination(){
    this.retraitService.call(this.meta).subscribe(
      {
        next: (data)=> {
          this.retraits$ = of(data['data'] );
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

  statusBg(status: string) {
    if (status == 'refused') {
      return 'text-danger'
    } else if (status == 'accepted') {
      return 'text-success'
    } else {
      return 'text-warning'
    }
  }

}

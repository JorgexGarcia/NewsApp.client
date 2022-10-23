import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../../models/news.model";
import {NewsService} from "../../services/news.service";
import Swal from "sweetalert2";
import { takeUntil } from 'rxjs/operators';
import {Subject} from "rxjs";

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit, OnDestroy{

  public newsList: News[] = [];
  public loading = false;
  private _Subscriptions: Subject<boolean> = new Subject<boolean>();

  constructor(private _service: NewsService) { }

  ngOnInit(): void {
    this._getData();
  }

  ngOnDestroy(): void {
    this._Subscriptions.next(true);
    this._Subscriptions.unsubscribe();
  }

  private _getData(){
    this._service.getNews(true)
      .pipe(takeUntil(this._Subscriptions))
      .subscribe({
        next: (value:any) => {
          this.newsList = value.data;
        },
        error: _ => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          });
        },
      });
  }

  deleteNews(id: string) {
    Swal.fire({
      title: '¿Sure you want to delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._deleteConfirm(id);
      }
    });
  }

  private _deleteConfirm(id: string){
    this._service.deleteNews(id)
      .pipe(takeUntil(this._Subscriptions))
      .subscribe({
        next: _ => {
          this._getData();
        },
        error: _ => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          });
        },
      });
  }
}

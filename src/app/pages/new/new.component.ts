import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {News} from "../../models/news.model";
import Swal from "sweetalert2";
import { takeUntil } from 'rxjs/operators';
import {Subject} from "rxjs";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy{

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
    this._service.getNews(false)
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

  archivedNews(id: string) {
    Swal.fire({
      title: '¿Sure you want to archive?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Archive',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._archiveConfirm(id);
      }
    });
  }

  private _archiveConfirm(id: string){
    this._service.archivedNews(id)
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

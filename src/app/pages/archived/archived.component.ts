import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {News} from "../../models/news.model";
import Swal from "sweetalert2";
import { takeUntil } from 'rxjs/operators';
import {Subject} from "rxjs";
import {SocketServiceService} from "../../services/socket-service.service";
import {ResponseWs} from "../../models/responsews.interface";

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnDestroy, AfterViewInit{

  public newsList: News[] = [];
  public loading = false;
  private _Subscriptions: Subject<boolean> = new Subject<boolean>();

  constructor(private _socket: SocketServiceService) { }

  ngOnDestroy(): void {
    this._Subscriptions.next(true);
    this._Subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.loading = true;
    this._socket.emitNews(true, null, null);
    this._getData();
    this.loading = false;
  }

  private _getData(){
    this._socket.getNews();
    this._socket.news
      .pipe(takeUntil(this._Subscriptions))
      .subscribe((res:ResponseWs)=>{
        if(!res.error){
          this.newsList = res.archiveNews;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          });
        }
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
        this._socket.emitNews(true, null, id);
        this._getData();
      }
    });
  }
}

import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {ResponseWs} from "../models/responsews.interface";

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  news: Observable<ResponseWs> = new Observable<ResponseWs>();

  constructor(private socket: Socket) {}

  emitNews(type: boolean, updateNews: string | null, deleteNews: string | null): void {
    const data = {
      type: type,
      updateNews: updateNews,
      deleteNews: deleteNews
    };
    this.socket.emit('event', data);
  }

  getNews() {
    this.news = this.socket.fromEvent<any>('news');
  }
}

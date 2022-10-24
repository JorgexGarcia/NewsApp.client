import {News} from "./news.model";

export interface ResponseWs{
  error: string,
  newsNews: News[],
  archiveNews: News[]
}

export class News{

  public id?: string;
  public title?: string;
  public description?: string;
  public date?: Date;
  public content?: string;
  public author?: number;
  public archiveDate?: Date;

  constructor(json:News) {
    if (json.id) this.id = json.id;
    if (json.title) this.title = json.title;
    if (json.description) this.description = json.description;
    if (json.date) this.date = json.date;
    if (json.content) this.content = json.content;
    if (json.author) this.author = json.author;
    if (json.archiveDate) this.archiveDate = json.archiveDate;
  }
}

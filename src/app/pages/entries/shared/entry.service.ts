import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiPath = 'api/entries';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Entry[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonToentries));
  }

  getById(id: number): Observable<Entry> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map((res) => res as Entry)
    );
  }

  create(Entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, Entry).pipe(
      catchError(this.handleError),
      map((res) => res as Entry)
    );
  }

  update(Entry: Entry): Observable<Entry> {
    return this.http.put(`${this.apiPath}/${Entry.id}`, Entry).pipe(
      catchError(this.handleError),
      map(() => Entry)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  jsonToentries(resJson: any[]): Entry[] {
    const entries: Entry[] = [];
    resJson.forEach((e) => {
      const entry = Object.assign(new Entry(), e);
      entries.push(entry);
    });
    return entries;
  }

  handleError(err: any): Observable<any> {
    console.log('Erro na Requisição');
    return throwError(() => err);
  }
}

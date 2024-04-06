import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Entrie } from './entrie.model';
import { CategoryService } from '../../categories/shared/category.serivce';

@Injectable({
  providedIn: 'root',
})
export class EntrieService {
  private apiPath = 'api/entries';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  getAll(): Observable<Entrie[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonToentries));
  }

  getById(id: number): Observable<Entrie> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map((res) => res as Entrie)
    );
  }

  create(entrie: Entrie): Observable<Entrie> {
    return this.categoryService.getById(entrie.categoryid).pipe(
      switchMap((cat) => {
        entrie.category = cat;
        return this.http.post(this.apiPath, entrie).pipe(
          catchError(this.handleError),
          map((res) => res as Entrie)
        );
      })
    );
  }

  update(entrie: Entrie): Observable<Entrie> {
    return this.categoryService.getById(entrie.categoryid).pipe(
      switchMap((cat) => {
        entrie.category = cat;
        return this.http.put(`${this.apiPath}/${entrie.id}`, entrie).pipe(
          catchError(this.handleError),
          map(() => entrie)
        );
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  jsonToentries(resJson: any[]): Entrie[] {
    const entries: Entrie[] = [];
    resJson.forEach((e) => {
      const entry = Object.assign(new Entrie(), e);
      entries.push(entry);
    });
    return entries;
  }

  handleError(err: any): Observable<any> {
    console.log('Erro na Requisição');
    return throwError(() => err);
  }
}

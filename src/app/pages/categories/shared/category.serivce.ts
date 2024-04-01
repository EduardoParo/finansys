import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath = 'api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonToCategories));
  }

  getById(id: number): Observable<Category> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map((res) => res as Category)
    );
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map((res) => res as Category)
    );
  }

  update(category: Category): Observable<Category> {
    return this.http.put(`${this.apiPath}/${category.id}`, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  jsonToCategories(resJson: any[]): Category[] {
    const categories: Category[] = [];
    resJson.forEach((e) => categories.push(e as Category));
    return categories;
  }

  handleError(err: any): Observable<any> {
    console.log('Erro na Requisição');
    return throwError(() => err);
  }
}

import { HttpClient } from '@angular/common/http';
import { BaseResourceModel } from '../model/base-resource.model';
import { Injector } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  http!: HttpClient;

  constructor(injector: Injector, private apiPath: string) {
    this.http = injector.get(HttpClient);
    this.apiPath = apiPath;
  }

  getAll(): Observable<T[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonToResource));
  }

  getById(id = 0): Observable<T> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map((res) => res as T)
    );
  }

  create(category: T): Observable<T> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map((res) => res as T)
    );
  }

  update(category: T): Observable<T> {
    return this.http.put(`${this.apiPath}/${category.id}`, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  jsonToResource(resJson: any[]): T[] {
    const Resource: T[] = [];
    resJson.forEach((e) => Resource.push(e as T));
    return Resource;
  }

  handleError(err: any): Observable<any> {
    console.log('Erro na Requisição');
    return throwError(() => err);
  }
}

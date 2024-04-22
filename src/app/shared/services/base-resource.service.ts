import { HttpClient } from '@angular/common/http';
import { BaseResourceModel } from '../models/base-resource.model';
import { Injector } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  http!: HttpClient;

  constructor(
    injector: Injector,
    private apiPath: string,
    private resJsonToResourceFn: (json: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.apiPath = apiPath;
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map((res: any) => this.jsonToResource(res)),
      catchError(this.handleError)
    );
  }

  getById(id = 0): Observable<T> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      map((res) => this.resJsonToResourceFn(res)),
      catchError(this.handleError)
    );
  }

  upsert(resource: T, isEdit = false): Observable<T> {
    let resource$: Observable<T>;
    if (!isEdit) {
      resource$ = this.create(resource);
    } else {
      resource$ = this.update(resource);
    }

    return resource$.pipe(
      map((res) => this.resJsonToResourceFn(res)),
      catchError(this.handleError)
    );
  }

  create(category: T): Observable<any> {
    return this.http.post(this.apiPath, category);
  }

  update(category: T): Observable<any> {
    return this.http.put(`${this.apiPath}/${category.id}`, category);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  jsonToResource(resJson: any[]): T[] {
    const resource: T[] = [];
    resJson.forEach((e) => resource.push(this.resJsonToResourceFn(e)));
    return resource;
  }

  handleError(err: any): Observable<any> {
    console.log('Erro na Requisição');
    return throwError(() => err);
  }

  getFieldsForm(resource: T): {} {
    return {};
  }
}

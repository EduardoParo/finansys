import { Injectable, Injector } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Entrie } from './entrie.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class EntrieService extends BaseResourceService<Entrie> {
  constructor(injector: Injector) {
    super(injector, 'api/entries');
  }

  override create(entrie: Entrie): Observable<Entrie> {
    return super.getById(entrie.categoryid).pipe(
      switchMap((cat) => {
        entrie.category = cat;
        return super.create(entrie);
      })
    );
  }

  override update(entrie: Entrie): Observable<Entrie> {
    return super.getById(entrie.categoryid).pipe(
      switchMap((cat) => {
        entrie.category = cat;
        return super.update(entrie);
      })
    );
  }
}

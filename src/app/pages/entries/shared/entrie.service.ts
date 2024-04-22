import { Injectable, Injector } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Entrie } from './entrie.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EntrieService extends BaseResourceService<Entrie> {
  constructor(injector: Injector) {
    super(injector, 'api/entries', Entrie.resJsonToResource);
  }

  override getFieldsForm(entrie: Entrie): {} {
    return {
      id: [entrie?.id],
      name: [entrie?.name, [Validators.required, Validators.minLength(2)]],
      description: [entrie?.description],
      type: [entrie?.type ?? 'expense', [Validators.required]],
      amount: [entrie?.amount, [Validators.required]],
      date: [entrie?.date, [Validators.required]],
      paid: [entrie?.paid ?? true, [Validators.required]],
      categoryid: [entrie?.categoryid, [Validators.required]],
    };
  }

  upsertEntrie(entrie: Entrie, isEdit = false): Observable<Entrie> {
    return super.getById(entrie.categoryid).pipe(
      switchMap((cat) => {
        entrie.category = cat;
        return super.upsert(entrie, isEdit);
      })
    );
  }
}

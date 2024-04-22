import { Injectable, Injector } from '@angular/core';
import { Category } from './category.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(injector: Injector) {
    super(injector, 'api/categories', Category.resJsonToCategory);
  }

  override getFieldsForm(category: Category): {} {
    return {
      id: [category?.id],
      name: [category?.name, [Validators.required, Validators.minLength(2)]],
      description: [category?.description],
    };
  }
}

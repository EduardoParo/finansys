import { Component, Injector } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.serivce';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category>  {

  constructor(
    injector:Injector,
    categoryService: CategoryService,
  ) {
    super(injector, categoryService, Category.resJsonToCategory)
  }

}

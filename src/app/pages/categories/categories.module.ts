import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CategoriesRoutingModule,
  ],
  declarations: [CategoryListComponent, CategoryFormComponent],
})
export class CategoriesModule {}

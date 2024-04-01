import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.serivce';
import { take } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService
      .getAll()
      .pipe(take(1))
      .subscribe((res) => {
        this.categories = res;
      });
  }

  deleteCategory(category: Category): void {
    const canDelete = confirm(
      `Deseja realmente excluir o item : ${category.name}`
    );
    if (canDelete) {
      this.categoryService.delete(Number(category.id)).subscribe(
        () =>
          (this.categories = this.categories.filter(
            (e) => e.id !== category.id
          )),
        () => alert('erro ao tentar deletar')
      );
    }
  }
}

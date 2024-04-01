import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.serivce';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  isEdit!: boolean;
  form!: UntypedFormGroup;
  pageTitle!: string;
  serverErrorMessages: string[] = [];
  category: Category = new Category();
  isDisableSubmit = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    public toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.onInitLoadRouterAction();
    this.onInitLoadCategory();
    this.onInitBuildForm();
  }

  ngAfterContentChecked(): void {
    this.onInitPageTitle();
  }

  onInitLoadRouterAction(): void {
    this.isEdit = this.route.snapshot.url[0].path !== 'new';
  }

  onInitBuildForm(): void {
    this.form = this.fb.group({
      id: [this.category.id],
      name: [
        this.category.name,
        [Validators.required, Validators.minLength(2)],
      ],
      description: [this.category.description],
    });
  }

  onInitLoadCategory(): void {
    if (this.isEdit) {
      this.route.paramMap
        .pipe(
          switchMap((param) =>
            this.categoryService.getById(Number(param.get('id')))
          )
        )
        .subscribe(
          (res) => {
            this.category = res;
            this.form.patchValue(this.category);
          },
          (error) => alert('Erro no formulario')
        );
    }
  }

  onInitPageTitle(): void {
    this.pageTitle = this.isEdit
      ? `Editando a Categoria: ${this.category.name ?? ''}`
      : 'Nova Categoria';
  }

  submit(): void {
    if (this.isEdit) {
      this.editCategory();
    } else {
      this.newCategory();
    }
  }

  newCategory(): void {
    const category: Category = Object.assign(new Category(), this.form.value);

    this.categoryService.create(category).subscribe(
      (res) => {
        this.toastrService.success('Registrado com Sucesso!');
        this.router
          .navigateByUrl('categories', { skipLocationChange: true })
          .then(() => this.router.navigate(['categories', res.id, 'edit']));
      },
      (error) => this.showErrors(error)
    );
  }

  editCategory(): void {
    const category: Category = Object.assign(new Category(), this.form.value);
    this.categoryService.update(category).subscribe(
      (res) => {
        this.toastrService.success('Alterado com Sucesso!');
        this.router
          .navigateByUrl('categories', { skipLocationChange: true })
          .then(() => this.router.navigate(['categories', res.id, 'edit']));
      },
      (error) => this.showErrors(error)
    );
  }

  showErrors(error: { status: number; body: any }): void {
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error.body).errors;
    }
    this.toastrService.error('Houve um erro ao salvar os dados');
  }
}

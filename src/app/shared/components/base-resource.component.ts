import {
  AfterContentChecked,
  Directive,
  Injector,
  OnInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseResourceService } from '../services/base-resource.service';
import { switchMap, take } from 'rxjs';
import { BaseResourceModel } from '../models/base-resource.model';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit
{
  activeRoute: ActivatedRoute;
  router: Router;
  fb: UntypedFormBuilder;
  form!: UntypedFormGroup;
  toastrService: ToastrService;
  isEdit = false;
  pageTitle = '';
  serverErrorMessages = '';
  isDisableSubmit = false;
  resource!: T;

  constructor(
    injector: Injector,
    protected resourceService: BaseResourceService<T>,
    protected resJsonToResourceFn: (res: any) => T
  ) {
    this.activeRoute = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.fb = injector.get(UntypedFormBuilder);
    this.toastrService = injector.get(ToastrService);
    this.isEdit = this.activeRoute.snapshot.url[0].path !== 'new';
  }

  ngOnInit(): void {
    this.onInitBuildForm();
    this.onInitPageTitle();
  }

  onInitBuildForm(): void {
    this.form = this.fb.group(
      this.resourceService.getFieldsForm(this.resource)
    );
  }

  onInitPageTitle(): void {
    if (!this.isEdit) {
      this.pageTitle = 'Nova Categoria';
    } else {
      this.loadResource();
    }
  }

  loadResource(): void {
    if (this.isEdit) {
      this.activeRoute.paramMap
        .pipe(
          take(1),
          switchMap((param) =>
            this.resourceService.getById(Number(param.get('id')))
          )
        )
        .subscribe({
          next: (res) => {
            this.resource = res;
            this.form.patchValue(this.resource);
            this.pageTitle = `Editando a Categoria: ${this.resource?.name ?? ''}`;
          },
          error: (error) => alert('Falha no formulario'),
        });
    }
  }

  submit(): void {
    this.resourceService.upsert(this.form.value, this.isEdit).subscribe({
      next: (res) => this.showSuccess(res),
      error: (error) => this.showErrors(error),
    });
  }

  showSuccess(res: T): void {
    this.toastrService.success('Registrado com Sucesso!');
    this.router
      .navigateByUrl('categories', { skipLocationChange: true })
      .then(() => this.router.navigate(['categories', res.id, 'edit']));
  }

  showErrors(error: { status: number; body: any }): void {
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error.body).errors;
    }
    this.toastrService.error('Houve uma falha ao registrar os dados');
  }
}

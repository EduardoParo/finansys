import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Entrie } from '../shared/entrie.model';
import { EntrieService } from '../shared/entrie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { CategoryService } from '../../categories/shared/category.serivce';
import { Category } from '../../categories/shared/category.model';

@Component({
  selector: 'app-entrie-form',
  templateUrl: './entrie-form.component.html',
})
export class EntrieFormComponent implements OnInit, AfterContentChecked {
  isEdit!: boolean;
  form!: UntypedFormGroup;
  pageTitle!: string;
  serverErrorMessages: string[] = [];
  entrie: Entrie = new Entrie();
  isDisableSubmit = false;
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZero: true,
  };

  categories!: Category[];

  get typeOptions(): { text: string; value: string }[] {
    return Object.entries(Entrie.types).map(([value, text]) => ({
      text: text,
      value: value,
    }));
  }

  constructor(
    private entrieService: EntrieService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    public categoryService: CategoryService,
    public toastrService: ToastrService,
    public primeNGConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.onInitLoadRouterAction();
    this.onInitLoadEntrie();
    this.onInitLoadCategories();
    this.onInitBuildForm();
    this.onInitPrimeNgConfig();
  }

  ngAfterContentChecked(): void {
    this.onInitPageTitle();
  }

  onInitPrimeNgConfig(): void {
    this.primeNGConfig.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar',
      accept: 'Sim',
      reject: 'Não',
      firstDayOfWeek: 0,
      dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      today: 'Hoje',
    });
  }

  onInitLoadRouterAction(): void {
    this.isEdit = this.route.snapshot.url[0].path !== 'new';
  }

  onInitBuildForm(): void {
    this.form = this.fb.group({
      id: [this.entrie.id],
      name: [this.entrie.name, [Validators.required, Validators.minLength(2)]],
      description: [this.entrie.description],
      type: [this.entrie?.type ?? 'expense', [Validators.required]],
      amount: [this.entrie.amount, [Validators.required]],
      date: [this.entrie.date, [Validators.required]],
      paid: [this.entrie?.paid ?? true, [Validators.required]],
      categoryid: [this.entrie.categoryid, [Validators.required]],
    });
  }

  onInitLoadEntrie(): void {
    if (this.isEdit) {
      this.route.paramMap
        .pipe(
          switchMap((param) =>
            this.entrieService.getById(Number(param.get('id')))
          )
        )
        .subscribe(
          (res) => {
            this.entrie = res;
            this.form.patchValue(this.entrie);
          },
          (error) => alert('Erro no formulario')
        );
    }
  }

  onInitLoadCategories(): void {
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
  }

  onInitPageTitle(): void {
    this.pageTitle = this.isEdit
      ? `Editando Lançamento: ${this.entrie.name ?? ''}`
      : 'Novo Lançamento';
  }

  submit(): void {
    if (this.isEdit) {
      this.editEntrie();
    } else {
      this.newEntrie();
    }
  }

  newEntrie(): void {
    const entrie: Entrie = Object.assign(new Entrie(), this.form.value);

    this.entrieService.create(entrie).subscribe(
      (res) => {
        this.toastrService.success('Registrado com Sucesso!');
        this.router
          .navigateByUrl('entries', { skipLocationChange: true })
          .then(() => this.router.navigate(['entries', res.id, 'edit']));
      },
      (error) => this.showErrors(error)
    );
  }

  editEntrie(): void {
    const entrie: Entrie = Object.assign(new Entrie(), this.form.value);
    this.entrieService.update(entrie).subscribe(
      (res) => {
        this.toastrService.success('Alterado com Sucesso!');
        this.router
          .navigateByUrl('entries', { skipLocationChange: true })
          .then(() => this.router.navigate(['entries', res.id, 'edit']));
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

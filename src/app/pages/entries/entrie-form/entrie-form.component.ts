import { Component, Injector, OnInit } from '@angular/core';
import { Entrie } from '../shared/entrie.model';
import { EntrieService } from '../shared/entrie.service';
import { PrimeNGConfig } from 'primeng/api';
import { CategoryService } from '../../categories/shared/category.serivce';
import { Category } from '../../categories/shared/category.model';
import { PrimeNGConfigService } from '../../../shared/models/primeNGConfig.model';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource.component';

@Component({
  selector: 'app-entrie-form',
  templateUrl: './entrie-form.component.html',
})
export class EntrieFormComponent
  extends BaseResourceFormComponent<Entrie>
  implements OnInit
{
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
    injector: Injector,
    public entrieService: EntrieService,
    public categoryService: CategoryService,
    public primeNGConfig: PrimeNGConfig,
    private primeNGConfigService: PrimeNGConfigService
  ) {
    super(injector, entrieService, Entrie.resJsonToResource);
  }

  override ngOnInit(): void {
    this.onInitLoadCategories();
    this.onInitPrimeNgConfig();
    super.ngOnInit();
  }

  onInitPrimeNgConfig(): void {
    this.primeNGConfig.setTranslation(this.primeNGConfigService.getConfig());
  }

  onInitLoadCategories(): void {
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
  }

}

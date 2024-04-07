import { BaseResourceModel } from '../../../shared/model/base-resource.model';
import { Category } from '../../categories/shared/category.model';

export class Entrie extends BaseResourceModel {
  constructor(
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryid?: number,
    public category?: Category
  ) {
    super();
  }

  static readonly types = {
    expense: 'Despesa',
    revenue: 'Receita',
  };

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pedente';
  }
}

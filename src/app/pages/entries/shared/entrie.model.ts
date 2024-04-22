import { BaseResourceModel } from '../../../shared/models/base-resource.model';
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
    renevue: 'Receita',
  };

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pedente';
  }

  static resJsonToResource(res: any): Entrie {
    return Object.assign(new Entrie(), res);
  }
}

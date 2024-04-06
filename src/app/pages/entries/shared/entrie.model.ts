import { Category } from '../../categories/shared/category.model';

export class Entrie {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryid?: number,
    public category?: Category
  ) {}

  static types = {
    expense: 'Despesa',
    revenue: 'Receita',
  };

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pedente';
  }
}

import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, debounceTime, of } from 'rxjs';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class DataBase implements InMemoryDbService {
  createDb(
    reqInfo?: RequestInfo | undefined
  ): {} | Observable<{}> | Promise<{}> {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamento de Contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Rmédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, Parques, Praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Freelas', description: 'Trabalho com Freelancer' },
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Gás de cozinha',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '14/10/2018',
        amount: '70,80',
        type: 'expense',
        description: 'Qualquer descrição',
      } as Entry,
      {
        id: 2,
        name: 'Suplemento',
        categoryId: categories[1].id,
        category: categories[1],
        paid: false,
        date: '14/10/2018',
        amount: '500,00',
        type: 'expense',
        description: 'Qualquer descrição',
      } as Entry,
      {
        id: 3,
        name: 'Salario',
        categoryId: categories[3].id,
        category: categories[3],
        paid: true,
        date: '14/10/2018',
        amount: '20000,00',
        type: 'renevue',
        description: 'Qualquer descrição',
      } as Entry,
      {
        id: 4,
        name: 'Uber',
        categoryId: categories[2].id,
        category: categories[2],
        paid: true,
        date: '14/10/2018',
        amount: '70,80',
        type: 'expense',
        description: 'Qualquer descrição',
      } as Entry,
      {
        id: 5,
        name: 'Academia',
        categoryId: categories[1].id,
        category: categories[1],
        paid: false,
        date: '14/10/2018',
        amount: '150,80',
        type: 'expense',
        description: 'Qualquer descrição',
      } as Entry,
    ];

    return of({ categories, entries }).pipe(debounceTime(1200));
  }
}

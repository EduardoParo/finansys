import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, debounceTime, of } from 'rxjs';
import { Category } from './pages/categories/shared/category.model';

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

    //return { categories };
    return of({ categories }).pipe(debounceTime(1200));
  }
}

import { Component } from '@angular/core';
import { EntrieService } from '../shared/entrie.service';
import { take } from 'rxjs';
import { Entrie } from '../shared/entrie.model';

@Component({
  selector: 'app-entrie-list',
  templateUrl: './entrie-list.component.html',
})
export class EntrieListComponent {
  entries: Entrie[] = [];

  constructor(private entryService: EntrieService) {}
  ngOnInit(): void {
    this.entryService
      .getAll()
      .pipe(take(1))
      .subscribe((res) => {
        this.entries = res;
      });
  }

  deleteEntry(category: Entrie): void {
    const canDelete = confirm(
      `Deseja realmente excluir o item : ${category.name}`
    );
    if (canDelete) {
      this.entryService.delete(Number(category.id)).subscribe(
        () =>
          (this.entries = this.entries.filter(
            (e) => e.id !== category.id
          )),
        () => alert('erro ao tentar deletar')
      );
    }
  }
}


import { Component } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { take } from 'rxjs';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
})
export class EntriesListComponent {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}
  ngOnInit(): void {
    this.entryService
      .getAll()
      .pipe(take(1))
      .subscribe((res) => {
        this.entries = res;
      });
  }

  deleteEntry(category: Entry): void {
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


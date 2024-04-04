import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrieListComponent } from './entrie-list/entrie-list.component';
import { EntrieFormComponent } from './entrie-form/entrie-form.component';

const routes: Routes = [
  { path: '', component: EntrieListComponent },
  { path: 'new', component: EntrieFormComponent },
  { path: ':id/edit', component: EntrieFormComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule {}

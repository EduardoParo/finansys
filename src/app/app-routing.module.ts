import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'entries',
    loadChildren: () =>
      import('./pages/entries/entries.module').then((m) => m.EntriesModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EntriesListComponent } from './entries-list/entries-list.component';

const routes: Route[] = [{ path: '', component: EntriesListComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule {}

import { NgModule } from '@angular/core';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntrieListComponent } from './entrie-list/entrie-list.component';
import { EntrieFormComponent } from './entrie-form/entrie-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule, EntriesRoutingModule],
  declarations: [EntrieListComponent, EntrieFormComponent],
})
export class EntriesModule {}

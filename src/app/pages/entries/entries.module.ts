import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    EntriesRoutingModule,
  ],
  declarations: [EntriesListComponent],
})
export class EntriesModule {}

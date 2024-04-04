import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntrieListComponent } from './entrie-list/entrie-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EntrieFormComponent } from './entrie-form/entrie-form.component';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
  ],
  declarations: [EntrieListComponent, EntrieFormComponent],
})
export class EntriesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CalendarModule,
    IMaskModule,
  ],
  exports: [CommonModule, ReactiveFormsModule, CalendarModule, IMaskModule],
})
export class SharedModule {}

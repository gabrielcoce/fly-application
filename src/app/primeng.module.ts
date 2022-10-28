import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

const primeng = [
  CalendarModule,
  InputTextModule,
  DropdownModule,
  ToastModule,
  TableModule,
  MessagesModule,
  MessageModule,
  ButtonModule,
];

@NgModule({
  declarations: [],
  imports: [primeng],
  exports: [primeng],
})
export class PrimengModule {}

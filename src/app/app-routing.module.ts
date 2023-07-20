import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditReservationComponent } from './add-edit-reservation/add-edit-reservation.component';

const routes: Routes = [
  { path: 'add-reservation', component: AddEditReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from './models/Reservation';
import { MatTable} from '@angular/material/table';
import { reservationList } from './services/reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'resturant-reservation';
  showAddReservationComp:boolean = false; // variable used for showing and hiding Add Reservation Component
  displayedColumns: string[] = ['reservationDate', 'reservationTime', 'partyName', 'numberOfAttend','fullfilled','cancel'];
  dataSource: Reservation[] = [];
  @ViewChild(MatTable)  table!: MatTable<Reservation>;

  constructor(private reservationListObservable$: reservationList) {
    this.reservationListObservable$.getReservations().subscribe((resList) => {
      this.dataSource = resList;
    });
    this.reservationListObservable$.updateReservations(JSON.parse(localStorage.getItem("reservations") || "[]")); 
  }
  //used for show and hide add reservation component button
  showAndHideAddReservation(){
    this.showAddReservationComp = !this.showAddReservationComp;
  }
  // I added this piece just to give an example for variables being passed between components, 
  // but I would prefer to leave it up to the user if he wants to close the Add Reservation Window or not
  // since he/she might want to add multiple reservations without needing to always hit the Add Reservation button every time.
  showAddReservComp($event: boolean){
    this.showAddReservationComp = $event;
  }

  // cancel the reservation and removes it from the local storage
  cancelReservation(Id: number) {
    this.dataSource.forEach((element, index) => {
      if (element.Id == Id) {
        this.dataSource.splice(index, 1);
      }
    });
    localStorage.setItem('reservations', JSON.stringify(this.dataSource));
    this.reservationListObservable$.updateReservations(JSON.parse(localStorage.getItem("reservations") || "[]"));
  }

  // toggles the reservation status
  fulfillReservation(Id: number) {
    this.dataSource.forEach((element, index) => {
      if (element.Id == Id) {
        element.fullfilled = !element.fullfilled;
      }
    });
    localStorage.setItem('reservations', JSON.stringify(this.dataSource));
    this.reservationListObservable$.updateReservations(JSON.parse(localStorage.getItem("reservations") || "[]"));
  }
}

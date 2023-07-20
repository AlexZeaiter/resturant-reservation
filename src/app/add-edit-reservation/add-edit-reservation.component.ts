import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Reservation } from "../models/Reservation"
import { reservationList } from '../services/reservation.service';



@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.css']
})
export class AddEditReservationComponent implements OnInit  {
  myForm: FormGroup;
  @Output() showThisComponent = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
    private reservationsListObservable$: reservationList){
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      date:'',
      time:'',
      partyName: '',
      numberOfAttendents: ''
    })
  }
  onSubmit(){
    const formValue = this.myForm.value;
    var Reservations: Reservation [] = []; //used as temp data to work on the reservation list from and into the local sotrage
    let reservation: Reservation = new Reservation(formValue.date, formValue.time, formValue.partyName, formValue.numberOfAttendents);
    let LocalSotrage = localStorage.getItem('reservations');
    //checks if there is anything save before in the local storage
    if(LocalSotrage== null || LocalSotrage == '[]'){
      reservation.Id = 0;
    } else { // else it will add to existing data then save and update the observable to update the rable in the main component
      Reservations = JSON.parse(LocalSotrage || "[]");
      let lastReservation = Reservations[Reservations.length - 1];
      reservation.Id = lastReservation.Id + 1;
    }
    Reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(Reservations));
    this.reservationsListObservable$.updateReservations(Reservations);
    this.myForm.reset();
    this.showThisComponent.emit(false);
  }
  cancel(){
    this.myForm.reset();
    this.showThisComponent.emit(false);
  }
}

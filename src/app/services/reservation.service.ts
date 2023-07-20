import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Reservation } from '../models/Reservation';

@Injectable({ providedIn: 'root' })
export class reservationList {
    private reservationList = new Subject<any>();

    getReservations(): Observable<Reservation[]> {
        console.log(JSON.parse(localStorage.getItem("reservations") || "[]"));
        return this.reservationList.asObservable();
    }
    /*addReservation(reservation: Reservation){
        this.reservationList = [...this.reservationList, reservation];
    }*/
    updateReservations(reservationList: Reservation[]){
        console.log(JSON.parse(localStorage.getItem("reservations") || "[]"));
        //this.reservationList = reservationList;
        this.reservationList.next(reservationList);
    }
}
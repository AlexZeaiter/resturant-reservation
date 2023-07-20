import { Time } from "@angular/common";

export class Reservation {
    Id: number = 0;
    reservationDate: Date;
    reservationTime: Time;
    partyName: string;
    numberOfAttend: number;
    fullfilled: boolean = false;

    constructor(reservationDate: Date, reservationTime: Time, partyName: string, numberOfAttend: number) {
        this.reservationDate = reservationDate;
        this.partyName = partyName;
        this.numberOfAttend = numberOfAttend;
        this.reservationTime = reservationTime;
      }
}
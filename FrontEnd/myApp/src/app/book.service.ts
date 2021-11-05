import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public bookUrl = 'http://localhost:3000/book';
  public getUrl =  'http://localhost:3000/getBookings?date=';
  public getUrl2 = 'http://localhost:3000/seats';
  constructor(public http:HttpClient) { }
  bookTickets(formData : any){
     return this.http.post<any>(this.bookUrl,formData);
  }

  bookingDetails(dateOfJourney : string){
    return this.http.get<any>(this.getUrl+dateOfJourney);
  }
  getSeats(){
    return this.http.get<any>(this.getUrl2);
  }
}

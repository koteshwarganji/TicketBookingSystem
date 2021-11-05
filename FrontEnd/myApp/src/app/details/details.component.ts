import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 
  dateOfJourney : any;
  successMessage : any[] = [];
  errorMessage : string = '';
  details : any[] = [];
  constructor(public bookService:BookService) { }

  ngOnInit(): void {
  }
  bookingDetails(dateOfJourney : string){
    this.dateOfJourney=dateOfJourney;
    // console.log(this.dateOfJourney);
    this.bookService.bookingDetails(dateOfJourney)
                    .subscribe(
                      (success)=>{
                          this.successMessage = success.message;
                          console.log(this.successMessage);
                          this.details = this.successMessage;
                          this.errorMessage = '';
                        },
                      (error)=>{
                           this.errorMessage = error.error.message;
                           this.successMessage = [];
                           this.details = [];
                        }
                    );
  }
}

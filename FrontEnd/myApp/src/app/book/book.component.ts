import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
 
  bookingForm!: FormGroup;
  noOfTickets : number = 180;
  arrayOfSeats : any[][] = [];
  bookingSeats : any[] =[];
  successMessage : string = '';
  errorMessage : string = '';
  alreadyBookedTickets : any[] = [];
  constructor(public formBuilder : FormBuilder,public bookService : BookService) { }

  ngOnInit(): void {

    this.bookingForm = this.formBuilder.group({
      mobile : ['',Validators.required],
      dateOfJourney : ['',Validators.required]
    });

    this.displaySeats(this.noOfTickets);
    this.getSeats();
  }
   displaySeats(noOfTickets : number){
       let i=1;
       while(i<=noOfTickets){
       let sample=[];
       for(let j=1;j<=3;j++){
          sample.push('A'+i);
          i++;
       }
      this.arrayOfSeats.push(sample);
     }
     console.log(this.arrayOfSeats);
   }

   bookSeat(value : string){
    //  let selectedSeat : HTMLElement;
     let selectedSeat = document.getElementById(value) as HTMLElement;
     let seatNumber = selectedSeat.getAttribute('value');
     console.log(seatNumber);
    let isBooked = this.bookingSeats.indexOf(seatNumber);
    console.log(isBooked)
     if(isBooked == -1){
       this.bookingSeats.push(seatNumber);
       selectedSeat.className = 'btn btn-danger col-md-3 col-sm-3 col-xs-3';
     }else{
       this.bookingSeats.splice(isBooked,1);
       selectedSeat.className = 'btn btn-success col-md-3 col-sm-3 col-xs-3';
     }
     console.log(this.bookingSeats);
   }

   bookTickets(){

     if(this.bookingSeats.length<1 || this.bookingSeats.length>6){
        this.successMessage = '';
        this.errorMessage = 'You Should select minimum 1 and maximum 6 tickets';
     }else{
        console.log(this.bookingForm.value,typeof this.bookingForm.value);
        this.bookingForm.value["seats"] = this.bookingSeats;
        console.log(this.bookingForm.value,typeof this.bookingForm.value);
        this.bookService.bookTickets(this.bookingForm.value)
                        .subscribe(
                          (success)=>{
                                     this.successMessage = success.message,
                                     this.errorMessage = '';
                                      console.log(this.successMessage)},
                          (error)=>{
                                     this.errorMessage = error.error.message,
                                     this.successMessage = '';
                                    }
                        );
     }
   }

   getSeats(){
     this.bookService.getSeats()
                     .subscribe(
                       (success)=>{
                        console.log(success.message);
                        this.alreadyBookedTickets = success.message;
                        for(let i=0;i<this.alreadyBookedTickets.length;i++){
                            let seats = this.alreadyBookedTickets[i].seats;
                            for(let j=0;j<seats.length;j++){
                              let seat = document.getElementById(seats[j]) as HTMLElement;
                              console.log(seat)
                              seat?.setAttribute('disabled','true');
                              seat?.setAttribute('class','btn btn-danger col-md-3 col-sm-3 col-xs-3');
                            }
                        } 
                       },
                       (error)=>{
                         console.log(error.error.message);
                       }
                     )
   }
}

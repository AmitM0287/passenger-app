import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private service: PassengerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPassengerDetails();
  }

  // Declare variables
  res: any;
  array: any;
  pageNo = 1;
  numPages = 1;

  // Getting passenger data
  getPassengerDetails() {
    this.array= null;
    this.service.getData(
      this.pageNo
    ).subscribe((response) => {
      this.res = response;
      this.array = this.res.data;
      this.numPages = this.res.num_of_pages;
    },
    (error) => {
      console.log(error);
      this.snackBar.open('Oops! Something went wrong!', '', {duration: 2000});
    });
  }

  // Go to previous page
  prevBtn = false;
  prevPage() {
    if(this.pageNo == 1) {
      this.prevBtn = true;

    } else {
      this.nextBtn = false;
      this.pageNo -= 1;
      this.getPassengerDetails();
    }
  }

  // Go to next page
  nextBtn = false;
  nextPage() {
    if(this.pageNo == this.numPages) {
      this.nextBtn = true;

    } else {
      this.prevBtn = false;
      this.pageNo += 1;
      this.getPassengerDetails();
    }
  }

}

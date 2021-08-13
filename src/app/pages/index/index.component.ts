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
  isDisabled = false;
  res: any;
  array: any;
  pageNo = 1;
  num_pages: any;

  // Getting passenger data
  getPassengerDetails() {
    if (this.pageNo > this.num_pages) {
      this.isDisabled = true;

    } else {
      this.isDisabled = false;
      this.service.getData(
        this.pageNo
      ).subscribe((response) => {
        this.res = response;
        this.array = this.res.data;
        this.num_pages = this.res.num_of_pages;
        console.log(this.num_pages)
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Oops! Something went wrong!', '', {duration: 2000});
      });
    }
  }

  loadMore() {
    this.pageNo += 1;
    this.getPassengerDetails();
  }

}

import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  message="Error occured d"
  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string}) { }

  ngOnInit() {
  }

}

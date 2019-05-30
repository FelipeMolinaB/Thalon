import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  public myClickFunction = function(event) {console.log(event);}
  constructor() { }

  ngOnInit() {
  }

}

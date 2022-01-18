import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth-services/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) { }
  floors=[
    {
      "type" : "Floor 1",
      "identifier" : "kt-floor1-data1"
    },
    {
      "type" : "Floor 2",
      "identifier" : "kt-floor2-data2"
    }
  ]
  // list=[
  //   {
  //     "type" : "Vehicle Speed",
  //     "identifier" : "kt-data"
  //   },
  //   {
  //     "type" : "Engine RPM",
  //     "identifier" : "kt-datarpm"
  //   },
  //   {
  //     "type" : "Angular Gauge",
  //     "identifier" : "new-item"
  //   },
  //   {
  //     "type" : "Battery Gauge",
  //     "identifier" : "batt"
  //   }
  // ]
  
  @Output() selectedDevice = new EventEmitter(); 
  selectedIdentifier = '';
  members=[];
  
  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
        this.selectedDevice.emit(this.floors[0]);
        this.selectedIdentifier = this.floors[0].type;
        this.members=[...this.members,...this.floors.slice(0,10)]
    }   
  }
  
  onScroll(event){
    const tableViewHeight = event.target.offsetHeight; 
    const tableScrollHeight = event.target.scrollHeight; 
    const scrollLocation = event.target.scrollTop; 
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.members=[...this.members,...this.floors.slice(this.members.length,this.members.length+5)]
    }
  }
  onNavClick(device){
    this.selectedIdentifier = device.type;
    this.selectedDevice.emit(device);
  }
}
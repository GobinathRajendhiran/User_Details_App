import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  constructor(private router: Router, private dataService: DataServiceService) { }

  userData: any;
  selectedNavLinkType: string = '';
  selectedNavLinkData: any;
  HobbiesList: any[] = [];
  enableHobbieEditSection: boolean = false;
  hobbyPillInput: any;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUserData')!);
    if(this.userData) {
      this.selectedNavLink('personalDetails');
    } else if(!this.userData) {
      this.router.navigate(['login']);
    }

    console.log(this.userData)
  }

  selectedNavLink(option: any) {
    this.selectedNavLinkData = this.userData[option];
    this.selectedNavLinkType = option;
    console.log(this.selectedNavLinkData)
  }

  editHobbyList() {
    this.HobbiesList = [...this.selectedNavLinkData];
    this.enableHobbieEditSection = true;
  }

  removePills(i: any) {
    console.log(i);
    this.HobbiesList.splice(i, 1)
  }

  addPillsToArray() {
    if(this.hobbyPillInput != '' && !this.HobbiesList.includes(this.hobbyPillInput)) {
      this.HobbiesList.push(this.hobbyPillInput);
      this.hobbyPillInput = '';
    } else if (this.HobbiesList.includes(this.hobbyPillInput)) {
      this.hobbyPillInput = '';
    }
  }

  updateNewHobbiesList() {
    this.dataService.updateHobbiesToDB(this.HobbiesList, this.userData.id).then(ele => {
      this.enableHobbieEditSection = false;

      this.userData.hobbies = this.HobbiesList;
      localStorage.setItem('currentUserData', JSON.stringify(this.userData));

      this.selectedNavLinkData = this.HobbiesList;

      window.scroll(0,0)
      document.getElementById('hobbyUpdateSuccessAlert')!.style.display = 'block';
      setTimeout(() => {
        document.getElementById('hobbyUpdateSuccessAlert')!.style.display = 'none';
      }, 3000);
    }).catch(err => {
      window.scroll(0,0)
      document.getElementById('hobbyUpdateFailureAlert')!.style.display = 'block';
      setTimeout(() => {
        document.getElementById('hobbyUpdateFailureAlert')!.style.display = 'none';
      }, 3000);
    })
  }
}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() fromParent: any;
  @Output() childEvent = new EventEmitter;

  selectedNavLinkType: string = 'personalDetails';

  ngOnInit(): void {
    this.childEvent.emit('personalDetails');
  }

  signoutFromUser() {
    localStorage.clear();
    this.router.navigate(['login']).then(() => window.location.reload());
  }

  selectedNavLink(navTitle: string) {
    this.selectedNavLinkType = navTitle;
    this.childEvent.emit(navTitle);
  }
}

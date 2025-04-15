import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
 visibale:boolean=false
  ToggleDropDown(){
this.visibale=!this.visibale
  }
}

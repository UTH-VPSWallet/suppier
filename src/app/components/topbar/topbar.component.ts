import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  @Input() pageTitle = 'Dashboard';

}

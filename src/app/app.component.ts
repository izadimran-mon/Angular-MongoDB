import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'week10lab';
  section = 0;

  changeSection(sectionId) {
    this.section = sectionId;
  }
}

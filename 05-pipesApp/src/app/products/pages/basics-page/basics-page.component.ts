import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {

  public nameLower: string = 'mauricio';
  public nameUpper: string = 'MAURICIO';
  public fullName: string = 'mAuRiCiO aGuIrrE';

  public customDate: Date = new Date();

}

import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  public setRussianLanguage(): void {
    this.translateService.use('ru');
  }

  public setEnglishLanguage(): void {
    this.translateService.use('en');
  }
}

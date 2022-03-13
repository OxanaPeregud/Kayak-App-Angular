import {Component, OnInit} from '@angular/core';
import {flyIn} from "../animations/app.animation";
import {Rafting} from "../shared/rafting";
import {RaftingService} from "../services/rafting.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyIn]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyIn()
  ]
})
export class HomeComponent implements OnInit {

  public raftingList!: Rafting[];

  constructor(private raftingService: RaftingService) {
  }

  ngOnInit(): void {
    this.raftingService.getRaftingList()
      .subscribe(raftingList => this.raftingList = raftingList);
  }
}

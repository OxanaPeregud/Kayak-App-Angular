import {Component, OnInit} from '@angular/core';
import {visibility} from "../animations/app.animation";
import {Rafting} from "../shared/rafting";
import {RaftingService} from "../services/rafting.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs";
import {Image} from "../shared/image";

@Component({
  selector: 'app-rafting-info',
  templateUrl: './rafting-info.component.html',
  styleUrls: ['./rafting-info.component.scss'],
  animations: [
    visibility()
  ],
})
export class RaftingInfoComponent implements OnInit {

  public rafting!: Rafting;
  public previousRaftingId!: string;
  public nextRaftingId!: string;
  public visibility = 'shown';
  private raftingIds!: string[];
  private nextImageId!: string;
  private previousImageId!: string;
  private raftingImages: Image[] = [];
  private imagesIds!: string[];
  private imageId: string = '1';
  private interval!: number;

  constructor(public raftingService: RaftingService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRaftingInfo();
    this.triggerNextImage();
  }

  public setNextImage(): void {
    this.imageId = this.nextImageId;
    this.setPreviousAndNextImage();
  }

  public setPreviousImage(): void {
    this.imageId = this.previousImageId;
    this.setPreviousAndNextImage();
  }

  public triggerNextImage(): void {
    this.interval = setInterval(() => {
      this.setNextImage();
    }, 2500);
  }

  public clearInterval(): void {
    clearInterval(this.interval);
  }

  private getRaftingInfo(): void {
    this.raftingService.getRaftingIds()
      .subscribe((raftingIds) => this.raftingIds = raftingIds);
    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.raftingService.getRaftingByIdWithDelay(params['id']);
    }))
      .subscribe(rafting => {
        this.visibility = 'shown';
        this.rafting = rafting;
        this.setPreviousAndNextRafting(rafting.id);
        this.getRaftingImages(rafting.id);
      });
  }

  private setPreviousAndNextRafting(raftingId: string): void {
    const index: number = this.raftingIds?.indexOf(raftingId);
    this.previousRaftingId = this.raftingIds[(this.raftingIds.length + index - 1) % this.raftingIds.length];
    this.nextRaftingId = this.raftingIds[(this.raftingIds.length + index + 1) % this.raftingIds.length];
  }

  private getRaftingImages(raftingId: string): void {
    this.raftingService.getRaftingImages(raftingId).subscribe(data => {
      this.raftingImages = data;
      this.imagesIds = this.raftingImages.map(rafting => rafting.id);
      this.setPreviousAndNextImage();
    });
  }

  private setPreviousAndNextImage(): void {
    const index: number = this.imagesIds?.indexOf(this.imageId);
    this.previousImageId = this.imagesIds[(this.imagesIds.length + index - 1) % this.imagesIds.length];
    this.nextImageId = this.imagesIds[(this.imagesIds.length + index + 1) % this.imagesIds.length];
    this.raftingService.currentImage = this.raftingImages.filter(image => image.id == this.imageId)[0];
  }
}

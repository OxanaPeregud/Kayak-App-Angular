import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from "rxjs";
import {Rafting} from "../shared/rafting";
import {RAFTING_LIST} from "../shared/rafting-list";
import {Image} from "../shared/image";

@Injectable({
  providedIn: 'root'
})
export class RaftingService {

  public currentImage!: Image;

  constructor() {
  }

  public getRaftingList(): Observable<Rafting[]> {
    return of(RAFTING_LIST);
  }

  public getRaftingById(id: string): Observable<Rafting> {
    return of(RAFTING_LIST.filter(rafting => rafting.id === id)[0]);
  }

  public getRaftingByIdWithDelay(id: string): Observable<Rafting> {
    return this.getRaftingById(id)
      .pipe(
        delay(500)
      );
  }

  public getRaftingIds(): Observable<string[]> {
    return this.getRaftingList().pipe(map(raftingList => raftingList.map(rafting => rafting.id)));
  }

  public getRaftingImages(raftingId: string): Observable<Image[]> {
    return this.getRaftingById(raftingId).pipe(map(raftingList => raftingList.image));
  }
}

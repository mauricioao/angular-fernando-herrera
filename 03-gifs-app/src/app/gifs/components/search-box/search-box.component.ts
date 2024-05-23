import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
      >
      <!-- (keyup.enter)="searchTag(txtTagInput.value)" -->
  `
})

export class SearchComponent {

  @ViewChild("txtTagInput")
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  // searchTag(newTag: string){
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    // console.log({newTag, gifs: this.gifsService.tagsHistory});
    this.gifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = "";
  }
}

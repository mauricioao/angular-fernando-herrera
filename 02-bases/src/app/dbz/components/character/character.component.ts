import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
    selector: 'dbz-add-character',
    templateUrl: './character.component.html',
    styleUrl: './character.component.scss',
})
export class CharacterComponent {

  @Output("CualquierRenombrado")
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '',
    power: 0,
  }

  emitCharacter():void {
    // debugger;
    // console.log(this.character);
    if(this.character.name.length === 0) return;
    // this.onNewCharacter.emit({...this.character});
    this.onNewCharacter.emit(this.character);
    this.character= {name:"", power: 0};
  }

}

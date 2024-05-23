import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class DbzService {


  public characters: Character[] = [
    {
      id: uuid(),
      name: "Krilin",
      power: 1000,
    },
    {
      id: uuid(),
      name: "Gokú",
      power: 9000
    },
    {
      id: uuid(),
      name: "Vegeta",
      power: 7500
    }
  ];

  addCharacter(character: Character): void {
    // console.log('Main Page');
    // console.log(character);
    const newCharacter: Character = {
      id: uuid(),
      ...character
    }
    this.characters.push(newCharacter);
  }

  // onDeleteCharacter(index: number) {
  //   this.characters.splice(index, 1)
  // }

  onDeleteCharacterById(id: string) {
    this.characters = this.characters.filter(c=>c.id != id)
  }

  constructor() { }

}

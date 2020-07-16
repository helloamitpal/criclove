import { Injectable } from '@angular/core';

export class Player {
  constructor(
    public id: number,
    public code: string,
    public name: string,
    public created: Date
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class PlayerAdapter {
  adapt(item: any): Player {
    return new Player(item.id, item.code, item.name, new Date(item.created));
  }
}

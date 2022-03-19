import { Cursor, Position } from '~/index';

interface IEntity {
  element: HTMLElement,
}

interface Transforms {
  rotate: number,
  scale: number
}

export abstract class Entity implements IEntity {

  element: HTMLElement;
  cursor: Cursor;

  protected position: Position = {
    x: 0,
    y: 0,
  };

  private transforms: Transforms = {
    rotate: 45,
    scale: 1,
  }

  _size: number = 0;

  constructor(cursor: Cursor) {

    this.cursor = cursor;

    this.element = document.createElement('span');

    this.element.addEventListener('position', () => {
      this.pos = cursor.position
    })

  }

  set size(value: number,) {
    this.element.style.setProperty('--size', `${ value }px`); this._size = value;
  }

  set pos(pos: Position) {
    this.position = pos; this.updateProperty()
  }

  set scale(value: Transforms['scale']) {
    this.transforms.scale = value; this.updateProperty();
  }

  get pos(): Position {
    return {
      x: this.position.x - this.anchor,
      y: this.position.y - this.anchor,
    }
  }


  abstract get anchor(): number;

  updateProperty() {
    this.element.style.setProperty('--y', `${ this.pos.y }px`);
    this.element.style.setProperty('--x', `${ this.pos.x }px`);
    this.element.style.setProperty('--s', String(this.transforms.scale))
  }

}
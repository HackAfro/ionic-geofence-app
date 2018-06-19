import { Component, Input } from '@angular/core';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html',
})
export class MapComponent {
  text: string;

  constructor() {}

  @Input()
  center = {
    lat: 6.435838,
    lng: 3.451384,
  };
  @Input() zoom = 15;
  radiusCenter = {
    lat: 6.435838,
    lng: 3.451384,
  }
}

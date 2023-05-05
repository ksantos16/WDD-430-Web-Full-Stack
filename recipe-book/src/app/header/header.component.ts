import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})



export class HeaderComponent {
 @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelect(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }

}

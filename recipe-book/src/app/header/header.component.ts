import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})


export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onfetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}

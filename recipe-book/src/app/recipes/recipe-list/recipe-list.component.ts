import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test',
    'https://2.bp.blogspot.com/-1j8L6E-iRxo/WABoajHGrZI/AAAAAAAAFso/JhWbpN3O2HooD8wlQDhllVhzo8VAu4AtgCLcB/s1600/20161011_120527.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test',
    'https://2.bp.blogspot.com/-1j8L6E-iRxo/WABoajHGrZI/AAAAAAAAFso/JhWbpN3O2HooD8wlQDhllVhzo8VAu4AtgCLcB/s1600/20161011_120527.jpg'),


  ];

  constructor() {

  }

  // ngOnInit() {

  // }

}

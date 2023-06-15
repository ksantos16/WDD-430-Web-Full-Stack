import { Injectable } from '@angular/core';
import { Recipe } from "./recipe-list/recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test',
  //   'https://2.bp.blogspot.com/-1j8L6E-iRxo/WABoajHGrZI/AAAAAAAAFso/JhWbpN3O2HooD8wlQDhllVhzo8VAu4AtgCLcB/s1600/20161011_120527.jpg',
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('French Fries', 20)
  //   ]),
  //   new Recipe('Another Test Recipe', 'This is simply a test',
  //   'https://2.bp.blogspot.com/-1j8L6E-iRxo/WABoajHGrZI/AAAAAAAAFso/JhWbpN3O2HooD8wlQDhllVhzo8VAu4AtgCLcB/s1600/20161011_120527.jpg',
  //   [
  //     new Ingredient('Buns', 2),
  //     new Ingredient('Meat', 1)
  //   ]),
  // ];

  private recipes: Recipe[] = [];

  constructor (private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  // getRecipe(index:number) {
    //this will return a copy
  //   return this.recipes.slice()[index];
  // }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}

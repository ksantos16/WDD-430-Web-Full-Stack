import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe []>{

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipes();

    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }

  }
}

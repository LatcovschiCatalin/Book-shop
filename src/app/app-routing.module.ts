import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/books/books.module').then(m => m.BooksModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}


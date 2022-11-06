import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewDetailsComponent} from "./view-details.component";


const routes: Routes = [
  {path: 'details/:id', component: ViewDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDetailsRoutingModule {
}

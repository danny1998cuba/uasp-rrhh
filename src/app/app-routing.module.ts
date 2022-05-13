import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';

const routes: Routes = [
  {
    path:'',
    component:SkeletonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

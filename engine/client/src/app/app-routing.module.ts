import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchScreenComponent } from './launch/menu/screen/screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'launch', pathMatch: 'full' },
  { path: 'launch', component: LaunchScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

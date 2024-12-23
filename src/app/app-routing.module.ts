import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSupervisorComponent } from './Add-Supervisor/Add-Supervisor.component';
import { AnotherFormComponent } from './another-form/another-form.component';
import { DistDivisionComponent } from './dist-division/dist-division.component';
import { ElectionComponent } from './election/election.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'Add-Supervisor',pathMatch:'full'},
  {path:'dist-division',component:DistDivisionComponent},
  {path:'another-form',component:AnotherFormComponent},
  {path:'election',component:ElectionComponent},
  {path:'Add-Supervisor',component:AddSupervisorComponent},
  {path:'**',component:PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

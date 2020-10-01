import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './views/overview/overview.component';
import { TimelineComponent } from './views/timeline/timeline.component';
import { PortfolioComponent } from './views/portfolio/portfolio.component';
import { DocumentationComponent } from './views/documentation/documentation.component';


const routes: Routes = [
  {path: '' , component: OverviewComponent},
  {path: 'overview' , component: OverviewComponent},
  {path: 'timeline' , component: TimelineComponent},
  {path: 'documentation' , component: DocumentationComponent},
  {path: 'portfolio' , component: PortfolioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

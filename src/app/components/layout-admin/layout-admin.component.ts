import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoashboardComponent } from '../../pages/admin/doashboard/doashboard.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterModule,DoashboardComponent],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss',
})
export class LayoutAdminComponent {}

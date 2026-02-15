import { Routes } from '@angular/router';
import { Dashboard } from './features/clm/dashboard/dashboard';
import { AgreementWizard } from './features/clm/agreement-wizard/agreement-wizard';
import { CreateContract } from './features/create-contract/create-contract';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'create', component: CreateContract }
];

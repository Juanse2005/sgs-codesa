import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: '',
        children: [
            {
                path: '',
                // loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
            }
        ]
    }
];

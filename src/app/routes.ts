import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'chatbot', component: ChatbotComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

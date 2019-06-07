import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoListResolver } from './_resolvers/video-list.resolver';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { VideoDetailResolver } from './_resolvers/video-detail.resolver';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'chatbot', component: ChatbotComponent },
            { path: 'videos', component: VideoListComponent,
                resolve: {videos: VideoListResolver} },
            { path: 'videos/:id', component: VideoDetailComponent,
                resolve: {video: VideoDetailResolver}}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

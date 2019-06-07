import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { VideosService } from './_services/videos.service';
import { VideoListResolver } from './_resolvers/video-list.resolver';
import { VideoDetailResolver } from './_resolvers/video-detail.resolver';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoCardComponent } from './videos/video-card/video-card.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { ChatbotComponent } from './chatbot/chatbot.component';



export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      VideoCardComponent,
      VideoListComponent,
      VideoDetailComponent,
      ChatbotComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      VideosService,
      VideoListResolver,
      VideoDetailResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

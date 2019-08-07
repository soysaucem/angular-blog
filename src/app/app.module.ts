import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PagnitionComponent } from './components/pagnition/pagnition.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostDetailComponent,
    CommentsComponent,
    NavigationBarComponent,
    SearchBoxComponent,
    NewPostComponent,
    PagnitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AmplifyAngularModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

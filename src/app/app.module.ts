import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostDetailComponent,
    CommentsComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

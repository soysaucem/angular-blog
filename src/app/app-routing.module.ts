import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsComponent } from './components/posts/posts.component';
import { NewPostComponent } from './components/new-post/new-post.component';


const routes: Routes = [
  {path: 'content/:id', component: PostDetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PostsComponent},
  {path: 'new-post', component: NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit,OnDestroy } from '@angular/core';
import { IPost } from '../post-modal/post';
import { PostsService } from '../PostService/posts.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  posts:IPost[]=[];
  post$:Observable<IPost[]>
  postsub$:Subscription;
  constructor(public postservice:PostsService) { }

  ngOnInit()
  {
   this.posts=this.postservice.getPost()
   this.postsub$=this.postservice.getUpdatedPosts().subscribe((posts:IPost[])=>{
    this.posts=posts;
  });
}
  ngOnDestroy()
  {
      this.postsub$.unsubscribe()
  }

}

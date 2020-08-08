import { Component, OnInit,OnDestroy } from '@angular/core';
import { IPost } from '../post-modal/post';
import { PostsService } from '../PostService/posts.service';
import { Observable, Subscription } from 'rxjs';
import {PageEvent} from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  pageSizeOptions=[1,2,5,10];
  postPerPage=2;
  totalPost=0;
  posts:IPost[]=[];
  isLoading=false;
  currentPage=1;
  post$:Observable<IPost[]>
  postsub$:Subscription;
  private authservicesub$:Subscription;
  isauthenticate=false;
  constructor(public postservice:PostsService,public authservice:AuthService) { }

  ngOnInit()
  {
    console.log(`in ngOninit`)
    this.postservice.getPost(this.postPerPage,this.currentPage)
   this.postsub$=this.postservice.getUpdatedPosts().subscribe((postData: {posts:IPost[],postcount:number})=>{
    this.isLoading=false;
    this.totalPost=postData.postcount;
    this.posts=postData.posts;
  });
  this.isauthenticate=this.authservice.getIsauthenticated();
   this.authservicesub$=this.authservice.getAuthStatusListener().subscribe(isauthenticated=>
    {
        this.isauthenticate=isauthenticated
    });
}
onChangedPage(pageData:PageEvent)
{
    this.currentPage=pageData.pageIndex+1;
    this.postPerPage=pageData.pageSize;
    this.postservice.getPost(this.postPerPage,this.currentPage);
}
  ngOnDestroy()
  {
      this.postsub$.unsubscribe()
      this.authservicesub$.unsubscribe()
  }
  onDelete(id:string)
  {
    console.log(id);
    this.isLoading=true;
    this.postservice.deletePost(id).subscribe(()=>{
      this.postservice.getPost(this.postPerPage,this.currentPage)
    })
  }

}

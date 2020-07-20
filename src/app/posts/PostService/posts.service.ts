import { Injectable } from '@angular/core';
import { IPost } from '../post-modal/post';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private updatedPost=new Subject<IPost[]>();

  private posts:IPost[]=[];
  constructor(private httpclient:HttpClient) { }

  getPost()
  {
        this.httpclient.get<{message:string,posts:IPost[]}>('http://localhost:3000/api/posts')
        .subscribe(postdata=>
          {
              this.posts=postdata.posts
              console.log(this.posts);
              this.updatedPost.next([...this.posts]);
          })
  }
  getUpdatedPosts()
  {
    return this.updatedPost.asObservable();
  }
  addPost(title:string,content:string)
  {
    const post:IPost={id:null,title:title,content:content};
    console.log("dddd post"+post);
    this.httpclient.post<{message:string}>('http://localhost:3000/api/posts',post)
    .subscribe((responsedata)=>
      {
            console.log(responsedata.message)
            this.posts.push(post)
            this.updatedPost.next([...this.posts]);
      })

  }
}

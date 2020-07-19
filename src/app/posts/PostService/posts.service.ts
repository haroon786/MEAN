import { Injectable } from '@angular/core';
import { IPost } from '../post-modal/post';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private updatedPost=new Subject<IPost[]>();

  private posts:IPost[]=[];
  constructor() { }

  getPost()
  {
    return this.posts
  }
  getUpdatedPosts()
  {
    return this.updatedPost.asObservable();
  }
  addPost(title:string,content:string)
  {
    const post:IPost={title:title,content:content};
    this.posts.push(post)
    this.updatedPost.next([...this.posts]);
  }
}

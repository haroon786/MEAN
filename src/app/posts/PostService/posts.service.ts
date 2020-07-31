import { Injectable } from "@angular/core";
import { IPost } from "../post-modal/post";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {Router} from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private updatedPost = new Subject<IPost[]>();

  private posts: IPost[] = [];
  constructor(private httpclient: HttpClient,private route:Router) {}

getSinglePost(postId:string)
  {
       return  this.httpclient.get<{_id:string;title:string;content:string}>
                ("http://localhost:3000/api/posts/" + postId);
  }
  getPost() {
    this.httpclient
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map((postdata) => {
          return postdata.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath:post.imagePath
            };
          });
        })
      )
      .subscribe((tranformdata) => {
        this.posts = tranformdata;
        console.log(this.posts);
        this.updatedPost.next([...this.posts]);
      });
  }
  getUpdatedPosts() {
    return this.updatedPost.asObservable();
  }
  addPost(title: string, content: string,image:File) {
    // const post: IPost = { id: null, title: title, content: content };
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image,title)
    console.log("dddd post" + postData);
    this.httpclient
      .post<{ message: string; post: IPost }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe((responsedata) => {
        console.log(responsedata.message);
        const post:IPost={id:responsedata.post.id,title:title,content:content,imagePath:responsedata.post.imagePath}
        this.posts.push(post);
        this.updatedPost.next([...this.posts]);
        this.route.navigate(["/"])
      });
  }
  deletePost(id: string) {
    console.log(id);
    this.httpclient
      .delete("http://localhost:3000/api/posts/" + id)
      .subscribe((postdata) => {
        const updatedpost = this.posts.filter((e) => e.id !== id);
        this.posts = updatedpost;
        this.updatedPost.next([...this.posts]);
      });
  }
  updatePost(id:string,title:string,content:string)
  {
      const post:IPost={id:id,title:title,content:content,imagePath:null};
      console.log(post);
      this.httpclient.put("http://localhost:3000/api/posts/"+id,post)
      .subscribe(response=>
        {
          const updatedPosts = [...this.posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.updatedPost.next([...this.posts]);
          this.route.navigate(["/"]);
        })

  }

}

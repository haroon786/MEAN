import { Injectable } from "@angular/core";
import { IPost } from "../post-modal/post";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private updatedPost = new Subject<{posts:IPost[],postcount:number}>();

  private posts: IPost[] = [];
  constructor(private httpclient: HttpClient, private route: Router) {}

  getSinglePost(postId: string) {
    return this.httpclient.get<{ _id: string; title: string; content: string;imagePath:string,creator:string}>(
      "http://localhost:3000/api/posts/" + postId
    );
  }
  getPost(postsPerPage:number,currentPage:number) {
    const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;
    this.httpclient
      .get<{ message: string; posts: any;maxPosts:number }>("http://localhost:3000/api/posts"+ queryParams)
      .pipe(
        map((postdata) => {
          return {post:postdata.posts.map(post=> {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator:post.creator

            };
          }),
          maxPosts:postdata.maxPosts}
        })
      )
      .subscribe((tranformdatapostData) => {
        this.posts = tranformdatapostData.post;
        console.log(this.posts);
        this.updatedPost.next({posts:[...this.posts],postcount:tranformdatapostData.maxPosts});
      });
  }
  getUpdatedPosts() {
    return this.updatedPost.asObservable();
  }
  addPost(title: string, content: string, image: File) {
    // const post: IPost = { id: null, title: title, content: content };
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    console.log("dddd post" + postData);
    this.httpclient.post<{ message: string; post: IPost }>("http://localhost:3000/api/posts",postData)
      .subscribe((responsedata) => {

        console.log(responsedata);

        this.route.navigate(["/"]);
      });
  }
  deletePost(id: string) {
    console.log(id);
   return this.httpclient
      .delete("http://localhost:3000/api/posts/" + id)

  }
  updatePost(id: string, title: string, content: string, image: File | string) {
    let postdata: IPost | FormData;
    if(typeof image==="object")
    {
      postdata=new FormData();
      postdata.append("id",id);
      postdata.append("title",title);
      postdata.append("content",content);
      postdata.append("image",image,title);
    }
    else
    {
      postdata=
      {
        id:id,
        title:title,
        content:content,
        imagePath:image,
        creator:null
      };
    }

    this.httpclient
      .put("http://localhost:3000/api/posts/" + id, postdata)
      .subscribe((response) => {

        this.route.navigate(["/"]);
      });
  }
}

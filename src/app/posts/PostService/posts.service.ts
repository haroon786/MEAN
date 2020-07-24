import { Injectable } from '@angular/core';
import { IPost } from '../post-modal/post';
import { Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private updatedPost=new Subject<IPost[]>();

  private posts:IPost[]=[];
  constructor(private httpclient:HttpClient) { }

  getPost()
  {
        this.httpclient.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
        .pipe(map((postdata)=> {
         return postdata.posts.map(post=>{
            return{
                    title:post.title,
                    content:post.content,
                    id:post._id
                  }
             }

            )
        }
        ))
        .subscribe(tranformdata=>
          {
              this.posts=tranformdata
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
    this.httpclient.post<{message:string,postId:string}>('http://localhost:3000/api/posts',post)
    .subscribe((responsedata)=>
      {
            console.log(responsedata.message)
            const postId=responsedata.postId;
            post.id=postId;
            this.posts.push(post)
            this.updatedPost.next([...this.posts]);
      })

  }
  deletePost(id:string)
  {
    console.log(id);
    this.httpclient.delete("http://localhost:3000/api/posts/"+id)
    .subscribe((postdata)=>
    {
        const updatedpost=this.posts.filter(e=>e.id!==id)
        this.posts=updatedpost;
        this.updatedPost.next([...this.posts]);
    })
  }
}

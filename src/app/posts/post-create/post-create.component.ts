import {Component,EventEmitter,Output, OnInit} from '@angular/core';
import { IPost } from '../post-modal/post';
import { NgForm } from '@angular/forms';
import { PostsService } from '../PostService/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit
{
    enteredTitle="";
    enteredContent="";
     postcreated:any;
     private mode='create';
     private postId:string;
     post:IPost;
     isLoading=false;

  constructor(private postservice:PostsService,private route:ActivatedRoute)
  {
    console.log(`post  create constructor`)
  }

  ngOnInit()
  {
    this.route.paramMap.subscribe((parammap:ParamMap)=>
    {
      if(parammap.has('postId'))
        {
          this.mode='edit';
          this.postId=parammap.get('postId');
          this.isLoading=true
          this.postservice.getSinglePost(this.postId).subscribe(postdata=>
            {
              this.isLoading=false
              this.post={id:postdata._id,title:postdata.title,content:postdata.content}
            })
        }
        else
        {
             this.mode='create';
             this.postId=null
        }
    })

  }

  onSavePost(form:NgForm)
    {
            if(this.mode=="create")
            {
            console.log(form.value.title,form.value.content)
          this.postservice.addPost(form.value.title,form.value.content)
          form.reset();
            }
            else
            {
                this.postservice.updatePost(this.postId,form.value.title,form.value.content)
            }

    }

}

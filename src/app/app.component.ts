import { Component } from '@angular/core';
import { IPost } from './posts/post-modal/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN';
  // storedPost:IPost[]=[];

  // onPostAdded(post)
  // {
  //   this.storedPost.push(post);
  // }
}

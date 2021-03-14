import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$?: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsServie: PostsService
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(switchMap((params: Params) => {
      return this.postsServie.getById(params['id']);
    }))
  }

}

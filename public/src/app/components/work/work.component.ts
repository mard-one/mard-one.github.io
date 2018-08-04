import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassMethod } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, OnDestroy {
  index;
  private wheelEvent;
  private timer;
  constructor() {
    this.wheelEvent = (e) => {
      e.preventDefault();
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        if (e.wheelDeltaY < 0) {
          if (this.index < 1) {
            // transform up
            document
              .querySelector('[data-list-index="' + this.index + '"]')
              .classList.remove('active');
            this.index++;
            document
              .querySelector('[data-list-index="' + this.index + '"]')
              .classList.add('active');
            document.getElementById('project_detail').style.transform = `translate3d(0px, -${this.index * 100}%, 0px)`;
          }
        } else {
          if (this.index > 0) {
            // transform down
            document
              .querySelector('[data-list-index="' + this.index + '"]')
              .classList.remove('active');
            this.index--;
            document
              .querySelector('[data-list-index="' + this.index + '"]')
              .classList.add('active');
            document.getElementById('project_detail').style.transform = `translate3d(0px, -${this.index * 100}%, 0px)`;
          }
        }
      }, 100);
    };
  }

  ngOnInit() {
    const specificProject = document.querySelector('.specific_project.active');
    this.index = parseInt(
      specificProject.getAttribute('data-detail-index'),
      10
    );

    window.addEventListener('wheel', this.wheelEvent);
    console.log('created');
  }
  ngOnDestroy() {
    window.removeEventListener('wheel', this.wheelEvent);
    console.log('destroyed');
  }

  selected(project) {
    document.querySelector('.project_link.active').classList.remove('active');
    project.classList.add('active');
    this.index = project.getAttribute('data-list-index');
    document.getElementById(
      'project_detail'
    ).style.transform = `translate3d(0px, -${this.index * 100}%, 0px)`;
  }
}

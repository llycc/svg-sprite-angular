import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-use-svg',
  templateUrl: './use-svg.component.html',
  styleUrls: ['./use-svg.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseSvgComponent implements OnInit {
  @Input()name: string;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

class Statement {
  title = '';
  sommary = '';
  mdFilename = '';
}


@Component({
  selector: 'app-statements-page',
  templateUrl: './statements-page.component.html',
  styleUrls: ['./statements-page.component.scss']
})
export class StatementsPageComponent implements OnInit {

  statements: Array<Statement> = [
    { title: 'Bowling Game Scoring',
      // tslint:disable-next-line:max-line-length
      sommary: 'Create a program, which, given a valid sequence of rolls for one line of American Ten-Pin Bowling, produces the total score for the game.',
      mdFilename: 'bowling' },
    { title: 'Pizza Factory',
      sommary: 'Create a program which which acts as a pizzeria, so that given an order from a customer, pizzas are made for delivery.',
      mdFilename: 'pizza-factory' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

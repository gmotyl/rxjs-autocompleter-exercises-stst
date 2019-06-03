import { names, getNames } from './data'
import * as dom from './dom'

import { Observable, Observer, fromEvent } from 'rxjs'
// import { of } from 'rxjs'; 
import { map, filter } from 'rxjs/operators';

const phrase$ = fromEvent(dom.$input, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value),
)
const searchResults$ = phrase$.pipe(
  filter(phrase => phrase.length > 2),
  map(getNames),
  map(results => results.slice(0, 10))
);

searchResults$.subscribe(dom.renderList);

const searchClear$ = phrase$.pipe(
  filter(phrase => phrase.length <= 2)
)

searchClear$.subscribe(dom.clearList);
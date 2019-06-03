import { names, getNames } from './data'
import * as dom from './dom'

import { Observable, Observer, fromEvent } from 'rxjs'
// import { of } from 'rxjs'; 
import { map, filter } from 'rxjs/operators';

const searchResults$ = fromEvent(dom.$input, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value),
  filter(phrase => phrase.length > 2),
  map(getNames),
  map(results => results.slice(0, 10))
);

searchResults$.subscribe(dom.renderList);
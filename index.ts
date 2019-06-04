import { names, getNames } from './data'
import * as dom from './dom'

import { Observable, Observer, fromEvent, merge } from 'rxjs'
// import { of } from 'rxjs'; 
import { map, filter, tap, share, distinctUntilChanged } from 'rxjs/operators';

import { employees$ } from './model'

employees$.subscribe(console.log)
employees$.subscribe(console.log)

const phrase$ = fromEvent(dom.$input, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value),
  distinctUntilChanged(),
  tap(console.log),
  share(),
)
const searchResults$ = phrase$.pipe(
  filter(phrase => phrase.length > 2),
  map(getNames),
  map(results => results.slice(0, 10)),
  tap(dom.renderList),
);

// searchResults$.subscribe(dom.renderList);

const searchClear$ = phrase$.pipe(
  filter(phrase => phrase.length <= 2),
  tap(dom.clearList),
)

const autocomplete$ = merge(
  searchResults$, 
  searchClear$
)

autocomplete$.subscribe();

// searchClear$.subscribe(dom.clearList);
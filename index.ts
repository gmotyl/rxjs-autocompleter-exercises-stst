import { names, getNames } from './data'
import * as dom from './dom'

import { Observable, Observer, fromEvent } from 'rxjs'
// import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';

const searchResults$ = fromEvent(dom.$input, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value),
  map(getNames),
);

searchResults$.subscribe(dom.renderList);
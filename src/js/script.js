'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import timer from './modules/timer';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {

   tabs();
   modal();
   timer('.timer', '2022-06-11');
   cards();
   slider();
   forms();
   calc();
   
});
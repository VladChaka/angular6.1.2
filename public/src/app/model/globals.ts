'use strict';

export const role: string = localStorage['admin'] || sessionStorage['admin'];
export const token: string = localStorage['token'] || sessionStorage['token'];
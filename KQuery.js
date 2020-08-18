// 'use strict';
var KKeys = ['init', 'on', 'load', 'addClass', 'removeClass', 'siblings', 'each'];
class KQuery {
  constructor(selector) {
    const selectorKey = selector.split('')[0];
    switch (true) {
      case selector.includes('>'):
        this.KElement = this.#querySelector(selector);
        break;
      case selectorKey === '.':
        this.KElement = this.#getElementsByClassName(selector.slice(1));
        break;
      case selectorKey === '#':
        this.KElement = this.#getElementById(selector.slice(1));
        break;
      default:
        if (this.#getElementsByTagName(selector)) this.KElement = this.#getElementsByTagName(selector);
        else console.error('wrong element');
        break;
    }
    this.init(this.KElement);
    if (this.KElement.length) {
      for (const el of this.KElement) {
        this.init(el);
      }
    }
  }

  on(eventName, callback) {
    if (this.length) {
      for (const el of this) {
        el.addEventListener(eventName, callback);
      }
    } else {
      this.addEventListener(eventName, callback.bind(null, this));
    }
  }
  load(filePath) {
    return fetch(filePath)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        this[0].insertAdjacentHTML('beforeend', html);
      });
  }
  addClass(className) {
    this.init(this.addClass);
    this.classList.add(className);
    return this;
  }
  removeClass(className) {
    if (this.length) {
      for (const el of this) {
        el.classList.remove(className);
      }
    } else {
      this.classList.remove(className);
    }
  }
  siblings() {
    const children = [...this.parentElement.children];
    const siblings = children.filter((child) => child !== this);
    this.init(siblings);
    return siblings;
  }
  each(element, callback) {
    console.log('this', this);
    if (this.length) {
      for (const el of this) {
        if (el.localName === element) {
          this.init(el);
          callback(el);
        }
      }
    }
  }
  /* Init Function */
  init(el) {
    for (const key of KKeys) {
      el.__proto__[key] = this[key];
    }
  }

  #getElementById(selector) {
    return document.getElementById(selector);
  }
  #getElementsByClassName(selector) {
    return document.getElementsByClassName(selector);
  }
  #getElementsByTagName(selector) {
    return document.getElementsByTagName(selector);
  }
  #querySelector(selector) {
    return document.querySelectorAll(selector);
  }
}
var $ = (selector) => {
  return new KQuery(selector).KElement;
};

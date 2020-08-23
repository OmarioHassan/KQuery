var KKeys = ['init', 'on', 'load', 'addClass', 'removeClass', 'siblings', 'each'];
class KQuery {
  constructor(selector) {
    this.KElement = document.querySelectorAll(selector);
    var arr = [];
    for (var i = this.KElement.length; i--; arr.unshift(this.KElement[i]));
    this.KElement = arr;
    this.init(this.KElement);
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
    if (this.length) {
      for (const el of this) {
        el.classList.add(className);
      }
    } else {
      this.classList.add(className);
    }
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
}
var $ = (selector) => {
  return new KQuery(selector).KElement;
};

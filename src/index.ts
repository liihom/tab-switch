/**
 * tab switch
 * attention: [data-role="tabSwitch"] > [data-tab-scroll] > [data-role="tab"] > tabs
 */

const delegateFn = function(elFilter: (elem: HTMLElement) => boolean, listener: any) {
  return function (e: any) {
    const el = e.target;
    do {
      if (!elFilter(el)) continue;
      e.delegateTarget = el;
      listener.apply(el, arguments);
      return;
    } while( (el == el.parentNode) );
  };
};

export default class TabSwitch {
  switchEls: NodeListOf<HTMLElement>;
  tabScrollClass: string;
  tabsClass: string;
  tabItemClass: string;

  constructor() {
    this.tabScrollClass = '[data-tab-scroll]';
    this.tabsClass =  '[data-role="tab"]';
    this.tabItemClass = '.item';
    window.onload = this.init.bind(this);
  }

  init() {
    this.switchEls = document.querySelectorAll('[data-role="tabSwitch"]');
    if (this.switchEls && this.switchEls.length) {
      this.initTabClickListener();
    } else {
      console.warn('[TabSwitch warning]: cannot find the trigger element');
    }
  }

  getSiblings(currentNode: Element): Array<Element> {
    const siblings = []; // siblings nodes
    const elseLi = currentNode.parentNode.children;
    for (let i = 0, elseLil = elseLi.length; i < elseLil; i++) {
      if (elseLi[i] !== currentNode) {
        siblings.push(elseLi[i]);
      }
    }
    return siblings;
  }

  tabFilter(elem: HTMLElement): boolean {
    return elem.classList && elem.classList.contains('item');
  };

  changeTab(param: {
    activeIndex?: number;
    $tab?: HTMLElement;
    $switchEl: HTMLElement;
  }) {
    const {
      activeIndex,
      $tab,
      $switchEl,
    } = param;

    if (!$switchEl) { return; }

    const $tabsEl = $switchEl.querySelector(this.tabsClass);
    let $activeTab: HTMLElement;

    if (activeIndex && activeIndex < 0) {
      return;
    }

    if ($tab) {
      $activeTab = $tab;
    } else {
      if (activeIndex && activeIndex < 0) {
        return;
      }
      const $tabsNodeList = $tabsEl.querySelectorAll(this.tabItemClass);
      $activeTab = <HTMLElement>$tabsNodeList[activeIndex];
    }

    const siblingsEl = this.getSiblings($activeTab);
    const curIndex = [].indexOf.call($tabsEl, $activeTab);
    $activeTab.classList.add('activate');
    this.setTabPosition({
      curIndex,
      $switchTabItem: $activeTab,
    });

    siblingsEl.forEach(elem => {
      elem.classList.remove('activate');
    });
  }

  /**
   * tab item click
  */
  tabClickHandler(e: any) {
    const button = e.delegateTarget;
    this.changeTab({
      $tab: button,
      $switchEl: button.closest('[data-role="tabSwitch"]'),
    });
  };

  /**
   * 为标签父元素添加点击事件
   */
  initTabClickListener() {
    this.switchEls && this.switchEls.forEach((elem) => {
      const _self = this;
      elem.addEventListener('click', delegateFn(_self.tabFilter, _self.tabClickHandler.bind(_self)));

      const switchIndex = elem.dataset.tabActive;
      const activeIndex = +switchIndex || 1;
      const changeTabIndex = activeIndex - 1;
      this.changeTab({
        activeIndex: changeTabIndex,
        $switchEl: elem,
      });
    });
  }

  setTabPosition({
    curIndex,
    $switchTabItem,
  }: {
    curIndex: number,
    $switchTabItem: HTMLElement,
  }) {
    const $tabScrollEl = <HTMLElement>$switchTabItem.closest(this.tabScrollClass);
    const $tabsEl = $switchTabItem.parentElement;
    const tabItemNum = $tabsEl.children.length;
    const tabItemWidth = $switchTabItem.offsetWidth;

    if (tabItemNum > curIndex) {
      let scrollLeft = 0;
      let tabScrollWidth = 0;

      const tabOffsetLeft = $switchTabItem.offsetLeft;
      tabScrollWidth = $tabScrollEl.offsetWidth;
      scrollLeft = Math.ceil(tabOffsetLeft - tabScrollWidth / 2 + tabItemWidth / 2);
      this.scrollFn($tabScrollEl, 'scrollLeft', scrollLeft, 300);
    }
  }

  scrollFn(element: any, direction: string, scrollTo: number, time: number) {
    const scrollFrom = parseInt(element[direction] + '', 10);
    let i = 0;
    const runEvery = 5;
    scrollTo = parseInt(scrollTo + '', 10);
    time /= runEvery;
    const interval = setInterval(function() {
      i++;
      element[direction] = (scrollTo - scrollFrom) / time * i + scrollFrom;
      if (i >= time) {
        clearInterval(interval);
      }
    }, runEvery);
  }
}

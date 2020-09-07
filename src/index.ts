/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * tab switch
 * attention: [data-role="tabSwitch"] ~ [data-tab-scroll] > [data-role="tab"] > tabs
 */

const delegateFn = function(elFilter: (elem: HTMLElement) => boolean, listener: any, e: any) {
  const el = e.target;
  do {
    if (!elFilter(el)) continue;
    e.delegateTarget = el;
    listener(el);
    return;
  } while( (el == el.parentNode) );
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
    this.switchEls = document.querySelectorAll('[data-role="tabSwitch"]');

    this.init();
  }

  tabFilter(elem: HTMLElement): boolean {
    return elem.classList && elem.classList.contains('item');
  }

  init() {
    if (this.switchEls && this.switchEls.length) {
      this.initSwitchListener();
    } else {
      console.warn('[TabSwitch warning]: cannot find the trigger element');
    }
  }

  destroy() {
    if (this.switchEls && this.switchEls.length) {
      this.switchEls.forEach((elem) => {
        elem.removeEventListener('click', this._fnCheck);
      });
    } else {
      console.warn('[TabSwitch warning]: cannot find the trigger element');
    }
  }

  _fnCheck = (e: any) => {
    delegateFn(this.tabFilter, this.onTabClick.bind(this), e);
  }

  initSwitchListener() {
    this.switchEls && this.switchEls.forEach((elem) => {
      elem.addEventListener('click', this._fnCheck);

      const changeTabIndex = +(elem.dataset.tabActive) || 1;
      const activeIndex = changeTabIndex - 1;
      this.changeTab({
        $switchEl: elem,
        index: activeIndex,
      });
    });
  }

  /**
   * tab change
   * @param {HTMLElement} $switchEl - the switch container of the current tab 
   * @param {HTMLElement} [$tab] - current tab item
   * @param {number} [index] - the active index of the tab（default [data-tab-active]）
   */
  changeTab({
    $switchEl,
    $tab,
    index,
  }: {
    $switchEl: HTMLElement;
    $tab?: HTMLElement;
    index?: number;
  }) {
    if (!$switchEl) { return; }

    const $tabsEl = $switchEl.querySelector(this.tabsClass); // the current tab container
    const $tabsNodeList = $tabsEl.querySelectorAll(this.tabItemClass) as NodeListOf<HTMLElement>; // the nodelist of the current tab items
    let $activeTab: HTMLElement;

    if ($tab) {
      $activeTab = $tab;
    } else {
      const activeIndex = (index > 0) ? index : 0;
      $activeTab = $tabsNodeList[activeIndex];
    }

    if (!$activeTab) {
      console.warn('[TabSwitch warning]: please check the config of the active tab is exist.');
      return;
    }

    if ($activeTab.classList.contains('activate')) {
      return;
    }

    $tabsNodeList.forEach(elem => {
      elem.classList.remove('activate');
    });
    $activeTab.classList.add('activate');

    this.setTabPosition($activeTab);
  }

  /**
   * tab item click
  */
  onTabClick(elem: HTMLElement) {
    if (typeof elem === 'object') {
      this.changeTab({
        $switchEl: elem.closest('[data-role="tabSwitch"]'),
        $tab: elem,
      });
    }
  }

  setTabPosition($tabItem: HTMLElement) {
    const $tabScrollEl = $tabItem.closest(this.tabScrollClass) as HTMLElement;
    const tabItemWidth = $tabItem.offsetWidth;

    let scrollLeft = 0;
    let tabScrollWidth = 0;

    const tabOffsetLeft = $tabItem.offsetLeft;
    tabScrollWidth = $tabScrollEl.offsetWidth;
    scrollLeft = Math.ceil(tabOffsetLeft - tabScrollWidth / 2 + tabItemWidth / 2);
    this.scrollFn($tabScrollEl, 'scrollLeft', scrollLeft, 300);
  }

  scrollFn(element: any, direction: string, scrollTo: number, time = 300) {
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

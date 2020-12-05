/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * tab switch
 * attention: [data-role="tabSwitch"] ~ [data-tab-scroll] > [data-role="tab"] > tabs
 */
var delegateFn = function (elFilter, listener, e) {
    var el = e.target;
    do {
        if (!elFilter(el))
            continue;
        e.delegateTarget = el;
        listener(el);
        return;
    } while ((el == el.parentNode));
};
var TabSwitch = /** @class */ (function () {
    function TabSwitch() {
        var _this = this;
        this._fnCheck = function (e) {
            delegateFn(_this.tabFilter, _this.onTabClick.bind(_this), e);
        };
        this.tabScrollClass = '[data-tab-scroll]';
        this.tabsClass = '[data-role="tab"]';
        this.tabItemClass = '.item';
        this.switchEls = document.querySelectorAll('[data-role="tabSwitch"]');
        this.init();
    }
    TabSwitch.prototype.tabFilter = function (elem) {
        return elem.classList && elem.classList.contains('item');
    };
    TabSwitch.prototype.init = function () {
        if (this.switchEls && this.switchEls.length) {
            this.initSwitchListener();
        }
        else {
            console.warn('[TabSwitch warning]: cannot find the trigger element');
        }
    };
    TabSwitch.prototype.destroy = function () {
        var _this = this;
        if (this.switchEls && this.switchEls.length) {
            this.switchEls.forEach(function (elem) {
                elem.removeEventListener('click', _this._fnCheck);
            });
        }
        else {
            console.warn('[TabSwitch warning]: cannot find the trigger element');
        }
    };
    TabSwitch.prototype.initSwitchListener = function () {
        var _this = this;
        this.switchEls && this.switchEls.forEach(function (elem) {
            elem.addEventListener('click', _this._fnCheck);
            var changeTabIndex = +(elem.dataset.tabActive) || 1;
            var activeIndex = changeTabIndex - 1;
            _this.changeTab({
                $switchEl: elem,
                index: activeIndex,
            });
        });
    };
    /**
     * tab change
     * @param {HTMLElement} $switchEl - the switch container of the current tab
     * @param {HTMLElement} [$tab] - current tab item
     * @param {number} [index] - the active index of the tab（default [data-tab-active]）
     */
    TabSwitch.prototype.changeTab = function (_a) {
        var $switchEl = _a.$switchEl, $tab = _a.$tab, index = _a.index;
        if (!$switchEl) {
            return;
        }
        var $tabsEl = $switchEl.querySelector(this.tabsClass); // the current tab container
        var $tabsNodeList = $tabsEl.querySelectorAll(this.tabItemClass); // the nodelist of the current tab items
        var $activeTab;
        if ($tab) {
            $activeTab = $tab;
        }
        else {
            var activeIndex = (index > 0) ? index : 0;
            $activeTab = $tabsNodeList[activeIndex];
        }
        if (!$activeTab) {
            console.warn('[TabSwitch warning]: please check the config of the active tab is exist.');
            return;
        }
        if ($activeTab.classList.contains('activate')) {
            return;
        }
        $tabsNodeList.forEach(function (elem) {
            elem.classList.remove('activate');
        });
        $activeTab.classList.add('activate');
        this.setTabPosition($activeTab);
    };
    /**
     * tab item click
    */
    TabSwitch.prototype.onTabClick = function (elem) {
        if (typeof elem === 'object') {
            this.changeTab({
                $switchEl: elem.closest('[data-role="tabSwitch"]'),
                $tab: elem,
            });
        }
    };
    TabSwitch.prototype.setTabPosition = function ($tabItem) {
        var $tabScrollEl = $tabItem.closest(this.tabScrollClass);
        var tabItemWidth = $tabItem.offsetWidth;
        var scrollLeft = 0;
        var tabScrollWidth = 0;
        var tabOffsetLeft = $tabItem.offsetLeft;
        tabScrollWidth = $tabScrollEl.offsetWidth;
        scrollLeft = Math.ceil(tabOffsetLeft - tabScrollWidth / 2 + tabItemWidth / 2);
        this.scrollFn($tabScrollEl, 'scrollLeft', scrollLeft, 300);
    };
    TabSwitch.prototype.scrollFn = function (element, direction, scrollTo, time) {
        if (time === void 0) { time = 300; }
        var scrollFrom = parseInt(element[direction] + '', 10);
        var i = 0;
        var runEvery = 5;
        scrollTo = parseInt(scrollTo + '', 10);
        time /= runEvery;
        var interval = setInterval(function () {
            i++;
            element[direction] = (scrollTo - scrollFrom) / time * i + scrollFrom;
            if (i >= time) {
                clearInterval(interval);
            }
        }, runEvery);
    };
    return TabSwitch;
}());
export default TabSwitch;

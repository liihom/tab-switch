/**
 * tab switch
 * attention: [data-role="tabSwitch"] ~ [data-tab-scroll] > [data-role="tab"] > tabs
 */
export default class TabSwitch {
    switchEls: NodeListOf<HTMLElement>;
    tabScrollClass: string;
    tabsClass: string;
    tabItemClass: string;
    constructor();
    tabFilter(elem: HTMLElement): boolean;
    init(): void;
    destroy(): void;
    _fnCheck: (e: any) => void;
    initSwitchListener(): void;
    /**
     * tab change
     * @param {HTMLElement} $switchEl - the switch container of the current tab
     * @param {HTMLElement} [$tab] - current tab item
     * @param {number} [index] - the active index of the tab（default [data-tab-active]）
     */
    changeTab({ $switchEl, $tab, index, }: {
        $switchEl: HTMLElement;
        $tab?: HTMLElement;
        index?: number;
    }): void;
    /**
     * tab item click
    */
    onTabClick(elem: HTMLElement): void;
    setTabPosition($tabItem: HTMLElement): void;
    scrollFn(element: any, direction: string, scrollTo: number, time?: number): void;
}

/**
 * @file LoaderUI.js
 * @classdesc类的描述 加载ui文件夹下的js脚本的类，继承自LoaderBase
 * @method方法 提供一个方法 load() 用于加载 ui 文件夹下的所有 js 脚本文件
 */
class UILoader extends LoaderBase {
    async load() {
        // components组件类文件
        await this.loadScript('js/ui/components/ButtonBase.js');
        await this.loadScript('js/ui/components/ScrollTextBase.js');
        // pages页面类文件
        await this.loadScript('js/ui/game-pages/GamePageBase.js');
        await this.loadScript('js/ui/game-pages/GamePageLevel1.js');
        await this.loadScript('js/ui/game-pages/GamePageLevel2.js');
        await this.loadScript('js/ui/static-pages/StaticPageBase.js');
        await this.loadScript('js/ui/static-pages/StaticPageMenu.js');
        await this.loadScript('js/ui/static-pages/StaticPageCredits.js');
        await this.loadScript('js/ui/static-pages/StaticPageEndingStory.js');
        await this.loadScript('js/ui/static-pages/StaticPageOpeningStory.js');
    }
}
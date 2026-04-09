/**
 * @file LoaderSwitchers.js
 * @classdesc类的描述 加载switchers文件夹下的js脚本的类，继承自LoaderBase
 * @method方法 提供一个方法 load() 用于加载 switchers 文件夹下的所有 js 脚本文件
 */
class LoaderSwitchers extends LoaderBase {
    async load() {
        await this.loadScript('js/switchers/SwitcherBase.js');
        await this.loadScript('js/switchers/SwitcherGamePage.js');
        await this.loadScript('js/switchers/SwitcherStaticPage.js');
        await this.loadScript('js/switchers/SwitcherMain.js');
    }
}
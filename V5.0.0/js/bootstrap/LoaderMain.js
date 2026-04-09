/**
 * @file LoaderMain.js
 * @method方法 提供一个方法 loadAll() 用于加载所有的loader类文件，并按顺序执行它们的加载方法
 */
class LoadMain extends LoaderBase {
    async loadAll() {
        // 先加载其他loader类文件
        await this.loadScript('bootstrap/ui/UILoader.js');
        await this.loadScript('bootstrap/switchers/LoaderSwitchers.js');

        // 再按顺序执行
        await new UILoader().load();
        await new LoaderSwitchers().load();
    }
}

new LoadMain().loadAll();
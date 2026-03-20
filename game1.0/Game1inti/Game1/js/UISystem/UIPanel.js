export class UIPanel {
    constructor(panelTemplate) {
        this.el = null;
        this.panelTemplate = panelTemplate;
    }

    mount() {
        const tpl = document.querySelector(this.panelTemplate);
        this.el = tpl.content.firstElementChild.cloneNode(true);
        document.body.appendChild(this.el);
    }
    unmount() {
        this.el.remove();
        this.el = null;
    }
}
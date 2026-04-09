/**
 * @file LoaderBase.js
 * @classdesc类的描述 加载js脚本的类
 * @method方法 提供一个方法 loadScript(src) 用于异步加载外部 JS 脚本文件
 * @param参数 {string} src - 要加载的脚本文件的 URL 地址
 * @returns {Promise<Event>} 返回一个 Promise 对象，Promise 用于处理异步操作，成功时 resolve 加载事件对象，失败时 reject 错误事件对象
 */

class LoaderBase {
    loadScript(src) {
        return new Promise((resolve, reject) => {
            // 4. 创建一个 <script> 标签元素
            const script = document.createElement('script');
            // 5. 设置 script 标签的 src 属性，指向要加载的 JS 文件地址
            script.src = src;
            
            // 6. 监听 script 加载成功的事件：加载完成时调用 resolve
            script.onload = resolve;
            // 7. 监听 script 加载失败的事件：加载出错时调用 reject
            script.onerror = reject;
            
            // 8. 将创建好的 script 标签添加到 HTML 的 <head> 标签中，触发脚本加载
            document.head.appendChild(script);
        });
    }
}
/**
 * @fileoverview Alist 自定义脚本，由 imsyy 创作
 * @version 1.0.4
 * @description 无侵入式修改 Alist，提供额外的样式和视觉增强效果
 *
 * @license MIT
 *
 * @author imsyy
 * @created 2023-06-28
 * @updated 2023-07-04
 *
 * @see {@link https://github.com/imsyy/file/tree/master/resource/Alist/}
 * @see {@link https://example.com/alist}
 */

/**
 * 观察元素是否发生改变并触发回调函数
 * @param {string} selector - 要观察的元素的 ID 或类名
 * @param {Function | Function[]} callbacks - 元素发生改变时要执行的回调函数或回调函数列表
 * @param {Boolean} isStop - 是否在改变后停止观察
 * @returns {void}
 */
const observeElementChanges = (selector, callbacks, isStop = true) => {
  try {
    const target = document.querySelector("#root");
    if (!target) {
      console.error(`未查找到 #root 元素`);
      return;
    }
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          const matchedElement = target.querySelector(selector);
          if (matchedElement) {
            if (Array.isArray(callbacks)) {
              callbacks.forEach((callback) => {
                if (typeof callback === "function") {
                  callback(matchedElement);
                }
              });
            } else if (typeof callbacks === "function") {
              callbacks(matchedElement);
            }
            // 停止观察
            if (isStop) observer.disconnect();
          }
        }
      }
    });
    const config = { childList: true, subtree: true };
    observer.observe(target, config);
  } catch (error) {
    console.error("在观察元素更改时发生错误：", error);
  }
};

/**
 * 页脚自定义
 * @returns {void}
 */
const customFooter = (el) => {
  try {
    if (el !== null) {
      el.innerHTML = `<div class="custom-footer"><div class="icon"><a href="https://github.com/MadisonWirtanen"><i class="fa-brands fa-github"></i> </a><a href="https://www.ykwang.top"><i class="fa-solid fa-house"></i> </a><a href="mailto:email@ykwang.top"><i class="fa-solid fa-envelope"></i></a></div><div class="text"><div class="num">Themed by <a href="https://imsyy.top/" target="_blank">無名</a> | Powered by <a href="https://alist.nn.ci/zh/" target="_blank">Alist</a></i></span></div><div class="power">Copyright © 2020 - ${new Date().getFullYear()} <a href="https://ykwang.top/" target="_blank">ykwang</a></div></div></div>`;
    }
  } catch (error) {
    console.error("页脚自定义出现问题：" + error);
  }
};

/**
 * Logo 自定义
 * @returns {void}
 */
const customLogo = (el) => {
  try {
    if (el !== null) {
      const parentElement = el.parentNode;
      // 移除原有的元素
      el.remove();
      // 创建新的父元素
      const newParentElement = document.createElement("div");
      newParentElement.classList.add("header-left-custom");
      // 在原有元素的父元素内部前面插入新的父元素
      parentElement.insertBefore(newParentElement, parentElement.firstChild);
      // 设置新元素的内容
      const newLogo = `<a href="/" class="left-all"><span class="name">Alist of ykwang</span></a>`;
      // 使用innerHTML设置新元素的内容
      newParentElement.innerHTML = newLogo;
    }
  } catch (error) {
    console.error("Logo 自定义时出现问题：" + error);
  }
};

// 执行观察
observeElementChanges(".footer", customFooter);
observeElementChanges(".header-left", customLogo);

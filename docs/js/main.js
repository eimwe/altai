/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/accordion.js":
/*!**********************************!*\
  !*** ./src/scripts/accordion.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordion)
/* harmony export */ });
class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector('summary');
    // Store the <div class="content"> element
    this.content = el.querySelector('.faq__answer');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;
    
    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 300,
      easing: 'ease-out'
    });
    
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.clientHeight + this.content.clientHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 300,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

/***/ }),

/***/ "./src/scripts/dialog-polyfill.js":
/*!****************************************!*\
  !*** ./src/scripts/dialog-polyfill.js ***!
  \****************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, function () { 'use strict';

  // nb. This is for IE10 and lower _only_.
  var supportCustomEvent = window.CustomEvent;
  if (!supportCustomEvent || typeof supportCustomEvent === 'object') {
    supportCustomEvent = function CustomEvent(event, x) {
      x = x || {};
      var ev = document.createEvent('CustomEvent');
      ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
      return ev;
    };
    supportCustomEvent.prototype = window.Event.prototype;
  }

  /**
   * Dispatches the passed event to both an "on<type>" handler as well as via the
   * normal dispatch operation. Does not bubble.
   *
   * @param {!EventTarget} target
   * @param {!Event} event
   * @return {boolean}
   */
  function safeDispatchEvent(target, event) {
    var check = 'on' + event.type.toLowerCase();
    if (typeof target[check] === 'function') {
      target[check](event);
    }
    return target.dispatchEvent(event);
  }

  /**
   * @param {Element} el to check for stacking context
   * @return {boolean} whether this el or its parents creates a stacking context
   */
  function createsStackingContext(el) {
    while (el && el !== document.body) {
      var s = window.getComputedStyle(el);
      var invalid = function(k, ok) {
        return !(s[k] === undefined || s[k] === ok);
      };

      if (s.opacity < 1 ||
          invalid('zIndex', 'auto') ||
          invalid('transform', 'none') ||
          invalid('mixBlendMode', 'normal') ||
          invalid('filter', 'none') ||
          invalid('perspective', 'none') ||
          s['isolation'] === 'isolate' ||
          s.position === 'fixed' ||
          s.webkitOverflowScrolling === 'touch') {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  /**
   * Finds the nearest <dialog> from the passed element.
   *
   * @param {Element} el to search from
   * @return {HTMLDialogElement} dialog found
   */
  function findNearestDialog(el) {
    while (el) {
      if (el.localName === 'dialog') {
        return /** @type {HTMLDialogElement} */ (el);
      }
      if (el.parentElement) {
        el = el.parentElement;
      } else if (el.parentNode) {
        el = el.parentNode.host;
      } else {
        el = null;
      }
    }
    return null;
  }

  /**
   * Blur the specified element, as long as it's not the HTML body element.
   * This works around an IE9/10 bug - blurring the body causes Windows to
   * blur the whole application.
   *
   * @param {Element} el to blur
   */
  function safeBlur(el) {
    // Find the actual focused element when the active element is inside a shadow root
    while (el && el.shadowRoot && el.shadowRoot.activeElement) {
      el = el.shadowRoot.activeElement;
    }

    if (el && el.blur && el !== document.body) {
      el.blur();
    }
  }

  /**
   * @param {!NodeList} nodeList to search
   * @param {Node} node to find
   * @return {boolean} whether node is inside nodeList
   */
  function inNodeList(nodeList, node) {
    for (var i = 0; i < nodeList.length; ++i) {
      if (nodeList[i] === node) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {HTMLFormElement} el to check
   * @return {boolean} whether this form has method="dialog"
   */
  function isFormMethodDialog(el) {
    if (!el || !el.hasAttribute('method')) {
      return false;
    }
    return el.getAttribute('method').toLowerCase() === 'dialog';
  }

  /**
   * @param {!DocumentFragment|!Element} hostElement
   * @return {?Element}
   */
  function findFocusableElementWithin(hostElement) {
    // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
    // alternative involves stepping through and trying to focus everything.
    var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
    var query = opts.map(function(el) {
      return el + ':not([disabled])';
    });
    // TODO(samthor): tabindex values that are not numeric are not focusable.
    query.push('[tabindex]:not([disabled]):not([tabindex=""])');  // tabindex != "", not disabled
    var target = hostElement.querySelector(query.join(', '));

    if (!target && 'attachShadow' in Element.prototype) {
      // If we haven't found a focusable target, see if the host element contains an element
      // which has a shadowRoot.
      // Recursively search for the first focusable item in shadow roots.
      var elems = hostElement.querySelectorAll('*');
      for (var i = 0; i < elems.length; i++) {
        if (elems[i].tagName && elems[i].shadowRoot) {
          target = findFocusableElementWithin(elems[i].shadowRoot);
          if (target) {
            break;
          }
        }
      }
    }
    return target;
  }

  /**
   * Determines if an element is attached to the DOM.
   * @param {Element} element to check
   * @return {boolean} whether the element is in DOM
   */
  function isConnected(element) {
    return element.isConnected || document.body.contains(element);
  }

  /**
   * @param {!Event} event
   * @return {?Element}
   */
  function findFormSubmitter(event) {
    if (event.submitter) {
      return event.submitter;
    }

    var form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return null;
    }

    var submitter = dialogPolyfill.formSubmitter;
    if (!submitter) {
      var target = event.target;
      var root = ('getRootNode' in target && target.getRootNode() || document);
      submitter = root.activeElement;
    }

    if (!submitter || submitter.form !== form) {
      return null;
    }
    return submitter;
  }

  /**
   * @param {!Event} event
   */
  function maybeHandleSubmit(event) {
    if (event.defaultPrevented) {
      return;
    }
    var form = /** @type {!HTMLFormElement} */ (event.target);

    // We'd have a value if we clicked on an imagemap.
    var value = dialogPolyfill.imagemapUseValue;
    var submitter = findFormSubmitter(event);
    if (value === null && submitter) {
      value = submitter.value;
    }

    // There should always be a dialog as this handler is added specifically on them, but check just
    // in case.
    var dialog = findNearestDialog(form);
    if (!dialog) {
      return;
    }

    // Prefer formmethod on the button.
    var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
    if (formmethod !== 'dialog') {
      return;
    }
    event.preventDefault();

    if (value != null) {
      // nb. we explicitly check against null/undefined
      dialog.close(value);
    } else {
      dialog.close();
    }
  }

  /**
   * @param {!HTMLDialogElement} dialog to upgrade
   * @constructor
   */
  function dialogPolyfillInfo(dialog) {
    this.dialog_ = dialog;
    this.replacedStyleTop_ = false;
    this.openAsModal_ = false;

    // Set a11y role. Browsers that support dialog implicitly know this already.
    if (!dialog.hasAttribute('role')) {
      dialog.setAttribute('role', 'dialog');
    }

    dialog.show = this.show.bind(this);
    dialog.showModal = this.showModal.bind(this);
    dialog.close = this.close.bind(this);

    dialog.addEventListener('submit', maybeHandleSubmit, false);

    if (!('returnValue' in dialog)) {
      dialog.returnValue = '';
    }

    if ('MutationObserver' in window) {
      var mo = new MutationObserver(this.maybeHideModal.bind(this));
      mo.observe(dialog, {attributes: true, attributeFilter: ['open']});
    } else {
      // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
      // seem to fire even if the element was removed as part of a parent removal. Use the removed
      // events to force downgrade (useful if removed/immediately added).
      var removed = false;
      var cb = function() {
        removed ? this.downgradeModal() : this.maybeHideModal();
        removed = false;
      }.bind(this);
      var timeout;
      var delayModel = function(ev) {
        if (ev.target !== dialog) { return; }  // not for a child element
        var cand = 'DOMNodeRemoved';
        removed |= (ev.type.substr(0, cand.length) === cand);
        window.clearTimeout(timeout);
        timeout = window.setTimeout(cb, 0);
      };
      ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function(name) {
        dialog.addEventListener(name, delayModel);
      });
    }
    // Note that the DOM is observed inside DialogManager while any dialog
    // is being displayed as a modal, to catch modal removal from the DOM.

    Object.defineProperty(dialog, 'open', {
      set: this.setOpen.bind(this),
      get: dialog.hasAttribute.bind(dialog, 'open')
    });

    this.backdrop_ = document.createElement('div');
    this.backdrop_.className = 'backdrop';
    this.backdrop_.addEventListener('mouseup'  , this.backdropMouseEvent_.bind(this));
    this.backdrop_.addEventListener('mousedown', this.backdropMouseEvent_.bind(this));
    this.backdrop_.addEventListener('click'    , this.backdropMouseEvent_.bind(this));
  }

  dialogPolyfillInfo.prototype = /** @type {HTMLDialogElement.prototype} */ ({

    get dialog() {
      return this.dialog_;
    },

    /**
     * Maybe remove this dialog from the modal top layer. This is called when
     * a modal dialog may no longer be tenable, e.g., when the dialog is no
     * longer open or is no longer part of the DOM.
     */
    maybeHideModal: function() {
      if (this.dialog_.hasAttribute('open') && isConnected(this.dialog_)) { return; }
      this.downgradeModal();
    },

    /**
     * Remove this dialog from the modal top layer, leaving it as a non-modal.
     */
    downgradeModal: function() {
      if (!this.openAsModal_) { return; }
      this.openAsModal_ = false;
      this.dialog_.style.zIndex = '';

      // This won't match the native <dialog> exactly because if the user set top on a centered
      // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
      // possible to polyfill this perfectly.
      if (this.replacedStyleTop_) {
        this.dialog_.style.top = '';
        this.replacedStyleTop_ = false;
      }

      // Clear the backdrop and remove from the manager.
      this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
      dialogPolyfill.dm.removeDialog(this);
    },

    /**
     * @param {boolean} value whether to open or close this dialog
     */
    setOpen: function(value) {
      if (value) {
        this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
      } else {
        this.dialog_.removeAttribute('open');
        this.maybeHideModal();  // nb. redundant with MutationObserver
      }
    },

    /**
     * Handles mouse events ('mouseup', 'mousedown', 'click') on the fake .backdrop element, redirecting them as if
     * they were on the dialog itself.
     *
     * @param {!Event} e to redirect
     */
    backdropMouseEvent_: function(e) {
      if (!this.dialog_.hasAttribute('tabindex')) {
        // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
        // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
        // would not be needed - clicks would move the implicit cursor there.
        var fake = document.createElement('div');
        this.dialog_.insertBefore(fake, this.dialog_.firstChild);
        fake.tabIndex = -1;
        fake.focus();
        this.dialog_.removeChild(fake);
      } else {
        this.dialog_.focus();
      }

      var redirectedEvent = document.createEvent('MouseEvents');
      redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
          e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
          e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
      this.dialog_.dispatchEvent(redirectedEvent);
      e.stopPropagation();
    },

    /**
     * Focuses on the first focusable element within the dialog. This will always blur the current
     * focus, even if nothing within the dialog is found.
     */
    focus_: function() {
      // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
      var target = this.dialog_.querySelector('[autofocus]:not([disabled])');
      if (!target && this.dialog_.tabIndex >= 0) {
        target = this.dialog_;
      }
      if (!target) {
        target = findFocusableElementWithin(this.dialog_);
      }
      safeBlur(document.activeElement);
      target && target.focus();
    },

    /**
     * Sets the zIndex for the backdrop and dialog.
     *
     * @param {number} dialogZ
     * @param {number} backdropZ
     */
    updateZIndex: function(dialogZ, backdropZ) {
      if (dialogZ < backdropZ) {
        throw new Error('dialogZ should never be < backdropZ');
      }
      this.dialog_.style.zIndex = dialogZ;
      this.backdrop_.style.zIndex = backdropZ;
    },

    /**
     * Shows the dialog. If the dialog is already open, this does nothing.
     */
    show: function() {
      if (!this.dialog_.open) {
        this.setOpen(true);
        this.focus_();
      }
    },

    /**
     * Show this dialog modally.
     */
    showModal: function() {
      if (this.dialog_.hasAttribute('open')) {
        throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
      }
      if (!isConnected(this.dialog_)) {
        throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
      }
      if (!dialogPolyfill.dm.pushDialog(this)) {
        throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
      }

      if (createsStackingContext(this.dialog_.parentElement)) {
        console.warn('A dialog is being shown inside a stacking context. ' +
            'This may cause it to be unusable. For more information, see this link: ' +
            'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');
      }

      this.setOpen(true);
      this.openAsModal_ = true;

      // Optionally center vertically, relative to the current viewport.
      if (dialogPolyfill.needsCentering(this.dialog_)) {
        dialogPolyfill.reposition(this.dialog_);
        this.replacedStyleTop_ = true;
      } else {
        this.replacedStyleTop_ = false;
      }

      // Insert backdrop.
      this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);

      // Focus on whatever inside the dialog.
      this.focus_();
    },

    /**
     * Closes this HTMLDialogElement. This is optional vs clearing the open
     * attribute, however this fires a 'close' event.
     *
     * @param {string=} opt_returnValue to use as the returnValue
     */
    close: function(opt_returnValue) {
      if (!this.dialog_.hasAttribute('open')) {
        throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
      }
      this.setOpen(false);

      // Leave returnValue untouched in case it was set directly on the element
      if (opt_returnValue !== undefined) {
        this.dialog_.returnValue = opt_returnValue;
      }

      // Triggering "close" event for any attached listeners on the <dialog>.
      var closeEvent = new supportCustomEvent('close', {
        bubbles: false,
        cancelable: false
      });
      safeDispatchEvent(this.dialog_, closeEvent);
    }

  });

  var dialogPolyfill = {};

  dialogPolyfill.reposition = function(element) {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
    element.style.top = Math.max(scrollTop, topValue) + 'px';
  };

  dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
    for (var i = 0; i < document.styleSheets.length; ++i) {
      var styleSheet = document.styleSheets[i];
      var cssRules = null;
      // Some browsers throw on cssRules.
      try {
        cssRules = styleSheet.cssRules;
      } catch (e) {}
      if (!cssRules) { continue; }
      for (var j = 0; j < cssRules.length; ++j) {
        var rule = cssRules[j];
        var selectedNodes = null;
        // Ignore errors on invalid selector texts.
        try {
          selectedNodes = document.querySelectorAll(rule.selectorText);
        } catch(e) {}
        if (!selectedNodes || !inNodeList(selectedNodes, element)) {
          continue;
        }
        var cssTop = rule.style.getPropertyValue('top');
        var cssBottom = rule.style.getPropertyValue('bottom');
        if ((cssTop && cssTop !== 'auto') || (cssBottom && cssBottom !== 'auto')) {
          return true;
        }
      }
    }
    return false;
  };

  dialogPolyfill.needsCentering = function(dialog) {
    var computedStyle = window.getComputedStyle(dialog);
    if (computedStyle.position !== 'absolute') {
      return false;
    }

    // We must determine whether the top/bottom specified value is non-auto.  In
    // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
    // Firefox returns the used value. So we do this crazy thing instead: check
    // the inline style and then go through CSS rules.
    if ((dialog.style.top !== 'auto' && dialog.style.top !== '') ||
        (dialog.style.bottom !== 'auto' && dialog.style.bottom !== '')) {
      return false;
    }
    return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
  };

  /**
   * @param {!Element} element to force upgrade
   */
  dialogPolyfill.forceRegisterDialog = function(element) {
    if (window.HTMLDialogElement || element.showModal) {
      console.warn('This browser already supports <dialog>, the polyfill ' +
          'may not work correctly', element);
    }
    if (element.localName !== 'dialog') {
      throw new Error('Failed to register dialog: The element is not a dialog.');
    }
    new dialogPolyfillInfo(/** @type {!HTMLDialogElement} */ (element));
  };

  /**
   * @param {!Element} element to upgrade, if necessary
   */
  dialogPolyfill.registerDialog = function(element) {
    if (!element.showModal) {
      dialogPolyfill.forceRegisterDialog(element);
    }
  };

  /**
   * @constructor
   */
  dialogPolyfill.DialogManager = function() {
    /** @type {!Array<!dialogPolyfillInfo>} */
    this.pendingDialogStack = [];

    var checkDOM = this.checkDOM_.bind(this);

    // The overlay is used to simulate how a modal dialog blocks the document.
    // The blocking dialog is positioned on top of the overlay, and the rest of
    // the dialogs on the pending dialog stack are positioned below it. In the
    // actual implementation, the modal dialog stacking is controlled by the
    // top layer, where z-index has no effect.
    this.overlay = document.createElement('div');
    this.overlay.className = '_dialog_overlay';
    this.overlay.addEventListener('click', function(e) {
      this.forwardTab_ = undefined;
      e.stopPropagation();
      checkDOM([]);  // sanity-check DOM
    }.bind(this));

    this.handleKey_ = this.handleKey_.bind(this);
    this.handleFocus_ = this.handleFocus_.bind(this);

    this.zIndexLow_ = 100000;
    this.zIndexHigh_ = 100000 + 150;

    this.forwardTab_ = undefined;

    if ('MutationObserver' in window) {
      this.mo_ = new MutationObserver(function(records) {
        var removed = [];
        records.forEach(function(rec) {
          for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
            if (!(c instanceof Element)) {
              continue;
            } else if (c.localName === 'dialog') {
              removed.push(c);
            }
            removed = removed.concat(c.querySelectorAll('dialog'));
          }
        });
        removed.length && checkDOM(removed);
      });
    }
  };

  /**
   * Called on the first modal dialog being shown. Adds the overlay and related
   * handlers.
   */
  dialogPolyfill.DialogManager.prototype.blockDocument = function() {
    document.documentElement.addEventListener('focus', this.handleFocus_, true);
    document.addEventListener('keydown', this.handleKey_);
    this.mo_ && this.mo_.observe(document, {childList: true, subtree: true});
  };

  /**
   * Called on the first modal dialog being removed, i.e., when no more modal
   * dialogs are visible.
   */
  dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
    document.documentElement.removeEventListener('focus', this.handleFocus_, true);
    document.removeEventListener('keydown', this.handleKey_);
    this.mo_ && this.mo_.disconnect();
  };

  /**
   * Updates the stacking of all known dialogs.
   */
  dialogPolyfill.DialogManager.prototype.updateStacking = function() {
    var zIndex = this.zIndexHigh_;

    for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
      dpi.updateZIndex(--zIndex, --zIndex);
      if (i === 0) {
        this.overlay.style.zIndex = --zIndex;
      }
    }

    // Make the overlay a sibling of the dialog itself.
    var last = this.pendingDialogStack[0];
    if (last) {
      var p = last.dialog.parentNode || document.body;
      p.appendChild(this.overlay);
    } else if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  };

  /**
   * @param {Element} candidate to check if contained or is the top-most modal dialog
   * @return {boolean} whether candidate is contained in top dialog
   */
  dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function(candidate) {
    while (candidate = findNearestDialog(candidate)) {
      for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
        if (dpi.dialog === candidate) {
          return i === 0;  // only valid if top-most
        }
      }
      candidate = candidate.parentElement;
    }
    return false;
  };

  dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
    var target = event.composedPath ? event.composedPath()[0] : event.target;

    if (this.containedByTopDialog_(target)) { return; }

    if (document.activeElement === document.documentElement) { return; }

    event.preventDefault();
    event.stopPropagation();
    safeBlur(/** @type {Element} */ (target));

    if (this.forwardTab_ === undefined) { return; }  // move focus only from a tab key

    var dpi = this.pendingDialogStack[0];
    var dialog = dpi.dialog;
    var position = dialog.compareDocumentPosition(target);
    if (position & Node.DOCUMENT_POSITION_PRECEDING) {
      if (this.forwardTab_) {
        // forward
        dpi.focus_();
      } else if (target !== document.documentElement) {
        // backwards if we're not already focused on <html>
        document.documentElement.focus();
      }
    }

    return false;
  };

  dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
    this.forwardTab_ = undefined;
    if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      var cancelEvent = new supportCustomEvent('cancel', {
        bubbles: false,
        cancelable: true
      });
      var dpi = this.pendingDialogStack[0];
      if (dpi && safeDispatchEvent(dpi.dialog, cancelEvent)) {
        dpi.dialog.close();
      }
    } else if (event.keyCode === 9) {
      this.forwardTab_ = !event.shiftKey;
    }
  };

  /**
   * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
   * removed and immediately readded don't stay modal, they become normal.
   *
   * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
   */
  dialogPolyfill.DialogManager.prototype.checkDOM_ = function(removed) {
    // This operates on a clone because it may cause it to change. Each change also calls
    // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
    // at a time?!
    var clone = this.pendingDialogStack.slice();
    clone.forEach(function(dpi) {
      if (removed.indexOf(dpi.dialog) !== -1) {
        dpi.downgradeModal();
      } else {
        dpi.maybeHideModal();
      }
    });
  };

  /**
   * @param {!dialogPolyfillInfo} dpi
   * @return {boolean} whether the dialog was allowed
   */
  dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
    var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
    if (this.pendingDialogStack.length >= allowed) {
      return false;
    }
    if (this.pendingDialogStack.unshift(dpi) === 1) {
      this.blockDocument();
    }
    this.updateStacking();
    return true;
  };

  /**
   * @param {!dialogPolyfillInfo} dpi
   */
  dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
    var index = this.pendingDialogStack.indexOf(dpi);
    if (index === -1) { return; }

    this.pendingDialogStack.splice(index, 1);
    if (this.pendingDialogStack.length === 0) {
      this.unblockDocument();
    }
    this.updateStacking();
  };

  dialogPolyfill.dm = new dialogPolyfill.DialogManager();
  dialogPolyfill.formSubmitter = null;
  dialogPolyfill.imagemapUseValue = null;

  /**
   * Installs global handlers, such as click listers and native method overrides. These are needed
   * even if a no dialog is registered, as they deal with <form method="dialog">.
   */
  if (window.HTMLDialogElement === undefined) {

    /**
     * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
     * one that returns the correct value.
     */
    var testForm = document.createElement('form');
    testForm.setAttribute('method', 'dialog');
    if (testForm.method !== 'dialog') {
      var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');
      if (methodDescriptor) {
        // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
        // and don't bother to update the element.
        var realGet = methodDescriptor.get;
        methodDescriptor.get = function() {
          if (isFormMethodDialog(this)) {
            return 'dialog';
          }
          return realGet.call(this);
        };
        var realSet = methodDescriptor.set;
        /** @this {HTMLElement} */
        methodDescriptor.set = function(v) {
          if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
            return this.setAttribute('method', v);
          }
          return realSet.call(this, v);
        };
        Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
      }
    }

    /**
     * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
     * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
     * document.activeElement.
     */
    document.addEventListener('click', function(ev) {
      dialogPolyfill.formSubmitter = null;
      dialogPolyfill.imagemapUseValue = null;
      if (ev.defaultPrevented) { return; }  // e.g. a submit which prevents default submission

      var target = /** @type {Element} */ (ev.target);
      if ('composedPath' in ev) {
        var path = ev.composedPath();
        target = path.shift() || target;
      }
      if (!target || !isFormMethodDialog(target.form)) { return; }

      var valid = (target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1);
      if (!valid) {
        if (!(target.localName === 'input' && target.type === 'image')) { return; }
        // this is a <input type="image">, which can submit forms
        dialogPolyfill.imagemapUseValue = ev.offsetX + ',' + ev.offsetY;
      }

      var dialog = findNearestDialog(target);
      if (!dialog) { return; }

      dialogPolyfill.formSubmitter = target;

    }, false);

    /**
     * Global 'submit' handler. This handles submits of `method="dialog"` which are invalid, i.e.,
     * outside a dialog. They get prevented.
     */
    document.addEventListener('submit', function(ev) {
      var form = ev.target;
      var dialog = findNearestDialog(form);
      if (dialog) {
        return;  // ignore, handle there
      }

      var submitter = findFormSubmitter(ev);
      var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
      if (formmethod === 'dialog') {
        ev.preventDefault();
      }
    });

    /**
     * Replace the native HTMLFormElement.submit() method, as it won't fire the
     * submit event and give us a chance to respond.
     */
    var nativeFormSubmit = HTMLFormElement.prototype.submit;
    var replacementFormSubmit = function () {
      if (!isFormMethodDialog(this)) {
        return nativeFormSubmit.call(this);
      }
      var dialog = findNearestDialog(this);
      dialog && dialog.close();
    };
    HTMLFormElement.prototype.submit = replacementFormSubmit;
  }

  return dialogPolyfill;

}));

/***/ }),

/***/ "./src/scripts/form.js":
/*!*****************************!*\
  !*** ./src/scripts/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormValidator)
/* harmony export */ });
/* harmony import */ var _modals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals.js */ "./src/scripts/modals.js");


/**
 * @namespace FormValidator
 * Class representing a form validator.
 */
class FormValidator {
  /**
   * Create a form validator
   * @param {HTMLElement} form - form node
   * @param {Array} fields - IDs of form inputs
   * @param {String} countryCode - area code to insert into formatPhoneNumber method's result
   */
  constructor(form, fields, countryCode) {
    this.form = form;
    this.fields = fields;
    this.countryCode = countryCode;
  }

  /**
   * @method initialize
   * @description initializes form alidation on entry and submit, clears inputs
   * @see {@link validateOnEntry}
   * @see {@link validateOnSubmit}
   * @see {@link clearField}
   * @param {undefined}
   * @returns {undefined}
   */
  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
    this.clearField();
  }

  /**
   * @method validateOnSubmit
   * @description validates form on submit by means of validateFields method
   * @see {@link validateFields}
   * @param {undefined}
   * @returns {(false|Function)} depending on validateFields method's result
   * either returns false or calls modal window and clears the input
   */
  validateOnSubmit() {
    this.form.addEventListener('submit', event => {
        event.preventDefault()
        this.fields.forEach(field => {
        const INPUT = document.querySelector(`#${field}`)
        this.validateFields(INPUT);
        if (INPUT.classList.contains('form__control--invalid')) {
          return false;
        } else {
          INPUT.value = '';

          /**
           * @method validateOnEntry
           * @description native method for closing modals wrapped in the polyfill
           * @param {undefined}
           * @returns {Void}
           */
          _modals_js__WEBPACK_IMPORTED_MODULE_0__.confirmModal.showModal();
        }
      })
    })
  }

  /**
   * @method validateOnEntry
   * @description validates form on entry by means of validateFields method
   * also recieves formatted phone number from the formatPhoneNumber method
   * @see {@link validateFields}
   * @see {@link formatPhoneNumber}
   * @param {undefined}
   * @returns {undefined}
   */
  validateOnEntry() {
    this.fields.forEach(field => {
      const INPUT = document.querySelector(`#${field}`);
      INPUT.addEventListener('input', event => {
        INPUT.value = this.formatPhoneNumber(event.target.value);
        this.validateFields(INPUT);
      })
    })
  }

  /**
   * @method formatPhoneNumber
   * @description formats phone number on entry
   * @param {String} input - user's entry
   * @returns {String} formatted phone number as '{countryCode}(###)-###-##-##'
   */
  formatPhoneNumber(input) {
    input = input.replace(/\D/g,'');
    let size = input.length;

    if (size > 0) input = '(' + input;
    if (size > 3) input = input.slice(0,4) + ')-' + input.slice(4,13);
    if (size > 6) input = input.slice(0,9) + '-' + input.slice(9,11) + '-' + input.slice(11,13);    
    if (size > 9) input = this.countryCode + input;

    return input;
  }

  /**
   * @method clearField
   * @description erases user's entries on focus and backspace keydown events
   * @param {undefined}
   * @returns {undefined}
   */
  clearField() {
    this.fields.forEach(field => {
      const INPUT = document.querySelector(`#${field}`);
      INPUT.addEventListener('focus', () => {
        INPUT.value = '';
      })
      INPUT.addEventListener('keydown', (event) => {
        if (event.keyCode === 8) INPUT.value = '';
      })
    })
  }

  /**
   * @method validateFields
   * @description checks input on being empty and sends
   * 'success' or 'error' status to setStatus method
   * @see {@link setStatus}
   * @param {HTMLElement} field - input node
   * @returns {undefined}
   */
  validateFields(field) {
    if (field.value.trim() === '') {
      this.setStatus(field, 'error');
    } else {
      this.setStatus(field, 'success');
    }
  }

  /**
   * @method setStatus
   * @description depending on the received status,
   * adds or removes '.form__control--invalid' class name to the input node
   * @param {HTMLElement} field - input node
   * @param {String} status - status received from the validateFields method
   * @returns {undefined}
   */
  setStatus(field, status) {
    if (status === 'success') {
      field.classList.remove('form__control--invalid');
    }

    if (status === 'error') {
      field.classList.add('form__control--invalid');
    }
  }
}

/***/ }),

/***/ "./src/scripts/gallery.js":
/*!********************************!*\
  !*** ./src/scripts/gallery.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gallery": () => (/* binding */ Gallery),
/* harmony export */   "OwlCarousel": () => (/* binding */ OwlCarousel)
/* harmony export */ });
/**
 * @namespace Gallery
 * Class representing a gallery.
 */
class Gallery {
  /**
   * Create a gallery.
   * @param {HTMLElement} gallery - Gallery node
   * @param {(Number|Boolean)} delay - setting a slideshow interval in milliseconds
   * or switching it off by passing 'false'
   */
  constructor(gallery, delay) {
    this.gallery = gallery;
    this.activeIndex = 0;
    this.numItems = this.gallery.children.length;
    if(!delay) return;
    this.delay = delay; 
    this.interval = setInterval(() => this.next(), delay);
  }
  
  /**
   * @method prev
   * @description decreases activeIndex prop and initiates showSlide method
   * @see {@link showSlide}
   * @param {undefined}
   * @returns {undefined}
   */
  prev() {
    this.activeIndex--;
    if(this.activeIndex < 0)
      this.activeIndex = this.numItems - 1;
    this.showSlide();
  }
  
  /**
   * @method next
   * @description increases activeIndex prop and initiates showSlide method
   * @see {@link showSlide}
   * @param {undefined}
   * @returns {undefined}
   */
  next() {
    this.activeIndex++;
    if(this.activeIndex >= this.numItems)
      this.activeIndex = 0;
    this.showSlide();
  }
  
  /**
   * @method showSlide
   * @description calculates coordinates 
   * (current activeIndex * slide container's width)
   * and shifts slides accordingly
   * @param {undefined}
   * @returns {undefined}
   */
  showSlide() {
    let innerSpace = this.gallery.offsetWidth;

    let coord = parseInt(`${this.activeIndex}` * innerSpace);
    
    this.gallery.scrollTo({
      top: 0,
      left: coord,
      behavior: 'smooth'
    });

    return this.activeIndex;
  }
}

/**
 * @namespace OwlCarousel
 * Class extending Gallery.
 * @memberof Gallery
 * @instance
 */
class OwlCarousel extends Gallery {
  /**
   * Create an instance of Gallery.
   * @param {HTMLElement} gallery - Gallery node
   * @param {(Number|Boolean)} delay - setting a slideshow interval in milliseconds
   * or switching it off by passing 'false'
   * @param {String} activeSlideClass - the active slide class name
   * @param {HTMLCollection} pages - a collection of HTML pagination nodes
   * @param {String} activePageClass - the active page class name
   * @param {HTMLElement} counterCurrent - current count number node (optional)
   * @param {(Boolean|undefined)} lightBox - lightBox gallery indicator (optional)
   */
  constructor(gallery, delay, activeSlideClass, pages, activePageClass, counterCurrent, lightBox) {
    super(gallery, delay);
    this.activeSlideClass = activeSlideClass;
    this.slides = Array.from(this.gallery.children);
    this.pages = Array.from(pages.children);
    this.activePageClass = activePageClass;
    if(!counterCurrent) return;
    this.counterCurrent = counterCurrent;
    if(!lightBox) return;
    this.lightBox = lightBox;
  }

  /**
   * @method prev
   * @description decreases activeIndex prop and toggles between pages and slides,
   * refreshes current slide number in the counter (optional)
   * creates caption for lightBox photo gallery (optional)
   * @see {@link toggleActive}
   * @param {undefined}
   * @returns {undefined}
   */
  prev() {
    super.prev();
    this.toggleActive(this.slides, this.activeSlideClass);
    this.toggleActive(this.pages, this.activePageClass);
    if(!this.counterCurrent) return;
    this.countPages(this.counterCurrent);
    if(!this.lightBox) return;
    this.slides.forEach(slide => {
      if(slide.classList.contains(this.activeSlideClass)) {
        this.createCaption(slide.getAttribute('alt'), this.pages);
      }
    });
  }

  /**
   * @method next
   * @description increases activeIndex prop and toggles between pages and slides,
   * refreshes current slide number in the counter (optional)
   * creates caption for lightBox photo gallery (optional)
   * @see {@link toggleActive}
   * @param {undefined}
   * @returns {undefined}
   */
  next() {
    super.next();
    this.toggleActive(this.slides, this.activeSlideClass);
    this.toggleActive(this.pages, this.activePageClass);
    if(!this.counterCurrent) return;
    this.countPages(this.counterCurrent);
    if(!this.lightBox) return;
    this.slides.forEach(slide => {
      if(slide.classList.contains(this.activeSlideClass)) {
        this.createCaption(slide.getAttribute('alt'), this.pages);
      }
    });
  }

  /**
   * @method toggleActive
   * @description switches active class for slides and corresponding pages
   * @param {Array} lists 
   * @param {String} activeClass 
   * @returns {undefined}
   */
  toggleActive(lists, activeClass) {
    lists.forEach(listItem => {
      listItem.classList.remove(activeClass);

      if(listItem.dataset.id == this.activeIndex) {
        listItem.classList.toggle(activeClass);
      }
    });
  }

  /**
   * @method navigatePage
   * @description shows slide according to the clicked page,
   * toggles between active pages and slides,
   * refreshes current slide number in the counter (optional)
   * creates caption for lightBox photo gallery (optional)
   * @param {undefined}
   * @returns {undefined}
   */
   navigatePage() {
    this.pages.forEach(page => {
      page.addEventListener('click', event => {
        this.activeIndex = event.target.dataset.id;

        super.showSlide();
        this.toggleActive(this.slides, this.activeSlideClass);
        this.toggleActive(this.pages, this.activePageClass);
        if(!this.counterCurrent) return;
        this.countPages(this.counterCurrent);
        if(!this.lightBox) return;
        this.createCaption(event.target.getAttribute('alt'), this.pages);
      });
    });
  }

  /**
   * @method countPages
   * @description calculates current slide number
   * @param {HTMLElement} currentSlideNode - current count number node
   * @returns {undefined}
   */
  countPages(currentSlideNode) {
    currentSlideNode.textContent = parseInt(super.showSlide()) + 1;
  }

  /**
   * @method countTotal
   * @description calculates and inserts the total number of slides
   * @param {HTMLElement} totalSlideNode - total slide number node
   * @returns {undefined}
   */
  countTotal(totalSlideNode) {
    totalSlideNode.textContent = this.numItems;
  }

  /**
   * @method createCaption
   * @description creates caption text for lightBox photo gallery
   * @param {String} captionText - string taken from an image 'alt' attribute
   * @param {HTMLElement} galleryContainer - container to append caption text to
   */
  createCaption(captionText, galleryContainer) {
    if(!captionText || captionText.length < 2) captionText = 'Photo ' + parseInt(this.activeIndex + 1);
    
    let captionNode = document.querySelector('.gallery__caption');

    if(!captionNode) {
      captionNode = document.createElement('FIGCAPTION');
      captionNode.appendChild(document.createTextNode(captionText));
      captionNode.classList.add('gallery__caption');
      captionNode.setAttribute('aria-live', 'polite');
      galleryContainer.insertBefore(captionNode, galleryContainer.firstChild);
    }

    captionNode.textContent = captionText;
  }
}



/***/ }),

/***/ "./src/scripts/modals.js":
/*!*******************************!*\
  !*** ./src/scripts/modals.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "confirmModal": () => (/* binding */ confirmModal),
/* harmony export */   "lightboxModal": () => (/* binding */ lightboxModal),
/* harmony export */   "menuModal": () => (/* binding */ menuModal)
/* harmony export */ });
/**
 * Polyfill for HTML <dialog> element
 * @constant
 * @default
 */
 const dialogPolyfill = __webpack_require__(/*! ./dialog-polyfill */ "./src/scripts/dialog-polyfill.js");

 /**
  * @constant
  * @default
  * @member {HTMLElement}
  */
 const confirmModal = document.querySelector('.modal--confirm');
 
 /**
  * Register confirm modal node with dialog polyfill
  * @constant
  * @default
  * @memberof dialogPolyfill
  * @instance
  */
 dialogPolyfill.registerDialog(confirmModal);

 /**
 * Variable containing array of modal buttons
 * @type {Array.<HTMLElement>}
 */
let cancelButtons = document.querySelectorAll('.modal--confirm .btn');

/**
 * Close modal on click at any button from the array
 * @listens click
 * @fires confirmModal.close
 * @see {@link confirmModal.close}
 */
cancelButtons.forEach(button => {
  button.addEventListener('click', () => confirmModal.close());
});


/**
 * @constant
 * @default
 * @member {HTMLElement}
 */
const lightboxModal = document.querySelector('.modal--lightbox');
  
/**
 * Register lightbox modal node with dialog polyfill
 * @constant
 * @default
 * @memberof dialogPolyfill
 * @instance
 */
dialogPolyfill.registerDialog(lightboxModal);
 
/**
 * Variable for a lightBox modal close button
 * @member {HTMLElement}
 */
let lightboxCloseButton = document.querySelector('.modal--lightbox .btn--dismiss');

/**
 * Close modal on click at close button
 * @listens click
 * @fires lightboxModal.close
 */
lightboxCloseButton.addEventListener('click', () => lightboxModal.close());

/**
 * @constant
 * @default
 * @member {HTMLElement}
 */
 const menuModal = document.querySelector('.modal--menu');

 /**
 * Register menu modal node with dialog polyfill
 * @constant
 * @default
 * @memberof dialogPolyfill
 * @instance
 */
dialogPolyfill.registerDialog(menuModal);

/**
 * Variable for a menu modal close button
 * @member {HTMLElement}
 */
 let menuCloseButton = document.querySelector('.modal--menu .btn--dismiss');

 /**
 * Variable for a menu modal items
 * @member {HTMLElement}
 */
 let menuItems = document.querySelectorAll('.modal--menu .navbar__item--modal');

 /**
  * Close modal on click at close button
  * @listens click
  * @fires menuModal.close
  */
  menuCloseButton.addEventListener('click', () => menuModal.close());

  /**
  * Close modal on click at menu item
  * @listens click
  * @fires menuModal.close
  */
  menuItems.forEach(item => item.addEventListener('click', () => menuModal.close()));



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.scss */ "./src/styles/style.scss");
/* harmony import */ var _gallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery.js */ "./src/scripts/gallery.js");
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.js */ "./src/scripts/form.js");
/* harmony import */ var _accordion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accordion.js */ "./src/scripts/accordion.js");
/* harmony import */ var _modals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals.js */ "./src/scripts/modals.js");






/**
 * @name IIFE
 * @function
 * @description self-executing anonymous function
 * that sets current year in a footer copyright section
 * @param {undefined}
 * @returns {undefined}
 */
(() => {
  let date = new Date(),
      currentYearNode = document.querySelector('.copyright__year');

  if (currentYearNode.textContent.length > 0) currentYearNode.textContent = '';

  currentYearNode.appendChild(document.createTextNode(date.getFullYear()));
})();

/**
 * @function indexGalleries
 * @description enumerates slides and pages with the data-id attribute
 * @param {HTMLCollection} lists - a collection of HTML nodes
 * @returns {undefined}
 */
const indexGalleries = (lists) => {
  lists = Array.from(lists.children);
  lists.forEach((listItem, index) => listItem.setAttribute('data-id', `${index}`));
}

/**
 * Variable for a menu button
 * @member {HTMLElement}
 */
let menuButton = document.querySelector('.btn--menu');

/**
 * Shows menu modal
 * @listens click
 * @fires menuModal.showModal
 */
menuButton.addEventListener('click', () => _modals_js__WEBPACK_IMPORTED_MODULE_4__.menuModal.showModal());

/**
 * Variables for a snapshot gallery
 * @member {HTMLElement}
 */
let snapshotGallery = document.querySelector('.photoreport__snapshots'),
    snapshots = document.querySelectorAll('.photoreport__snapshot'),
    snapshotNext = document.querySelector('.gallery--photoreport .gallery__control--next'),
    snapshotPrev = document.querySelector('.gallery--photoreport .gallery__control--prev'),
    snapshotTotal = document.querySelector('.photoreport__total');

/**
 * @constant
 * @default
 * @memberof Gallery
 * @instance
 */
const snapshotSlider = new _gallery_js__WEBPACK_IMPORTED_MODULE_1__.Gallery(snapshotGallery, false);

/**
 * Variable containing method to show next snapshotGallery slide
 * this method was saved to be able to refer to it while adding/removing listeners
 * @memberof Gallery
 */
let nextSnapshot = () => snapshotSlider.next();
/**
 * Show next slide
 * @listens click
 * @fires next
 */
snapshotNext.addEventListener('click', nextSnapshot);

/**
 * Variable containing method to show previous snapshotGallery slide
 * this method was saved to be able to refer to it while adding/removing listeners
 * @memberof Gallery
 */
let prevSnapshot = () => snapshotSlider.prev();
/**
 * Show previous slide
 * @listens click
 * @fires prev
 */
snapshotPrev.addEventListener('click', prevSnapshot);

/**
 * @function stopSnapshotGallery
 * @description erases timeout id and removes event listeners in snapshotGallery
 * if MediaQueryListEvent.matches === true
 * @param {Object} event - MediaQueryListEvent
 * @returns {undefined}
 */
const stopSnapshotGallery = (event) => {
  if (event.matches) {
    clearTimeout(snapshotSlider.interval);
    snapshotNext.removeEventListener('click', nextSnapshot);
    snapshotPrev.removeEventListener('click', prevSnapshot);
  }
}

/**
 * Media query to control snapshotGallery
 * @constant
 * @default
 */
const mediumMedia = window.matchMedia('(min-width: 600px)');
/**
 * Listens to the changing of the viewport min-width
 * @listens change
 * @fires stopSnapshotGallery
 * @see {@link stopSnapshotGallery}
 */
mediumMedia.addEventListener('change', stopSnapshotGallery);

/**
 * Inserts total amount of photos in a snapshot gallery
 */
snapshotTotal.innerText = snapshots.length;

/**
 * Variables for a schedule gallery
 * @member {HTMLElement}
 */
let scheduleGallery = document.querySelector('.schedule__list'),
    schedulePages = document.querySelector('.gallery--schedule .gallery__pagination'),
    scheduleCountCurrent = document.querySelector('.gallery--schedule .gallery__current'),
    scheduleCountTotal = document.querySelector('.gallery--schedule .gallery__total'),
    scheduleNext = document.querySelector('.gallery--schedule .gallery__control--next'),
    schedulePrev = document.querySelector('.gallery--schedule .gallery__control--prev');

/**
 * Enumerated schedule gallery slides
 */
indexGalleries(scheduleGallery);

/**
 * Enumerated schedule gallery pages
 */
indexGalleries(schedulePages);

/**
 * @constant
 * @default
 * @memberof OwlCarousel
 * @instance
 */
const scheduleSlider = new _gallery_js__WEBPACK_IMPORTED_MODULE_1__.OwlCarousel(
        scheduleGallery,
        false,
        'gallery__slide--active',
        schedulePages,
        'gallery__page--active',
        scheduleCountCurrent);

/**
 * Show next schedule gallery slide
 * @listens click
 * @fires next
 */
scheduleNext.addEventListener('click', () => scheduleSlider.next());
/**
 * Show previous schedule gallery slide
 * @listens click
 * @fires prev
 */
schedulePrev.addEventListener('click', () => scheduleSlider.prev());

/**
 * Enables page navigation
 */
scheduleSlider.navigatePage();

/**
 * Inserts total amount of slides
 */
scheduleSlider.countTotal(scheduleCountTotal);
/**
 * Inserts starting slide number
 */
scheduleSlider.countPages(scheduleCountCurrent);

/**
 * @constant
 * @default
 * @member {HTMLElement}
 */
const FORM = document.getElementById('callback-form');
/**
 * @constant
 * @default
 * @type {Array.<string>}
 */
const FIELDS = ['phone-number'];

/**
 * @constant
 * @default
 * @memberof FormValidator
 * @instance
 */
const entryValidator = new _form_js__WEBPACK_IMPORTED_MODULE_2__["default"](FORM, FIELDS, '+1');
/**
 * Initializes form validation
 */
entryValidator.initialize();

/**
 * Initiates an accordion animation in FAQ section
 */
document.querySelectorAll('details').forEach((el) => {
  new _accordion_js__WEBPACK_IMPORTED_MODULE_3__["default"](el);
});

/**
 * Variables for a lightBox photo gallery
 * @member {HTMLElement}
 */
 let lightboxGallery = document.querySelector('.gallery--lightbox .gallery__fullsized'),
     lightboxThumbs = document.querySelector('.gallery--lightbox .gallery__thumbs'),
     lightboxCountCurrent = document.querySelector('.gallery--lightbox .gallery__current'),
     lightboxCountTotal = document.querySelector('.gallery--lightbox .gallery__total'),
     lightboxNext = document.querySelector('.gallery--lightbox .gallery__control--next'),
     lightboxPrev = document.querySelector('.gallery--lightbox .gallery__control--prev'),
     lightboxInit = document.querySelector('.gallery__slideshow');

/**
 * Enumerated lightBox photo gallery slides
 */
indexGalleries(lightboxGallery);

/**
 * Enumerated lightBox photo gallery thumbnails
 */
indexGalleries(lightboxThumbs);

/**
 * @constant
 * @default
 * @memberof OwlCarousel
 * @instance
 */
const lightboxSlider = new _gallery_js__WEBPACK_IMPORTED_MODULE_1__.OwlCarousel(
     lightboxGallery,
     false,
     'gallery__slide--active',
     lightboxThumbs,
     'gallery__thumb--active',
     lightboxCountCurrent,
     true);

/**
 * Show next lightBox photo gallery slide
 * @listens click
 * @fires next
 */
lightboxNext.addEventListener('click', () => lightboxSlider.next());
/**
 * Show previous lightBox photo gallery slide
 * @listens click
 * @fires prev
 */
lightboxPrev.addEventListener('click', () => lightboxSlider.prev());

/**
 * Enables thumbnail navigation
 */
lightboxSlider.navigatePage();

/**
 * Inserts total amount of lightBox photo gallery slides
 */
lightboxSlider.countTotal(lightboxCountTotal);
/**
 * Inserts starting lightBox photo gallery slide number
 */
lightboxSlider.countPages(lightboxCountCurrent);

/**
 * Creates initial caption for lightBox photo gallery
 */
lightboxSlider.createCaption(lightboxThumbs.children[0].getAttribute('alt'), lightboxThumbs);

/**
 * Distribute event listeners across all tiles in photoreport section
 */
snapshots.forEach((snapshot, index) => {
  snapshot.addEventListener('click', (event) => {
    _modals_js__WEBPACK_IMPORTED_MODULE_4__.lightboxModal.showModal();
    lightboxSlider.activeIndex = index;
    lightboxSlider.showSlide();
    lightboxSlider.countPages(lightboxCountCurrent);
    lightboxSlider.toggleActive(lightboxSlider.pages, lightboxSlider.activePageClass);
    lightboxSlider.createCaption(event.target.getAttribute('alt'), lightboxThumbs);
  });
});

/**
 * Show lightbox modal by clicking on 'All photos' link
 */
lightboxInit.addEventListener('click', (event) => {
  event.preventDefault();
  _modals_js__WEBPACK_IMPORTED_MODULE_4__.lightboxModal.showModal();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
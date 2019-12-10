"use strict";

window.objdragEditing = false;

$(function () {
    var grid = 80;
    var isdown = false, handlerInstalled = false;
    var eldrag = null;
    var eventName = "";
    var initialCellX = 0, initialCellY = 0;
    var contentWrapper = document.getElementById("content-wrapper");

    function cancelEvent(evt) {
		if (evt) {
			if ("isCancelled" in evt)
				evt.isCancelled = true;
			if ("preventDefault" in evt)
				evt.preventDefault();
			if ("stopPropagation" in evt)
				evt.stopPropagation();
		}
		return false;
    };

    function finishDrag() {
        if (handlerInstalled) {
            handlerInstalled = false;
            contentWrapper.removeEventListener(eventName, mousemove, true);
        }
        if (eldrag) {
            var cellX = (parseInt(eldrag.style.left) / grid) | 0;
            var cellY = (parseInt(eldrag.style.top) / grid) | 0;
            eldrag.style.left = (cellX * grid) + "px";
            eldrag.style.top = (cellY * grid) + "px";
            // @@@ excluir se necessário!
            eldrag = null;
        }
    }

    function mousemove(e) {
        if (!isdown)
            return;

        var clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
        var clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || 0;
        var rectParent = eldrag.parentNode.getBoundingClientRect();
        var x = (clientX - rectParent.left) | 0;
        var y = (clientY - rectParent.top) | 0;
        var cellX = (x / grid) | 0;
        var cellY = (y / grid) | 0;
        eldrag.style.left = (cellX * grid) + "px";
        eldrag.style.top = (cellY * grid) + "px";
        eldrag.cellX = cellX;
        eldrag.cellY = cellY;
        return cancelEvent(e);
    }

    function mouseup() {
        isdown = false;
        if (eldrag) {
            var i, item, items = $("#content-wrapper .room-object"), overlaps = false;
            var el = eldrag.cellX, et = eldrag.cellY;
            var er = el + eldrag.cellW, eb = et + eldrag.cellH;
            for (i = items.length - 1; i >= 0; i--) {
                item = items[i];
                if (item === eldrag)
                    continue;
                var il = item.cellX, it = item.cellY;
                var ir = il + item.cellW, ib = it + item.cellH;
                if (el < ir && et < ib && il < er && it < eb) {
                    overlaps = true;
                    break;
                }
            }

            if (overlaps) {
                eldrag.style.left = (initialCellX * grid) + "px";
                eldrag.style.top = (initialCellY * grid) + "px";
                eldrag.cellX = initialCellX;
                eldrag.cellY = initialCellY;
            }
        }
        finishDrag();
        // @@@
    }

    if (("ontouchend"in document)) {
        contentWrapper.addEventListener("touchstart", function (e) {
            if (!objdragEditing ||
                e.target.className.indexOf("objdrag") < 0)
                return;
    
            if (eldrag) {
                finishDrag();
            } else {
                isdown = true;
                eldrag = e.target;
                initialCellX = eldrag.cellX;
                initialCellY = eldrag.cellY;
                handlerInstalled = true;
                contentWrapper.addEventListener(eventName = "touchmove", mousemove, { capture: true, passive: false });
            }
    
            return cancelEvent(e);
        }, { capture: true, passive: false });
    
        contentWrapper.addEventListener("touchend", mouseup, { capture: true, passive: false });
    }

    contentWrapper.addEventListener("mousedown", function (e) {
        if (e.button ||
            !objdragEditing ||
            e.target.className.indexOf("objdrag") < 0)
            return;

        if (eldrag) {
            finishDrag();
        } else {
            isdown = true;
            eldrag = e.target;
            initialCellX = eldrag.cellX;
            initialCellY = eldrag.cellY;
            handlerInstalled = true;
            contentWrapper.addEventListener(eventName = "mousemove", mousemove, true);
        }

        return cancelEvent(e);
    }, true);

    contentWrapper.addEventListener("mouseup", mouseup, true);
});

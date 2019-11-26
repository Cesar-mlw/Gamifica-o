"use strict";

window.objdragEditing = true;

(function () {
    var grid = 80;
    var isdown = false, handlerInstalled = false;
    var eldrag = null;

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
            document.removeEventListener("mousemove", mousemove, true);
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

        var rectParent = eldrag.parentNode.getBoundingClientRect();
        var x = (e.clientX - rectParent.left) | 0;
        var y = (e.clientY - rectParent.top) | 0;
        var cellX = (x / grid) | 0;
        var cellY = (y / grid) | 0;
        eldrag.style.left = (cellX * grid) + "px";
        eldrag.style.top = (cellY * grid) + "px";
    }

    document.addEventListener("mousedown", function (e) {
        if (e.button ||
            !objdragEditing ||
            e.target.className.indexOf("objdrag") < 0)
            return;

        if (eldrag) {
            finishDrag();
        } else {
            isdown = true;
            eldrag = e.target;
            handlerInstalled = true;
            document.addEventListener("mousemove", mousemove, true);
        }

        return cancelEvent(e);
    }, true);

    document.addEventListener("mouseup", function (e) {
        isdown = false;
        finishDrag();
    }, true);
})();

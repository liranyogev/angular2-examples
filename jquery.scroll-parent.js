// Taken from jQuery UI
(function ($) {
    $.fn.scrollParent = function () {
        var position = this.css("position"), excludeStaticParent = position === "absolute", overflowRegex = /(auto|scroll)/, scrollParent = this.parents().filter(function () {
            var parent = $(this);
            if (excludeStaticParent && parent.css("position") === "static") {
                return false;
            }
            return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
        }).eq(0);
        return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
    };
})(jQuery);

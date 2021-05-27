import Vue from 'vue';
import marked from 'marked';

/**
 * limitTo
 * limitTo string
 */
Vue.filter( "limitTo", function (str, index) {
    if (!str) { return; }
    return str.slice(0, index);
})

/**
 * toMarkDown
 * convert string to the markdown format
 */
Vue.filter("toMarkDown", function (content) {
    if (!content) { return; }
    return marked(content);
})

/**
 * toChinaTime
 * convert time to the china format
 */
Vue.filter("toChinaTime", function (time) {
    Date.prototype.toRelativeTime = function (now_threshold) {
        var delta = new Date() - this;
        now_threshold = parseInt(now_threshold, 10);

        if (isNaN(now_threshold)) { now_threshold = 0; }
        if (delta <= now_threshold) { return '1 秒'; }

        var units = null;
        var conversions = {
            '毫秒': 1,        // ms    -> ms
            '秒': 1000,       // ms    -> sec
            '分钟': 60,       // sec   -> min
            '小时': 60,       // min   -> hour
            '天': 24,         // hour  -> day
            '个月': 30,       // day   -> month (roughly)
            '年': 12          // month -> year
        };

        for (var key in conversions) {
            if (delta < conversions[key]) {
                break;
            } else {
                units = key; // keeps track of the selected key over the iteration
                delta = delta / conversions[key];
            }
        }

        // pluralize a unit when the difference is greater than 1.
        delta = Math.floor(delta);
        return [delta, units].join(" ");
    };
    const date = new Date(time).toRelativeTime();
    if (date.indexOf('毫秒') !== -1) { return "1 秒前" }
    return date + '前';
})

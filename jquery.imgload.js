/**
 * Created with IntelliJ IDEA.
 * User: Jesse.Liang
 * Date: 2015/7/31 16:10
 */

//设计师后台优化，封面图不再是正方形，所以图片展示需要上下左右居中，无论图片宽高如何
//How to Use
//$(function () {
//    $('img').loadImage();
//})


;(function($, window, undefined) {

    var loadImage = function(obj) {
        this.obj = obj;

        this.load();
    };

    loadImage.prototype = {

        //加载图片
        load : function() {
            var _this = this,
                imgUrl = this.obj.data('src'),
                newImg = new Image();

            newImg.src = imgUrl;

            newImg.onload = function() {
                _this.obj.hide();
                _this.obj.attr('src', imgUrl);
                _this.obj.fadeIn(300);

                _this.position(this.width, this.height);

                _this.obj.removeAttr('data-src');
            };

        },

        // 设置图片位置，不论图片宽高如何，始终在盒子里上下左右居中显示。
        position: function() {
            var imgWidth = this.obj.width(),
                imgHeight = this.obj.height();
            if( imgWidth / imgHeight == 1) return;
            if(parseFloat(imgWidth / imgHeight) > 1) {
                //宽大于高，扁矮
                this.obj.css({'height' : 'auto', 'width': '100%'});
            } else {
                //宽小于高，长高形图片
                this.obj.css({'height' : '100%', 'width' : 'auto'});
            }
            return this;
        }

    };

    $.fn.loadImage = function() {
        this.each(function(){
            new loadImage($(this));
        })
    }
})(jQuery);

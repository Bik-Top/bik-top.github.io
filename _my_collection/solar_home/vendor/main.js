document.addEventListener("DOMContentLoaded", Ready);
function Ready(){

}

var paper = Snap("#svg");

var button  = paper.select('#button-dn');
var button_day  = paper.select('#button_day');
var metr_1  = paper.select('#metr_1');
var mult_1  = paper.select('#mult_1');
var mult_2  = paper.select('#mult_2');

var night   = paper.select('#Night_Elements');
var skay    = paper.select('#skay');
var sun     = paper.select('.sun_wrap');
var cloudth = paper.selectAll('.clouds');
var stars = paper.selectAll('.cls-22m');

var wash_machine = paper.select('#wash_machine');
var refrigerator = paper.select('#refrigerator');
var sound_sistem = paper.select('#sound_sistem');
var climat       = paper.select('#climat');
var microwave    = paper.select('#Microwave');
var question_right = paper.select('#question_right');

var total_power               = paper.select('#total_power');
var solar_power               = paper.select('#solar_power');
var grid_power_contribution   = paper.select('#grid_power_contribution');
var electric_fed_back_to_grid = paper.select('#electric_fed_back_to_grid');
var arrow_out_wrapper         = paper.select('.arrow_out_wrapper');
var arrow_into_wrapper        = paper.select('.arrow_into_wrapper');
var question_right_up         = paper.select('#question_right_up');
var vovan_solar = paper.select('#vovan-solar');
var rec= setTimeout(function(){
    vovan_solar.animate({transform: 't0, 0' }, 600, mina.elastic, function(){
        clearTimeout(rec)
    } );
}, 300);

var power = {
    trigg: 0,
    solar_panel_max: 4000,
    solar_panel: 0,
    wash_machine: 1000,
    refrigerator:500,
    sound_sistem:200,
    climat: 1500,
    Microwave: 1500
};
var power_arr = [];

button.attr({day:'1'});

button.click(nightDey);
button_day.click(nightDey);

metr_1.animate({ transform: 'r90, 349.512, 583.372' }, 600, mina.linear );
mult_1.attr({ id: 'mult_1-on' });

var right_question_text_up_day = document.querySelector('#bubble_3 > g:first-child');
var right_question_text_up_night = document.querySelector('#bubble_3 > g:last-child');
var randNum;
var randNumOld;
function getRandomInt(max, min) {
    randNum = Math.floor(Math.random() * (max - min + min)) + min;
    if (randNum == randNumOld) {
        getRandomInt(255, randNum, 0);
    }
    randNumOld = randNum;
    return randNum;
}


(function() {
    stare();

    setTimeout(arguments.callee, 1000);
})();

function stare(){
   //console.log(randNum);
    stars[getRandomInt(stars.length, 0)].attr({class: 'cls-22m-scal'});
    stars[randNum].animate({ opacity: getRandomInt(1, 0.8)}, getRandomInt(900, 600), mina.elastic() );
 /*   for(var i=0; i<stars.length; i+=1){
        if(stars[i].attr('opacity') === 1){
            stars[i].animate({  opacity: getRandomInt(1, 0.5)}, getRandomInt(900, 600), mina.elastic() );
        }
    }*/

    power.trigg = power.trigg+1;

    if(power.trigg >stars.length){
        stare_clear();
        power.trigg = 0;
    }
    return true;
}
function stare_clear(){
    for(var i=0; i<stars.length; i+=1){
        if(stars[i].attr('opacity') !== 1){
            stars[i].animate({opacity: 1}, 1000, mina.elastic() );
        }
        stars[i].attr({ class: 'cls-22m'});
    }
}

function nightDey(){
    if(button.attr('day') == 1){ //переключатель на ночь
        right_question_text_up_day.classList.remove('_on');
        right_question_text_up_day.classList.add('_off');
        right_question_text_up_night.classList.remove('_off');
        right_question_text_up_night.classList.add('_on');

        skay.animate({fill: 'rgb(76, 64, 114)'}, 800, mina.linear());
        button.animate({ transform: 't40, 0'  }, 300, mina.easing );
        sun.animate({ transform: 't0, -600', opacity:0 }, 600, mina.easing );
        cloudth.animate({ transform: 't0, 600', opacity:0 }, 600, mina.easing );
        night.animate({ transform: 't0, 0', opacity: 1 }, 600, mina.easing );

        button.attr({id:'button-dn-on', day:'0'});
        power.solar_panel_max = 4000;
        something_do(button.attr('day'));

    }else{
        right_question_text_up_day.classList.remove('_off');
        right_question_text_up_day.classList.add('_on');
        right_question_text_up_night.classList.remove('_on');
        right_question_text_up_night.classList.add('_off');

        skay.animate({ fill: 'rgb(226, 244, 253)' }, 800, mina.linear());
        button.animate({ transform: 't0, 0' }, 300, mina.easing );
        sun.animate({ transform: 't0, 0', opacity: 1 }, 600, mina.easing );
        cloudth.animate({ transform: 't0, 0', opacity: 1 }, 600, mina.easing );
        night.animate({ transform: 't0, 600', opacity: 0 }, 600, mina.easing );

        button.attr({id:'button-dn', day:'1'});
        //arrow_into_wrapper
        power.solar_panel_max = 0;
        something_do(button.attr('day'));

    }

    _svg.toggleBySelector('#question_left');
    _svg.toggleBySelector('#question_right');
    _svg.toggleBySelector('.arrow_left_wrapper');

    total_power_counter();
}
wash_machine.click(householdAppliances);
refrigerator.click(householdAppliances);
sound_sistem.click(householdAppliances);
climat.click(householdAppliances);
microwave.click(householdAppliances);

function householdAppliances() {
    var el = this;
    var arr = el.selectAll('.cls-6');

    if (this.attr('class') === 'active') {
        this.attr({
            class: '',
            set_power: ''
        });
        for(var i=0; i<arr.length; i+=1){
            arr[i].animate({  opacity: 1 }, 600, mina.easing );
        }

        var get_count = power_arr.indexOf(power[this.node.id]);
        if(get_count != -1) {
            power_arr.splice(get_count, 1);
        }

    }else{
        this.attr({
            class: 'active',
            set_power: power[this.node.id]
        }, something_do(arr.items));

        power_arr.push(power[this.node.id]);
    }

    total_power_counter();
}


function total_power_counter(){
    var sum = power_arr.reduce(function(a, b) { return a + b; }, 0);
    Snap.animate(0, 0, function (value) {
        solar_power.attr({text: 0 + ' W'}) ;
        electric_fed_back_to_grid.attr({text: 0 + ' W'}) ;
        grid_power_contribution.attr({text: 0+ ' W'}) ;
        total_power.attr({text: 0+ ' W'}) ;
    }, 1000);

    Snap.animate(0, sum, function (value) {
        total_power.attr({text: Math.round(value)+ ' W'}) ;
    }, 1000);


    if(button.attr('day') == 1){
        power.solar_panel_max = 4000;
        if(power.solar_panel_max-sum>0){
            Snap.animate(0, power.solar_panel+sum, function (value) {
                solar_power.attr({text: Math.round(value)+ ' W'}) ;
            }, 1000);
            Snap.animate(0, power.solar_panel_max-sum, function (value) {
                electric_fed_back_to_grid.attr({text: Math.round(value)+ ' W'}) ;
            }, 1000);

            arrow_into_wrapper.attr({
                class:'off'
            });
            question_right_up.attr({
                class: 'off'
            });
            arrow_out_wrapper.attr({
                class:'on'
            });
            question_right.attr({
                class:'on'
            });

            mult_1.attr({ id: 'mult_1-on' });
            mult_2.attr({ id: 'mult_2-off' });

            metr_1.animate({ transform: 'r90, 349.512, 583.372' }, 600, mina.linear );
        }
        else if(power.solar_panel_max-sum == 0){
            Snap.animate(0, power.solar_panel_max, function (value) {
                solar_power.attr({text: Math.round(value)+ ' W'}) ;
            }, 1000);

            arrow_into_wrapper.attr({
                class:'off'
            });
            question_right_up.attr({
                class: 'off'
            });
            arrow_out_wrapper.attr({
                class:'off'
            });
            question_right.attr({
                class:'off'
            });
            metr_1.animate({ transform: 'r90, 349.512, 583.372' }, 600, mina.linear );
            mult_1.attr({ id: 'mult_1-off' });
            mult_2.attr({ id: 'mult_2-off' });
        }else{ //от ЭС
            Snap.animate(0, Math.abs(power.solar_panel_max-sum), function (value) {
                grid_power_contribution.attr({text: Math.round(value)+ ' W'}) ;
            }, 1000);
            Snap.animate(0, power.solar_panel_max, function (value) {
                solar_power.attr({text: Math.round(value)+ ' W'}) ;
            }, 1000);
            arrow_into_wrapper.attr({
                class:'on'
            });
            question_right_up.attr({
                class: 'on'
            });
            arrow_out_wrapper.attr({
                class:'off'
            });
            question_right.attr({
                class:'off'
            });
            metr_1.animate({ transform: 'r90, 349.512, 583.372' }, 600, mina.linear );
            mult_1.attr({ id: 'mult_1-off' });
            mult_2.attr({ id: 'mult_2-on' });
        }
    }else{
    // ночное время
        power.solar_panel_max = 0;
        Snap.animate(0, sum, function (value) {
            grid_power_contribution.attr({text: Math.round(value)+ ' W'}) ;
        }, 1000);

        arrow_into_wrapper.attr({
            class:'on'
        });
        arrow_out_wrapper.attr({
            class:'off'
        });
        question_right.attr({
            class:'off'
        });
        question_right_up.attr({
            class:'on'
        });

        metr_1.animate({ transform: 'r-90, 349.512, 583.372' }, 600, mina.linear );
        mult_1.attr({ id: 'mult_1-off' });
    }
}

/* тут колбек клика по прибору */
function something_do(arr){
    var arr_wire;

    if(Object.prototype.toString.call(arr)==="[object Array]"){
        for(var i=0; i<arr.length; i+=1){
            arr[i].animate({  opacity: 0 }, 600, mina.easing );
        }
    }
//blink effeckt
    if(button.attr('day') == 1){
        arr_wire = paper.selectAll('.wire_off');
        for(var k=0; k<arr_wire.length; k+=1){
            arr_wire[k].animate({  opacity: 0 }, 600, mina.easing );
        }
        mult_1.attr({ id: 'mult_1-on' });
    }else{
        mult_2.attr({ id: 'mult_2-on' });
         arr_wire = paper.selectAll('.wire_off');
        for(var j=0; j<arr_wire.length; j+=1){
            arr_wire[j].animate({  opacity: 1 }, 600, mina.easing );
        }
    }
}

var _svg = function() {

    var animateElements = {
        questions: {
            leftIcon: "#question_left",
            leftText: "#bubble_1",
            rightIcon: '#question_right',
            rightText: '#bubble_2',
            rightIconUp: '#question_right_up',
            rightTextUp: '#bubble_3'
        },
        mboxDevices: [
            '#solar-panels',
            '#inverter',
            '#ac_distribution',
            '#wash_machine',
            '#refrigerator',
            '#sound_sistem',
            '#Microwave',
            '#climat',
            '#device-input-output',
            '#device-solar-input-output'
        ]
    };

    function init() {

        _private.initEvents();

        var svg = document.querySelector("#svg");
        window.addEventListener('resize', changeSVGHeight);
        window.addEventListener('load', changeSVGHeight)

        function changeSVGHeight(event){

            if(svg.clientWidth < window.innerWidth){
                svg.style.height = window.innerHeight;
            }
        }

    }

    var _private = {

        initEvents: function () {

            function addClickToQuesion(icon, text) {

                var question = document.querySelector(icon);
                var timeout = null;
                question.addEventListener('click', function (event) {

                    if(timeout){
                        clearTimeout(timeout);
                    }

                    if (event.currentTarget.classList.contains('on')) {
                        console.log(event.currentTarget.classList.contains('on'));
                        _public.toggleBySelector(text);
                    }

                    timeout = setTimeout(function(){

                        this.classList.remove('on');
                        this.classList.add('off');
                    }.bind(document.querySelector(text)), 5000);

                }.bind(this));

            }

            addClickToQuesion(animateElements.questions.leftIcon, animateElements.questions.leftText);
            addClickToQuesion(animateElements.questions.rightIcon, animateElements.questions.rightText);
            addClickToQuesion(animateElements.questions.rightIconUp, animateElements.questions.rightTextUp);

            !function mBoxBindings(){

                animateElements.mboxDevices.forEach(function(element){

                    element = document.querySelector(element);

                    var timeout = null;
                    element.addEventListener('click', function(event){

                        if(timeout){
                            clearTimeout(timeout);
                        }

                        var mbox_selector = event.currentTarget.getAttribute('data-mbox');
                        var mbox = document.querySelector(mbox_selector);
                        _private.toggleBy(mbox);

                        timeout = setTimeout(function(){
                            mbox.classList.remove('on');
                            mbox.classList.add('off');
                        }, 8000);

                    });

                });
            }();

        },
        toggleBy: function (element) {

            if (element.classList.contains("show") || !element.classList.contains("hide")) {
                element.classList.remove("show");
                element.classList.add('hide');
            } else {
                element.classList.remove("hide");
                element.classList.add("show");
            }

            if (element.classList.contains("on") || !element.classList.contains("off")) {

                element.classList.remove("on");
                element.classList.add('off');
            } else {
                element.classList.remove("off");
                element.classList.add("on");
            }
        }

    };

    var _public = {

            toggleByID: function (id) {

                var element = document.getElementById(id);

                _private.toggleBy(element);
            },
            toggleBySelector: function (selector) {

                var element = document.querySelector(selector);

                _private.toggleBy(element);
            }

        };

    init();
    return _public;

}();

var PresentationAdditions = function(){

    var elements = {
        popup : '#main_popup',
        popup_close: '#main_popup .close-button',
        popup_wrapper: '.popup_wrapper',
        popup_open_button: '#popup_open_button'
    };

    var _private = {
        bindings: function(){

            !function openPopupOnClick(){

                var popup_button = _private.getElement(elements.popup_open_button);
                var body = document.body;

                popup_button.onclick = function(){
                    _private.toggleBy(elements.popup_wrapper);
                    body.style.overflow = 'hidden';
                };

            }();

            !function closePopupOnClick(){

                var popup_close = _private.getElement(elements.popup_close);
                var body = document.body;

                popup_close.onclick = function(){
                    _private.toggleBy(elements.popup_wrapper);
                    body.style.overflow = 'auto';
                }
            }();

        },
        getElement: function(element){
            return document.querySelector(element);
        },
        toggleBy: function (selector) {

            var element = document.querySelector(selector);

            if (element.classList.contains("on") || !element.classList.contains("off")) {

                element.classList.remove("on");
                element.classList.add('off');
            } else {
                element.classList.remove("off");
                element.classList.add("on");
            }
        }
    };

    var _public = {

    };

    function init(){

        _private.bindings();
    }

    init();
    return _public;

}();


(function arrow_out(){

    var arrowelementID = "arrow_out";
    var arrowElement = document.querySelector("svg #"+arrowelementID);
    var arrowElementAnimation = document.querySelector("svg .arrow_out_animation_wrapper animateMotion");
    var arrowElementsWrapper = document.querySelector("svg g .arrow_out_wrapper");
    var arrowElementsAnimationWrapper = document.querySelector("svg .arrow_out_animation_wrapper");

    var arrowIntoelementID = "arrow_into";
    var arrowIntoElement = document.querySelector("svg #"+arrowIntoelementID);
    var arrowIntoElementAnimation = document.querySelector("svg .arrow_into_animation_wrapper animateMotion");
    var arrowIntoElementsWrapper = document.querySelector("svg g .arrow_into_wrapper");
    var arrowIntoElementsAnimationWrapper = document.querySelector("svg .arrow_into_animation_wrapper");

    var arrowLeftlementID = "arrow_left";
    var arrowLeftElement = document.querySelector("svg #"+arrowLeftlementID);
    var arrowLeftElementAnimation = document.querySelector("svg .arrow_left_animation_wrapper animateMotion");
    var arrowLeftElementsWrapper = document.querySelector("svg g .arrow_left_wrapper");
    var arrowLeftElementsAnimationWrapper = document.querySelector("svg .arrow_left_animation_wrapper");

    var arrowsCount = 10;
    var duration = 10;
    var queueTimeStartDelta = duration / arrowsCount;

    arrowElementAnimation.setAttribute("dur",duration + "s");
    arrowIntoElementAnimation.setAttribute("dur",duration + "s");
    arrowLeftElementAnimation.setAttribute("dur",duration + "s");

    loopArrows();

    function loopArrows(){
        arrowsCount =20; //arrow out
        var ii;
        for( ii=1; ii < arrowsCount; ii++){

            newClonedArrow(ii, arrowElement, arrowElementsWrapper);
            newClonedAnimation(ii, arrowElementAnimation, arrowElementsAnimationWrapper);
        }

       arrowsCount = 8;//arrow in
        //duration = 5;
        queueTimeStartDelta = duration / arrowsCount;

        for( ii=1; ii < arrowsCount; ii++){

            newClonedArrow(ii, arrowIntoElement, arrowIntoElementsWrapper);
            newClonedAnimation(ii, arrowIntoElementAnimation, arrowIntoElementsAnimationWrapper);
        }


        arrowsCount = 14;//arrow left
       duration =14;
        queueTimeStartDelta = duration / arrowsCount;

        for( ii=1; ii < arrowsCount; ii++){

            newClonedArrow(ii, arrowLeftElement, arrowLeftElementsWrapper);
            newClonedAnimation(ii, arrowLeftElementAnimation, arrowLeftElementsAnimationWrapper);
        }


        function newClonedArrow(id, element, wrapper){

            var arrow = element.cloneNode(true);
            arrow.id = arrowelementID + "_" + id;

            wrapper.appendChild(arrow);
        }

        function newClonedAnimation(id, element, wrapper){

            var animation = element.cloneNode(true);

            animation.setAttribute('xlink:href',"#" + arrowelementID + "_" + id );
            animation.setAttribute('begin', (queueTimeStartDelta * id) + "s");

            wrapper.appendChild(animation);
        }
    }

}());


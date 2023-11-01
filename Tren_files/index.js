/*Inspired by the Dribble shot: "Timer UI Design (IWatch)" by Mark Gerkules
 https://dribbble.com/shots/2926263-Timer-UI-Design-IWatch*/

const password = '12345';

$(document).ready(function() {
  
  $('#signin').click(() => {
    if($('#inputPassword').val() === password)
      $('.signin-container').css('display', 'none');
  });


  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 0,
	  loop: true,
		effect: 'fade',
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    speed: 2000
  });
  let audio_vdoh = new Audio('./Tren_files/sokol_in.mp3');
  let audio_vidoh = new Audio('./Tren_files/sokol_out.mp3');
	
	const sound_vdoh = [
    './Tren_files/sokol_in.mp3',
    './Tren_files/bear_in.mp3',
    './Tren_files/turtle_in.mp3',
    './Tren_files/wolf_in.mp3'
	];
	const sound_vidoh = [
    './Tren_files/sokol_out.mp3',
    './Tren_files/bear_out.mp3',
  	'./Tren_files/turtle_out.mp3',
    './Tren_files/wolf_out.mp3'
	];
  $('.select > div').on('click', function() {
    audio_vdoh.pause();
    audio_vidoh.pause();	
    const index = +$(this).data('val');
    audio_vdoh = new Audio(sound_vdoh[index]);
    audio_vidoh = new Audio(sound_vidoh[index]);

    if ($(this).hasClass('active')) {}
    else {					
      $('.select > div').removeClass('active');
      $(this).addClass('active');
      $('select.pranas').val(index);
      function sayHi() {
        $('select.pranas').change();						
      }
      setTimeout(sayHi, 300);
    }
  });

    var line = 628;
    var time_line = 502.4;
    var isPlaying = false;
    var timer_prepare = 3;
    var my_choose = 0;
    var duration = 1;
    var full_time = 6;
    var main_timer=0;
    var prepare_done=false;
    var map = {};
    var timerInt;
    var timer;
    //var audio = audio.pause();
    var audio = new Audio('./Tren_files/ding.mp3');
    var audio_finish = new Audio('./Tren_files/bell_w.wav');
    names();
    var ar_offsets = [];
    var pranas = ["vdoh1","vidoh1","zaderj1","vdoh2","vidoh2","zaderj2"];
    var types = [
      {
        name:"Сокол",
        vdoh1: 1,
        vidoh1:7,
        seq: "0,1"
      },
		  {
        name:"Медведь",
        vdoh1: 7,
        vidoh1:1,
        seq: "0,1"
      },
      {
        name:"Черепаха",
        vdoh1: 10,
        vidoh1:10,
        seq: "0,1"

      },    
      {
        name:"Волк",
        vdoh1: 1,
        vidoh1: 1,
		    vdoh2: 1,
    		vidoh2: 1,
        seq: "0,1,3,4"

      },
    ];

    list_of_pranas();
    initVars(0);
    $('select.pranas').change(function(){
      //var selectedOption = $('option:selected', $(this)); // your selected option object(element)
      var prana = $(this).val(); // your selected option value
    //alert(current);
      timer = null;
      clearInterval(timerInt);
      isPlaying = false;
      prepare_done=false;
      $('.svg-play').attr("src","./Tren_files/play-button.svg");

      audio_vdoh.pause();
      audio_vidoh.pause();
      initVars(prana);

    });


    //var button = document.getElementById('play');
    //button.addEventListener('click',function(){


      //audio.play();
      //audio.pause();
    //});

    //document.getElementById('play').addEventListener('click',function(){
      //audio.play();
      //audio.pause();
      //audio_vdoh.play();
      //audio_vdoh.pause();
      //audio_vidoh.play();
      //audio_vidoh.pause();
      //audio_finish.play();
      //audio_finish.pause();

    //});
    function stopPlay() {
      audio.pause();
      audio_vdoh.pause();
      audio_vidoh.pause();
      audio_finish.pause();
    }
    var rangeSlider = function(){
    var slider = $('.range-slider'),
    range = $('.range-slider__range'),
    value = $('.range-slider__value');

    slider.each(function(){

      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });

      range.on('input', function(){
        $(this).next(value).html("    " +this.value);
      });
    });
    };

    rangeSlider();

    $('.menu').on('click', function() {
      //alert("Menu");
      document.getElementById("o-timer-wrap").style.display="none";
      document.getElementById("menu-style").style.display="block";

      clearInterval(timerInt);
      if(isPlaying){
          isPlaying = false;

          $('.svg-play').attr("src","./Tren_files/play-button.svg");
      }
      prepare_done=false;

      audio_vdoh.pause();
      audio_vidoh.pause();


    });

    $('.save').on('click', function() {
      full_time=document.getElementById("range-slider__value").innerText;
      back_to_ring();
    });

    $('.cancel').on('click', function() {
      back_to_ring();
    });

    function back_to_ring (){
      document.getElementById("o-timer-wrap").style.display="block";
      document.getElementById("menu-style").style.display="none";
      clearInterval(timerInt);
      initVars(my_choose);

    }

    $('.play').on('click', function() {
      //audio.play();


      var c = parseInt(document.getElementById("vdoh1").style.strokeDashoffset);
      var c_time = time_line ;
      //var rings_of_duration = Math.ceil(full_time*60/duration);
      var nameArr = types[my_choose].seq.split(',');
      var timer_prepare_w = timer_prepare;
      //if (timer === undefined || timer === null) {
      timer = types[my_choose].vdoh1;
      prepare_done=false;
      //}

      if (!isPlaying) {
        //alert(isPlaying);
        isPlaying=true;
        $('.svg-play').attr("src","./Tren_files/pause-button.svg");
        //document.getElementById("svg-play").src="pause-button.svg";

        timerInt = setInterval(function() {

            if(!prepare_done) {
              //isPlaying=true;
              //alert("Приготовьтесь");
              $('.t-time').text("Приготовьтесь");
              $('.oop').text(timer_prepare_w);
              if(timer_prepare_w == 0 ){
                isPlaying = true;
                prepare_done=true;
                main_timer=0;
                audio.play();
              }
              timer_prepare_w = timer_prepare_w - 1;
              document.getElementById("ring_duration").style.strokeDashoffset=c_time;
            }else{
            //alert(c_time);
            //isPlaying = true;
            c_time = c_time - time_line/((Math.floor((full_time*60)/duration))*duration);
            c_time=Math.ceil(c_time);
            //alert((Math.floor(full_time*60/duration))*duration);
            c = c - 628/duration;
            c = Math.ceil(c);
            document.getElementById("ring_duration").style.strokeDashoffset=c_time;
            var t = 0;
           var nameArr = types[my_choose].seq.split(',');
            if (c <= 0 && c>=ar_offsets[0]){
                if (timer == 0) {
                  timer = ar_timers[0];
                  audio.play();
                }
                document.getElementById(pranas[nameArr[0]]).style.strokeDashoffset=c;

                $('.t-time').text(map[pranas[nameArr[0]]]);
                //alert(map[pranas[nameArr[0]]]);


            } else if (c <= ar_offsets[0] && c>=ar_offsets[1]) {

                if (timer == 0) {
                  timer = ar_timers[1];
                  audio.play();
                }
                t=1;
                document.getElementById(pranas[nameArr[1]]).style.strokeDashoffset=c;
                $('.t-time').text(map[pranas[nameArr[1]]]);
                document.getElementById(pranas[nameArr[0]]).style.visibility="hidden";

            } else if (c <= ar_offsets[1] && c>=ar_offsets[2]){
                if (timer == 0) {
                  timer = ar_timers[2];
                  audio.play();
                }
                t=2;
              document.getElementById(pranas[nameArr[2]]).style.strokeDashoffset=c;
              $('.t-time').text(map[pranas[nameArr[2]]]);
              document.getElementById(pranas[nameArr[1]]).style.visibility="hidden";

            }else if (c <= ar_offsets[2] && c>=ar_offsets[3]){
              if (timer == 0) {
                timer = ar_timers[3];
                audio.play();
              }
              t=3;
              document.getElementById(pranas[nameArr[3]]).style.strokeDashoffset=c;
              $('.t-time').text(map[pranas[nameArr[3]]]);
              document.getElementById(pranas[nameArr[2]]).style.visibility="hidden";
              //alert(ar_offsets[3]);
              //alert(c);
            }else if (c <= ar_offsets[3] && c>=ar_offsets[4]){

              if (timer == 0) {
                timer = ar_timers[4];
                audio.play();
              }
              t=4;
              document.getElementById(pranas[nameArr[4]]).style.strokeDashoffset=c;
              $('.t-time').text(map[pranas[nameArr[4]]]);
              document.getElementById(pranas[nameArr[3]]).style.visibility="hidden";

            }else if (c <= ar_offsets[4] && c>=ar_offsets[5]){
              if (timer == 0) {
                timer = ar_timers[5]; 
                audio.play();
              }
              t=5;
              document.getElementById(pranas[nameArr[5]]).style.strokeDashoffset=c;
              $('.t-time').text(map[pranas[nameArr[5]]]);
              document.getElementById(pranas[nameArr[4]]).style.visibility="hidden";

            }else{
              timer = 1;
              //alert(c);
              c=0;
              main_timer++;
              if(main_timer >= Math.floor(full_time*60/duration)){
                $('.t-time').text("Поздравляем!");
                //$('.oop').text(":)");
                //timer = ":)";
                $('.svg-play').attr("src","./Tren_files/play-button.svg");
                //audio_vdoh.pause();
                //audio_vidoh.pause();
                audio_finish.play();
                main_timer=0;
                clearInterval(timerInt);
                isPlaying = false;
                prepare_done=false;
              }
              if(!audio_vidoh.paused) audio_vidoh.pause();
              if(!audio_vdoh.paused) audio_vdoh.pause();
              initVars(my_choose);

            }
            if(isPlaying){
              var stat = map[pranas[nameArr[t]]];
              if(stat=="Вдох" && c != 0){
				        if(!audio_vidoh.paused) audio_vidoh.pause();
                if(audio_vdoh.paused) audio_vdoh.play();
              }else if (stat=="Выдох" && c != 0) {
                if(audio_vidoh.paused) audio_vidoh.play();
                if(!audio_vdoh.paused) audio_vdoh.pause();
              }else{
                if(!audio_vidoh.paused) audio_vidoh.pause();
                if(!audio_vdoh.paused) audio_vdoh.pause();
              }
            }
            $('.oop').text(timer);
            timer = timer - 1;
            if(!isPlaying)$('.oop').text(":)");
          }
        },1000);
      }else{
        initVars(my_choose);
        $('.svg-play').attr("src","./Tren_files/play-button.svg");
        clearInterval(timerInt);
        isPlaying = false;
        stopPlay();

      }
        //document.getElementById("red").style.WebkitAnimation = "dash 5s";

        //$('.red').css('stroke-dashoffset', 600);
        //$('.t-time').text(min + ':0' + sec);
    });


    function initVars(my_number) {
        //audio = new Audio('ding.mp3');
        //main_timer = 0;
        //Очистка всех предыдущих состояний
        for (i=0;i<=pranas.length-1;i++){
          //alert(pranas[i]);
          if(document.contains(document.getElementById(pranas[i]))) {
            document.getElementById(pranas[i]).remove();
            document.getElementById(pranas[i]+"_back").remove();
            //alert(pranas[i]);
            //element.parentNode.removeChild(element);
          }

        }
        my_choose = my_number;
        var nameArr = types[my_number].seq.split(',');
        duration = 0;
        for (i=0;i<=nameArr.length-1;i++){
            duration = duration + types[my_number][pranas[nameArr[i]]];
        }

        //$('.timer_text').text(duration);
        //$('.t-action').text(types[my_number].name);
        var offset=0;
        ar_offsets=[];
        ar_timers=[];
        for (i=0;i<=nameArr.length-1;i++){


            var val = (types[my_number][pranas[nameArr[i]]]/duration)*line;
            vis(pranas[nameArr[i]],val,offset);
            vis(pranas[nameArr[i]]+"_back",val,offset);

            offset = offset - val;
            ar_offsets.push(Math.floor(offset));
            ar_timers.push(types[my_number][pranas[nameArr[i]]]);

        }
        audio_vdoh.load();
        audio_vidoh.load();

        function vis(id,val,offset){

            const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cir1.setAttribute("cx", "150");
            cir1.setAttribute("cy", "150");
            cir1.setAttribute("r", "100");
            cir1.setAttribute("id", id);
            cir1.setAttribute("stroke-width", "40");


            document.getElementById("progress_id").appendChild(cir1);
            //cir1.lineWidth=20;
            var coord = document.getElementById(id);
            coord.style.strokeDasharray=val + "," + line  ;
            coord.style.strokeDashoffset=offset;
            coord.style.visibility="visible";
            coord.style.strokeWidth=20;

        }

    }
    function names(){
      map["vdoh1"]="Вдох";
      map["vdoh2"]="Вдох";
      map["vidoh1"]="Выдох";
      map["vidoh2"]="Выдох";
      map["zaderj1"]="Задержка";
      map["zaderj2"]="Задержка";

    }

    function list_of_pranas(){
      var select = document.getElementById('list_of_pranas');
      for(var i=0; i<types.length; i++){
        var val = types[i].name;
        var option = document.createElement('option');
        //alert(types[i].name);
        option.value = i;
        option.innerHTML = types[i].name;
        select.appendChild(option);
        //option.id = i;
        //newLi.onclick = function() {  choose=my_number; $('.pause-btn span').removeClass('glyphicon-play').addClass('glyphicon-pause');

      }

    }
});

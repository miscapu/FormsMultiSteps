$(document).ready(function(){
    msform_init();//Multiform erzeugen

    $('form').submit(function(event){
        if(
            form_completeCheck() &&
            true // some rules here
        ){
            //Send it
        }
        else{
            event.preventDefault();//nicht senden
        }
    })
})// $(document).ready()  */

/**
 * check($fs)
 * Validates the actualy fieldset
 *
 */
function check($fs){
    var ok = true;
    switch($fs.attr('id')){
        // Fieldset mit 'data-check-id' == '1'
        case 'step_1':
            $i_name = $('input[name="name"]',$fs);
            $i_email = $('input[name="email"]',$fs);

            //NAME
            if ($i_name.val().length < 3) {
                ok=false;
                $i_name.addClass('error');
            }
            else{$i_name.removeClass('error');}

            //EMAIL
            if ($i_email.val().length < 6) {//diese validierung ist primitiv! (noch via RegEx auf echtheit überprüfen!) <http://www.html-seminar.de/html-css-php-forum/board40-themenbereiche/board18-php/4708-php-mailing/#post32959>
                ok=false;
                $i_email.addClass('error');
            }
            else{$i_email.removeClass('error');}
            break;

        // Fieldset mit 'data-check-id' == '2'
        case 'step_2':
            $i_q1 = $('input[name="q1"]',$fs);
            $i_q2 = $('input[name="q2"]',$fs);
            $i_q3 = $('input[name="q3"]',$fs);

            //Question 1
            if ($i_q1.val().length < 3) {
                ok=false;
                $i_q1.addClass('error');
            }
            else{$i_q1.removeClass('error');}

            //Querstion 2
            if ($i_q2.val().length < 3) {
                ok=false;
                $i_q2.addClass('error');
            }
            else{$i_q2.removeClass('error');}

            //Querstion 3
            if ($i_q3.val().length < 3) {
                ok=false;
                $i_q3.addClass('error');
            }
            else{$i_q3.removeClass('error');}
            break;

        // Fieldset mit 'data-check-id' == '3'
        case 'step_3':
            if (spamschutz_check() === false) {
                ok=false;
            }
            break;
    }

    if(ok === true){
        $fs.attr('data-complete', true);
        return true;
    }
    else{
        $fs.attr('data-complete', false);
        return false;
    }
}// check()  */

/**
 * unCheck($fieldset)
 * DeValidates the actualy fieldset
 *
 */
function unCheck($fieldset){
    $fieldset.attr('data-complete', false);
}// unCheck()  */

/**
 * form_completeCheck()
 *
 */
function form_completeCheck() {
    var ok = true;
    $("[id^='step_'] fieldset").each(function(index,elem){
        $this = $(this);
        if ($this.attr('data-complete') != 'true') {
            ok = false;
        };
    })

    if (ok === true) {
        //go go go..
        return true;
    }
    else{
        swal('Irgendwo hast Du Daten vergessen :/','Überprüfe nochmal deine Eingaben!','error');// Fucking: f@$%
        return false;
    }

}// form_completeCheck()  */

/**
 * msform_init()
 * init's the Next and Previus Buttons
 *
 * author & copyright by <http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar>
 *
 * modifyed by Wolf Wortmann:
 *  Added Validation caal.
 *  Added Disvalidation call.
 */
function msform_init(){
    //jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches
    $('.submit').click(function(){
        check($(this).parent());
    })
    $(".next").click(function(){
        if(animating) return false;
        animating = true;

        current_fs = $(this).parent().parent();
        next_fs = $(this).parent().parent().next();

        if( check(current_fs) === false ) {
            animating = false;
            return false;
        } //Validieren & Abbrechen wenn fail

        //activate next step on progressbar using the index of next_fs
        $(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });// $(".next").click()  */

    $(".previous").click(function(){
        if(animating) return false;
        animating = true;

        current_fs = $(this).parent().parent();
        previous_fs = $(this).parent().parent().prev();

        unCheck(previous_fs)//DeValidieren

        //de-activate current step on progressbar
        $(".progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1-now) * 50)+"%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });// $(".previous").click()  */
};// msform_init()  */

function spamschutz_check(){
    $this = $('.vtcha-spamschutz');
    if($this.val() == 'multi_human_detected'){
        return true;
    }
    else{
        return false;
    }
}// spamschutz_check()  */
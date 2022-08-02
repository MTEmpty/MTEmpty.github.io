var now = 0
var next_step_time = 0

var time_left = 10

var i = 10

function setup() {
    noCanvas();
    steak_duration = createInput('3', 'number');

    start_button = select('#start_button');
    current_step = select('#current_step');
    next_step = select('#next_step');
    time_remaining = select('#time_remaining');

    start_button.mousePressed(startCooking);
}


async function startCooking() {
    // First step: Put the steaks in a preheated pan.
    console.log('First step')
    current_step.html('Put steaks in pan');
    next_step.html('Next step: Flip steak');
    determineNextStepTime(parseFloat(steak_duration.value()));
    await updateTimer();

    // Second step: Flip the steak.
    console.log('Second step')
    current_step.html('Flip steak');
    next_step.html('Next step: Baste in butter');
    determineNextStepTime(parseFloat(steak_duration.value()));
    await updateTimer();

    // Third step: Baste in butter
    console.log('Third step')
    current_step.html('Baste in butter');
    next_step.html('Next step: Rest and then eat :)');
    determineNextStepTime(1);
    await updateTimer();

    // Fourth step: Rest
    console.log('Fourth step')
    current_step.html('Rest Steak');
    next_step.html('Next step: Eat');
    determineNextStepTime(5);
    await updateTimer();

    // Last step: Eat
    console.log('Last step')
    current_step.html('Eat :)');
    next_step.html('ฅʕ•̫͡•ʔฅ');
}


function determineNextStepTime(mins_needed) {
    now = new Date().getTime();
    console.log('current time: ' + now);
    
    let ms_needed = mins_needed * 60 * 1000;
    console.log('Should wait: ' + ms_needed);

    next_step_time = now + ms_needed;
    console.log('Next step at: ' + next_step_time);
}


async function updateTimer() {
    do {
        now = new Date().getTime();
        time_left = next_step_time - now;

        let minutes = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((time_left % (1000 * 60)) / 1000);

        let timer_str = onlyPositive(minutes) + 'mins ' + onlyPositive(seconds) + 'seconds';

        await sleep(1000)

        if (time_left < 0) {
            console.log('All done');
            document.getElementById("time_remaining").innerHTML = "DONE";
        }
        else {
            time_remaining.html(timer_str);
        }
    }
    while (time_left > 0);
    console.log('loop finished')
    return 'done';
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function onlyPositive(number) {
    let result = 0
    if (number > 0) {
        result = number
    }
    return result
}

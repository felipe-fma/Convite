'use strict';
(function() {

    //An envelope Object
    const envelope = {
        //Main Body
        body: document.getElementById('envelope'),
        //Various Other Parts
        top: document.getElementById('envelopeTop'),
        left: document.getElementById('envelopeBottomRight'),
        bottomRight: document.getElementById('envelopeTop'),
        paper: document.getElementById('paper'),

        //Object to record state
        state: {
            //A variable to identify how much part of the letter is outside of the envelope
            distance: 0,
            isEnvelopeOpen: false,
            topRotation: 0,
            size: 1,
            isFullOpen: false,
        },
    };

    //A Letter Object
    const letter = {
        form: document.getElementById('contact')
    };

    //Setting Initial Value
    envelope.top.style.transform = "rotateX(0deg)";
    envelope.state.topRotation = 0;

    let rockit = envelope.body.animate([
        { transform: "rotate(0)" },
        { transform: "rotate(2deg)" },
        { transform: "rotate(0deg)" },
        { transform: "rotate(-2deg)" },
        { transform: "rotate(0)" }
    ], {
        duration: 300,
        iterations: Infinity
    });

    //envelope.body.animate.apply(treme);

    //Adding Event Listeners
    envelope.body.addEventListener('mouseover', openEnvelope);
    //Make clear properites to stop function calls when needed
    openEnvelope.clear = undefined;
    closeEnvelope.clear = undefined;

    function openEnvelope() {
        console.log("Open");

        //Remove invalid Event Listeners and add proper ones
        rockit.cancel();
        envelope.body.removeEventListener('mouseover', openEnvelope);
        envelope.body.addEventListener('mouseout', closeEnvelope);

        //Stop any call remaining from closeEnvelope Event
        if (closeEnvelope.clear) {
            clearTimeout(closeEnvelope.clear);
        }

        if (envelope.state.topRotation > 180) {
            envelope.paper.style.zIndex = 6;
            envelope.top.style.zIndex = 0;
            envelope.left.style.zIndex = 0;
            envelope.bottomRight.style.zIndex = 0;

            clearTimeout(openEnvelope.clear);
            sizeUp()

        } else {
            //Change the step increment of rotate to adjust smoothness 
            envelope.state.topRotation += 2;
            //Apply the changes
            envelope.top.style.transform = "rotateX" + "(" + envelope.state.topRotation + "deg" + ")";
            openEnvelope.clear = setTimeout(openEnvelope, 10);
        }

    };

    function sizeUp() {
        if (envelope.state.size > 2.5) {
            envelope.state.isEnvelopeOpen = true;
            clearTimeout(openEnvelope.clear);
        } else {
            envelope.state.size += 0.05

            envelope.paper.style.transform = "scale(" + envelope.state.size + ")";
            console.log("paper trans " + envelope.state.size);
            openEnvelope.clear = setTimeout(sizeUp, 10);
        }
    }

    function closeEnvelope() {
        console.log("Close");

        //Remove invalid Event Listeners and add proper ones
        envelope.body.addEventListener('mouseover', openEnvelope);
        envelope.body.removeEventListener('mouseout', closeEnvelope);

        //Stop any call remaining from openEnvelope Event
        if (openEnvelope.clear) {
            clearTimeout(openEnvelope.clear);
        }

        if (envelope.state.isEnvelopeOpen) {
            if (envelope.state.size <= 1) {
                envelope.paper.style.zIndex = 0;
                envelope.top.style.zIndex = 1;
                envelope.left.style.zIndex = 1;
                envelope.bottomRight.style.zIndex = 1;

                clearTimeout(closeEnvelope.clear);
                InvertRotateX()

            } else {
                //Change the step increment of rotate to adjust smoothness 
                envelope.state.size -= 0.05

                envelope.paper.style.transform = "scale(" + envelope.state.size + ")";
                console.log("paper trans " + envelope.state.size);
                closeEnvelope.clear = setTimeout(closeEnvelope, 10);
            }
        }
    };

    function InvertRotateX() {
        if (envelope.state.topRotation <= 0) {
            envelope.state.isEnvelopeOpen = false;
            rockit.play()
            envelope.body.style.animation = "wiggle 0.3s 0.2s infinite;"
            clearTimeout(closeEnvelope.clear);
        } else {
            envelope.state.topRotation -= 2;
            //Apply the changes
            envelope.top.style.transform = "rotateX" + "(" + envelope.state.topRotation + "deg" + ")";
            closeEnvelope.clear = setTimeout(InvertRotateX, 10);
        }
    }
})();
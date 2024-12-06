function StepFunc(start, end, cutoff, t) {
    if (t >= cutoff) {
        return end;
    }
    return start;
}
function CalculateSpeed(
    accelCoefficient,
    dragCoefficient,
    prevTime,
    prevSpeed,
    currentTime,
    inputValue) {
    accel = accelCoefficient * inputValue;
    drag = dragCoefficient * prevSpeed;
    speedChange = (accel - drag) * (currentTime - prevTime);
    newSpeed = prevSpeed + speedChange;
    return newSpeed;
}
function OnOffControl(
    low,
    high,
    error) {
    if (error >= 0) {
        return high;
    }
    return low;
}
function OnOffWithHysteresisControl(
    previousOutput,
    offValue,
    offOffset,
    onValue,
    onOffset,
    error) {
    if (error > onOffset) {
        return onValue;
    }
    if (error < -offOffset) {
        return offValue;
    }
    return previousOutput;
}
function PID(
    error,
    accError,
    errorChange,
    pt,
    it,
    dt,
    timeDelta) {
    p_o = (pt * error) * timeDelta;
    i_o = (it * accError) * timeDelta;
    d_o = (dt * errorChange) * timeDelta;
    return p_o + i_o + d_o;
}

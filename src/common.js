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
        return low;
    }
    return high;
}

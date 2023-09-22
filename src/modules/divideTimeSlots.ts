function divideTimeSlots(
  startTime: string,
  endTime: string,
  slotDuration: number,
  reservations: [{ startTime: string, endTime: string }]
) {
  const slots = [];
  let currentTime = startTime;

  while (currentTime <= endTime) {
    const [currentHours, currentMinutes] = currentTime.split(":");
    const currentTimestamp = new Date(0, 0, 0, Number(currentHours), Number(currentMinutes));

    let slotAvailable = true;

    for (const reservation of reservations) {
      const reservationStart = new Date(0, 0, 0, ...reservation.startTime.split(":"));
      const reservationEnd = new Date(0, 0, 0, ...reservation.endTime.split(":"));

      // Check if the current slot overlaps with any reservation
      if (
        currentTimestamp >= reservationStart &&
        currentTimestamp < reservationEnd
      ) {
        slotAvailable = false;
        break; // No need to check further reservations
      }
    }

    if (slotAvailable) {
      slots.push(currentTime);
    }

    currentTimestamp.setMinutes(currentTimestamp.getMinutes() + slotDuration);
    currentTime = `${currentTimestamp.getHours()}:${currentTimestamp
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
  return slots;
}

export default divideTimeSlots;

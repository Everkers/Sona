module.exports = (time12h) => {
  //   const time = time12h.split('pm');
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time12h.split(':');

  hours = parseInt(hours, 10) + 12;

  return { hours, minutes: minutes.replace('pm', '') };
};

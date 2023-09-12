const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat, long);
    const res = await fetch(`/companies?long=${long}&lat=${lat}`);
    const data = await res.json();
    console.log(data);
  });
});

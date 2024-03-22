
let map;

  // Predefined pet store data
  const petStores = [
    { name: "PetsFocus", latitude: 6.64601196641015, longitude: 3.3796322192567887 },
    { name: "Petshop Plus", latitude: 6.573711349301266,  longitude: 3.3913051924409237},
    { name: "Lowkey Petshop", latitude: 6.5205022862669075, longitude: 3.407098038513577 }, // Lagos

    { name: "PetPlus", latitude: 7.421893274580378, longitude: 3.8884063343260173 }, //Ibadan
    { name: "That Pet Place", latitude: 7.402653861685866, longitude: 3.895701895523817 },
    { name: "Anike-The Pet Shop", latitude: 7.391758968154474, longitude: 3.8788790812290337 },
    // Add more pet store data here
  ];

  function initMap() {
   const lagosLat = 6.5244;
   const lagosLng = 3.3792;
   const ibadanLat = 7.3775;
   const ibadanLng = 3.9470;

   const centerLat = (lagosLat + ibadanLat) / 2;
   const centerLng = (lagosLng + ibadanLng) / 2;

   map = new google.maps.Map(document.getElementById("map"), {
     center: { lat: centerLat, lng: centerLng }, // Center map between Lagos and Ibadan
     zoom: 7.5, // Adjust zoom level as needed
   });

    // Add click event listener to the map
    map.addListener("click", (event) => {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      const nearbyStores = findNearbyStores(latitude, longitude);
      displayNearbyStores(nearbyStores);
    });
  }

  function findNearbyStores(latitude, longitude) {
    // Use Haversine formula to calculate distance between the clicked location and pet stores
    const nearbyStores = petStores.filter(store => {
      const distance = calculateDistance(latitude, longitude, store.latitude, store.longitude);
      return distance <= 10; // 10 kilometers
    });
    return nearbyStores;
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  }

  function displayNearbyStores(stores) {
   const petStoresList = document.getElementById('pet-stores');
   petStoresList.innerHTML = ''; // Clear previous results

   if (stores.length === 0) {
       petStoresList.innerHTML = '<p>No nearby pet stores found.</p>';
       return;
   }

   stores.forEach(store => {
       const listItem = document.createElement('li');
       const anchor = document.createElement('a');
       anchor.textContent = store.name;
       // Assuming each pet store has its own website URL, you can set it accordingly
       // Replace "https://example.com" with the actual website URL of the pet store
       anchor.href = getPetStoreWebsite(store.name);
       anchor.target = "_blank"; // Open link in a new tab
       listItem.appendChild(anchor);
       petStoresList.appendChild(listItem);
   });
}

// Function to get the website URL of the pet store based on its name
function getPetStoreWebsite(storeName) {
   // Add logic here to return the appropriate website URL based on the store name
   // For example:
   switch (storeName) {
       case "PetsFocus":
           return "https://pets-focus-pet-store.business.site/?utm_source=gmb&utm_medium=referral";
       case "Petshop Plus":
           return "https://petshopplus.ng/";
       case "Lowkey Petshop":
           return "https://lowkey-petshop.business.site/";
       case "PetPlus":
           return "https://www.google.com/maps/dir//petplus/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x10398dedf03772af:0x802ad17c89f52549?sa=X&ved=2ahUKEwiu8L-DxOqEAxX0aEEAHY_9Dl4Q9Rd6BAhhEAA";
       case "That Pet Place":
           return "https://nigeria24.me/that-pet-place";
       case "Anike-The Pet Shop":
           return "https://shops.heyplaces.com.ng/087356/Anike_-_The_PetShop";
       // Add more cases for other pet stores if needed
       default:
           return "#"; // Default to "#" if website URL is not available
   }
}
